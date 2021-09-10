#!/usr/bin/env python3

from __future__ import print_function
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from strsimpy.cosine import Cosine
import yaml
import re
import pandas as pds
import requests
import click
import logging
import click_log
import random

logger = logging.getLogger(__name__)
click_log.basic_config(logger)
pds.set_option('display.expand_frame_repr', False)

global inferred_model, ecg, opg, rrg, qfg, mdg, omg
ecg = None
failures = []

cols2display = ['enum_class', 'orig_enum', 'query', 'obo_id', 'pref_lab',
                'name', 'cosine_dist', 'dist_ok', 'type', 'scope', 'rank']

success_frame = pds.DataFrame(columns=cols2display)


# MIN CHARACTERS FOR SEARCH NOT BEING ENFORCED

# TODO write mapped terms back in as meanings
#    give option for overwriting?
# TODO all user to specify enum classes to process
# when verbose, stderr gets status and debugging info
# stdout gets the modified model as yaml and should be redirected to a file

# OLS dataframe structure not identical to previous BP dataframes:
#   different columns
#   BP shows one best row
#   OLS lists up to N best
#   not filtering out small queries in OLS approach yet
#   (OLS approach?) neither handling nor optimizing for repeat values
#   not merging results back into model yet

# examples of previously challenging mappings
# # bicarbonate
# # term_iri = 'https://www.ebi.ac.uk/ols/api/ontologies/chebi/terms/http%253A%252F%252Fpurl.obolibrary.org%252Fobo%252FCHEBI_32139'
# # fungus
# # term_iri = 'https://www.ebi.ac.uk/ols/api/ontologies/ncbitaxon/terms/http%253A%252F%252Fpurl.obolibrary.org%252Fobo%252FNCBITaxon_33169'
# # sars-cov-2
# # term_iri = 'https://www.ebi.ac.uk/ols/api/ontologies/ncbitaxon/terms/http%253A%252F%252Fpurl.obolibrary.org%252Fobo%252FNCBITaxon_2697049'
# # Escherichia phage T7
# # # http://purl.obolibrary.org/obo/NCBITaxon_10760
# # term_iri = 'https://www.ebi.ac.uk/ols/api/ontologies/ncbitaxon/terms/http%253A%252F%252Fpurl.obolibrary.org%252Fobo%252FNCBITaxon_10760'


def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


# TODO add filter based on min_search_chars_param?
# no longer requiring a minimum search length
def one_enum_to_ols_frame_list(permitteds, one_enum_param):
    global failures
    global success_frame

    per_enum_frame = pds.DataFrame(columns=cols2display)

    for orig_enum in permitteds:

        temp = one_enum_param + ": " + orig_enum
        logger.info(temp)

        # tidied_enum = re.sub(r'[_,.\-;@#?!&$ ]+', ' ', orig_enum)
        if ecg is not None:
            tidied_enum = re.sub(r'[' + ecg + ']+', ' ', orig_enum)

        ontologies_phrase = ''
        if len(opg) > 1:
            ontologies_phrase = 'ontology=' + opg.lower()

        qf_phrase = ''
        if len(qfg) > 1:
            qf_phrase = 'queryFields=' + qfg.lower()

        # requiring local loses EROs annotations of SV40
        # 'local=true' + '&' + \
        request_string = 'http://www.ebi.ac.uk/ols/api/search?q=' + \
                         urllib.parse.quote(tidied_enum) + '&' + \
                         'type=class' + '&' + \
                         'exact=false' + '&' + \
                         ontologies_phrase + "&" + \
                         'rows=' + str(rrg) + '&' + \
                         qf_phrase

        logger.debug(request_string)

        response_param = requests.get(request_string)
        ols_string_search_res_j = response_param.json()
        ols_string_search_res_frame = pds.DataFrame(ols_string_search_res_j['response']['docs'])
        ols_string_search_res_frame.insert(0, "query", tidied_enum)

        # did the string search get any result rows?
        r, c = ols_string_search_res_frame.shape
        if r == 0:
            no_search_res_dict = {'description': '', 'id': orig_enum, 'iri': '', 'is_defining_ontology': '',
                                  'label': '', 'obo_id': '', 'ontology_name': '', 'ontology_prefix': '',
                                  'short_form': '', 'type': ''}
            no_search_res_frame = pds.DataFrame([no_search_res_dict])
            ols_string_search_res_frame = ols_string_search_res_frame.append(no_search_res_frame)
            failures.append(orig_enum)

        ols_string_search_res_frame['query'] = orig_enum
        inner_cosine_obj = Cosine(1)

        annotations_frame = pds.DataFrame(columns=['name', 'obo_id', 'scope', 'type', 'xrefs'])

        for ols_string_search_res_row in ols_string_search_res_frame.itertuples(index=False):
            once = urllib.parse.quote(ols_string_search_res_row.iri, safe='')
            twice = urllib.parse.quote(once, safe='')
            # build url from base
            term_retr_base = 'http://www.ebi.ac.uk/ols/api/ontologies/'
            term_retr_assembled = term_retr_base + ols_string_search_res_row.ontology_name + '/terms/' + twice
            term_details = requests.get(term_retr_assembled)

            if term_details.status_code == 200:
                term_json = term_details.json()
                has_label = 'label' in set(term_json.keys())
                if has_label:
                    logger.debug(term_retr_assembled)
                    temp = term_json['label']
                    logger.debug(temp)
                    label_frame = pds.DataFrame([[term_json['label'], 'label', 'label', '']],
                                                columns=['name', 'scope', 'type', 'xrefs'])
                    label_frame['obo_id'] = term_json['obo_id']
                    label_frame['pref_lab'] = term_json['label']
                    annotations_frame = annotations_frame.append(label_frame, ignore_index=True)
                # also get other properties?

                has_synonyms = 'obo_synonym' in set(term_json.keys())
                if has_synonyms:
                    obo_syn_json = term_json['obo_synonym']
                    obo_syn_frame = pds.DataFrame(obo_syn_json)
                    obo_syn_frame['obo_id'] = term_json['obo_id']
                    obo_syn_frame['pref_lab'] = term_json['label']
                    annotations_frame = annotations_frame.append(obo_syn_frame, ignore_index=True)

                # # don't process every kind of annotation, like genetic code
                # has_annotations = 'annotation' in set(term_json.keys())
                # if has_annotations:
                #     obo_ano_json = term_json['annotation']
                #     for anokey in obo_ano_json.keys():
                #         for keyval in obo_ano_json[anokey]:
                #             new_row = {'name': keyval,
                #                        'obo_id': term_json['obo_id'],
                #                        'scope': anokey,
                #                        'type': 'annotation',
                #                        'xrefs': '',
                #                        'pref_lab': term_json['label']}
                #             annotations_frame = annotations_frame.append(new_row, ignore_index=True)

                annotations_row_count = len(annotations_frame.index)

                if annotations_row_count == 0:
                    logger.warning('NO ANNOTATIONS')
                    manual_row = pds.Series(['', '', '', '', '', ''])
                    row_df = pds.DataFrame([manual_row], columns=['name', 'obo_id', 'scope', 'type', 'xrefs', 'pref_lab'])
                    annotations_frame = pds.concat([row_df, annotations_frame], ignore_index=True)
                    failures.append(orig_enum)
                annotations_frame['enum_class'] = one_enum_param
                annotations_frame['query'] = tidied_enum
                annotations_frame['orig_enum'] = orig_enum
                # check whether anny of the annotation on any of the hits have an
                #   acceptable cosine string distance
                annotations_frame['name'] = annotations_frame['name'].fillna('')
                annotations_frame['cosine_dist'] = \
                    annotations_frame.apply(lambda row: inner_cosine_obj.distance(tidied_enum.strip().lower(),
                                                                                  row['name'].strip().lower()),
                                            axis=1)
                annotations_frame = annotations_frame.sort_values('cosine_dist')
                annotations_frame['dist_ok'] = annotations_frame['cosine_dist'] <= mdg
                annotations_frame['rank'] = list(range(1, len(annotations_frame.index)+1))

                # annotations_frame = annotations_frame[
                #     ['enum_class', 'orig_enum', 'query', 'name', 'cosine_dist', 'dist_ok',
                #      'obo_id', 'pref_lab', 'type', 'scope']]

                annotations_frame = annotations_frame[cols2display]

                # do something with xrefs?
        logger.debug(annotations_frame)

        # get best acceptable row
        if "cosine_dist" in annotations_frame.columns:
            acceptable_cosine = annotations_frame[annotations_frame['cosine_dist'] <= mdg]
            acceptable_row_count = len(acceptable_cosine.index)
            if acceptable_row_count > 0:
                best_acceptable = acceptable_cosine.iloc[0]
                success_frame = success_frame.append(best_acceptable)
                # check if permitted value already has a meaning
                meaning_search = list(inferred_model['enums'][one_enum_param]['permissible_values'][orig_enum].keys())
                if 'meaning' in meaning_search:
                    has_meaning = True
                else:
                    has_meaning = False
                meaningless = not has_meaning
                if meaningless or omg:
                    # insert meaning
                    inferred_model['enums'][one_enum_param]['permissible_values'][orig_enum]['meaning'] = best_acceptable[
                        'obo_id']
                    inferred_model['enums'][one_enum_param]['permissible_values'][orig_enum]['description'] = \
                        best_acceptable['pref_lab']
            else:
                temp = 'NO ACCEPTABLE MAPPINGS FOR ' + one_enum_param + " " + orig_enum
                logger.warning(temp)
                # sort and make unique
                failures.append(orig_enum)
            per_enum_frame = per_enum_frame.append(annotations_frame)
    # I think there will be one success frame for each enum
    success_frame = success_frame[cols2display]
    success_frame = success_frame[list(annotations_frame.columns)]
    logger.info(success_frame)
    return per_enum_frame


def all_enums_to_ols(inferred_model_param, the_enums_param):
    multi_enum_frame = pds.DataFrame(columns=cols2display)
    for one_enum in the_enums_param:
        permitteds = get_one_enum_class(inferred_model_param, one_enum)
        one_enum_class_list = one_enum_to_ols_frame_list(permitteds, one_enum)
        multi_enum_frame = multi_enum_frame.append(one_enum_class_list)
    return multi_enum_frame


def get_one_enum_class(inferred_model_param, enum_class_param):
    inferred_enums = inferred_model_param['enums'][enum_class_param]['permissible_values']
    inferred_keys = list(inferred_enums.keys())
    inferred_keys.sort(key=str.casefold)
    return inferred_keys


def get_enum_list(inferred_model_param):
    inner_enums = list(inferred_model_param['enums'].keys())
    return inner_enums


def case_fold_list_sort(input_list):
    output_list = input_list
    output_list.sort(key=str.casefold)
    return output_list


def read_yaml_model(modelfile_param):
    with open(modelfile_param) as file:
        inner_inferred_model = yaml.load(file, Loader=yaml.FullLoader)
    return inner_inferred_model


# don't forget type field on options ???
# synbio example (without redirection of yaml stdout):
# ./linkml_model_enrichment/mixs_qd_bp_or_ols.py \
# --modelfile target/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.yaml \
# --ontoprefix NCBItaxon,SO \
# --enum_list species_enum,host_organism_enum,category_enum,type_enum,type_long_enum \
# --verbose
@click.command()
@click_log.simple_verbosity_option(logger)
@click.option('--modelfile', '-f',
              help='Path to a YAML linkml file containing enumerated values.',
              required=True,
              type=click.Path(exists=True),
              )
@click.option('--tabular_outputfile', '-t',
              default='mappings_log.tsv',
              help='A tsv dump of all search results will be written to this file.',
              show_default=True,
              type=click.Path()
              )
@click.option('--ontoprefix', '-p',
              default='NCBITaxon,SO,ENVO,PATO,GO,OBI',
              help='comma-separated list of (abbreviated) ontologies to search over.',
              show_default=True
              )
@click.option('--enum_list', '-e',
              default='',
              help='Comma-separated list of enums to search with. Defaults to all enums.',
              show_default=False
              )
# the choice and order of the query_fields has a big impact on what terms are returned
# overwrite the model's description with preferred term?
# OLS defaults are {label, synonym, description, short_form, obo_id, annotations, logical_description, iri}
@click.option('--query_fields', '-q',
              default='',
              help="Comma-separated list of term properties to include in string similarity calculation. " +
                   "Defaults to label,synonym,description,short_form,obo_id,annotations,logical_description,iri.",
              show_default=False
              )
# replaced_chars impacts returned fields too
# 'SARS-CoV-2' fails if the hyphens are escaped or ???
@click.option('--replaced_chars', '-c',
              default='\.\_\- ',
              help='Characters to replace with whitespace.',
              show_default=True
              )
@click.option('--min_search_chars', '-n',
              default=2,
              help='TEMPORARILY DISABLED. Queries with fewer characters will not be submitted in the search.',
              show_default=True
              )
@click.option('--row_req', '-r',
              default=5,
              help='Requested number of search results.',
              show_default=True
              )
@click.option('--maxdist', '-x',
              default=0.05,
              help="Maximum string distance between query and best matching term's best matching property.",
              show_default=True
              )
@click.option('--overwite_meaning', '-m',
              help="Should existing enum meanings and descriptions be overwritten?",
              is_flag=True
              )
@click.option('--search_engine', '-s',
              default='OLS',
              help="BioPortal option has been temporarily disabled.",
              show_default=True
              )
def clickmain(modelfile, tabular_outputfile, ontoprefix, enum_list, query_fields, replaced_chars, min_search_chars,
              row_req, maxdist, overwite_meaning, search_engine):
    """Uses web-based ontology lookup tools to map the permitted values of enums from linkml files to CURIES.
    Optionally overwrites the meaning with a CURIE and the description with a preferred label.
    Writes the resulting YAML to STDOUT."""
    global failures, inferred_model, ecg, opg, rrg, qfg, mdg, omg

    inferred_model = read_yaml_model(modelfile)
    ecg = replaced_chars
    opg = ontoprefix
    rrg = row_req
    qfg = query_fields
    mdg = maxdist
    omg = overwite_meaning

    requested_enums = enum_list.split(",")
    sorted_requested = case_fold_list_sort(requested_enums)
    avaialble_enums = get_enum_list(inferred_model)
    sorted_avaialble = case_fold_list_sort(avaialble_enums)
    logger.info(sorted_avaialble)

    if len(enum_list) == 0 or len(enum_list[0]) == 0:
        settled_enums = sorted_avaialble
    else:
        settled_enums = sorted_requested

    if search_engine == 'OLS':
        all_ols_results = all_enums_to_ols(inferred_model, settled_enums)
        logger.info("MAPPING FAILURES")
        logger.info(list(set(failures)))
        all_ols_results.to_csv(tabular_outputfile, sep='\t')
        yaml.safe_dump(inferred_model, sys.stdout, default_flow_style=False)
    elif search_engine == 'BioPortal':
        logger.warning('BioPortal search temporarily disabled')
        return
    else:
        logger.warning('No valid search engine specified')


if __name__ == '__main__':
    clickmain(auto_envvar_prefix='ENUMENRICH')
