# import linkml_runtime as lr
# import linkml
# # what's this?
# import linkml_runtime_api
import linkml.utils.rawloader as rl

import yaml
import re
import pandas as pd
import random
import numpy as np

# cosine? SIFT4?
from strsimpy.cosine import Cosine

# urllib? urllib3? pure requests?
import urllib
import requests

import logging
import click_log

# don't see any logging statements yet

logger = logging.getLogger(__name__)
click_log.basic_config(logger)

pd.set_option('display.expand_frame_repr', False)

# took out globals
# reusing requests sessions

# delete venv
# purge pip cache
# create new venv and enter it
# install wheel
# install packages from requirements file

# qdd caching of already searched terms
# add default values for functions

modelfile = "../synbio-schema/handcrafted/model/synbio_organism.yaml"
requested_enum_name = "binomial_name_enum"
overwrite_meaning = True
whiteout_chars = "._-"
# ontology_string = "NCBItaxon,PATO"
ontology_string = "NCBItaxon"
query_field_string = ""
ols_search_base_url = "http://www.ebi.ac.uk/ols/api/search"
ols_terms_based_url = "http://www.ebi.ac.uk/ols/api/ontologies/"
desired_row_count = 5
shingle_size = 2

blank_row = {'description': '', 'id': '', 'iri': '', 'is_defining_ontology': '',
             'label': '', 'obo_id': '', 'ontology_name': '', 'ontology_prefix': '',
             'short_form': '', 'type': ''}

ols_annotations_cols = ['name', 'obo_id', 'scope', 'type', 'xrefs']


# load with schemaview and extract SchemaDefinition?
# or open directly into a SchemaDefinition?  HOW?
# https://fedingo.com/how-to-read-yaml-file-to-dict-in-python/

# make classes out of DataFrames that would be appealing as globals
class DataFrameClass:
    def __init__(self):
        self.mapping_frame = pd.DataFrame()

    def add(self, miniframe):
        self.mapping_frame = self.mapping_frame.append(miniframe)

    def get(self):
        return self.mapping_frame


def parse_yaml_file(yaml_file_name):
    with open(yaml_file_name, 'r') as stream:
        try:
            parse_res = yaml.safe_load(stream)
            return parse_res
        except yaml.YAMLError as exc:
            print(exc)


def dict_to_schema(dict_param):
    converted_schema = rl.load_raw_schema(dict_param)
    return converted_schema


def request_an_enum(schema_param, enum_name_param):
    enum_requested = schema_param.enums[enum_name_param]
    return enum_requested


def request_pvs(enum_param):
    pvs_requested = enum_param.permissible_values
    return pvs_requested


# make sorting an option?
def get_pv_names(pv_param):
    pv_names = [k for k, v in pv_param.items()]
    pv_names.sort()
    return pv_names


def make_cosine_obj(shingle_size_param):
    made_cosine_obj = Cosine(shingle_size_param)
    return made_cosine_obj


def ols_term_search(term, chars_to_whiteout, ontology_param, qf_param, rowcount_param, blank_row_param,
                    global_frame_param, seesion_param):
    woed = do_whiteout(term, chars_to_whiteout)

    request_string = ols_search_base_url + \
                     '?q=' + \
                     urllib.parse.quote(woed) + '&' + \
                     'type=class' + '&' + \
                     'exact=false' + '&' + \
                     ontology_param + "&" + \
                     'rows=' + str(rowcount_param) + '&' + \
                     qf_param

    logger.debug(request_string)

    # this gets matching terms but doesn't show why they matched
    response_param = seesion_param.get(request_string)

    ols_string_search_res_j = response_param.json()
    ols_string_search_res_frame = pd.DataFrame(ols_string_search_res_j['response']['docs'])
    ols_string_search_res_frame.insert(0, "raw_query", term)
    ols_string_search_res_frame.insert(0, "tidied_query", woed)

    # did the string search get any result rows?
    r, c = ols_string_search_res_frame.shape
    if r == 0:
        no_search_res_dict = blank_row_param.copy()
        # no_search_res_dict['id'] = term
        no_search_res_dict['raw_query'] = term
        no_search_res_dict['tidied_query'] = woed
        no_search_res_frame = pd.DataFrame([no_search_res_dict])
        ols_string_search_res_frame = ols_string_search_res_frame.append(no_search_res_frame)
        # failures.append(orig_enum)

    global_frame_param.add(ols_string_search_res_frame)
    # return ols_string_search_res_frame
    return True


# refactor
def make_ontolgy_phrase(ontology_param):
    ontologies_phrase = ''
    # what is ontology_param here?
    # list, string?
    if ontology_param is not None and ontology_param != "":
        ontologies_phrase = 'ontology=' + ontology_param.lower()
    return ontologies_phrase


# refactor
def make_qf_phrase(qf_param):
    qf_phrase = ''
    if qf_param is not None and qf_param != "":
        qf_phrase = 'queryFields=' + qf_param.lower()
    return qf_phrase


def do_whiteout(raw_string, chars_to_whiteout):
    if chars_to_whiteout is not None and chars_to_whiteout != "":
        tidied_string = re.sub(r'[' + chars_to_whiteout + ']+', ' ', raw_string)
    else:
        tidied_string = raw_string
    return tidied_string


def get_ols_term_annotations(iri_param, ontology_param, session_param):
    print(iri_param)
    once = urllib.parse.quote(iri_param, safe='')
    twice = urllib.parse.quote(once, safe='')
    # build url from base
    term_retr_assembled = ols_terms_based_url + ontology_param + '/terms/' + twice
    term_details = session_param.get(term_retr_assembled)
    term_json = term_details.json()

    if 'label' in set(term_json.keys()):
        logger.debug(term_retr_assembled)
        term_label = term_json['label']
        logger.debug(term_label)
        label_frame = pd.DataFrame([[term_json['label'], 'label', 'label', '']],
                                   columns=['name', 'scope', 'type', 'xrefs'])
        label_frame['obo_id'] = term_json['obo_id']
        label_frame['pref_lab'] = term_json['label']

        label_frame.insert(0, "iri", iri_param)

        term_annotations.add(label_frame)

    if 'obo_synonym' in set(term_json.keys()):
        obo_syn_json = term_json['obo_synonym']
        obo_syn_frame = pd.DataFrame(obo_syn_json)
        obo_syn_frame['obo_id'] = term_json['obo_id']
        obo_syn_frame['pref_lab'] = term_json['label']
        obo_syn_frame.insert(0, "iri", iri_param)
        term_annotations.add(obo_syn_frame)

    return True


parsed_yaml = parse_yaml_file(modelfile)

current_schema = dict_to_schema(parsed_yaml)

# enum_names = list(current_schema.enums.keys())

requested_enum_obj = request_an_enum(current_schema, requested_enum_name)

requested_pvs_obj = request_pvs(requested_enum_obj)

requested_pvs_names = get_pv_names(requested_pvs_obj)

ontologies_phrased = make_ontolgy_phrase(ontology_string)

qf_phrased = make_qf_phrase(query_field_string)

cosine_obj = make_cosine_obj(shingle_size)

# initialize
enum_name_mappings = DataFrameClass()
term_annotations = DataFrameClass()

reusable_session = requests.Session()

# n = 20
# random_pvs = random.sample(requested_pvs_names, n)
# random_pvs.sort()

for pv_name in requested_pvs_names:
    print(pv_name)
    current_pv = requested_pvs_obj[pv_name]
    search_res = ols_term_search(pv_name, whiteout_chars, ontologies_phrased, qf_phrased, desired_row_count, blank_row,
                                 enum_name_mappings, reusable_session)

enum_name_mapping_frame = enum_name_mappings.get()

term_and_source = enum_name_mapping_frame[["iri", "ontology_name"]]
term_and_source.drop_duplicates(inplace=True)
term_and_source = term_and_source.loc[~term_and_source['iri'].eq("")]
term_and_source.sort_values(["iri", "ontology_name"], inplace=True)
term_and_source = term_and_source.to_dict(orient="records")

for i in term_and_source:
    annotations_for_terms = get_ols_term_annotations(i["iri"], i["ontology_name"], reusable_session)

annotations_from_terms = term_annotations.get()

raw_through_annotations = enum_name_mapping_frame.merge(annotations_from_terms, how='left', on="iri",
                                                        suffixes=('_term', '_ano'))

# for_str_dist = raw_through_annotations[["tidied_query", "name"]]
# for_str_dist["tidied_query_lc"] = for_str_dist["tidied_query"].str.lower()
# for_str_dist["name_lc"] = for_str_dist["name"].str.lower()
# # favoring simplicity over efficiency
# # ie may be string-comparing some duplicates
# # easier to merge back in
# # for_str_dist = for_str_dist.loc[
# #     ~for_str_dist["tidied_query"].eq("") and ~for_str_dist["label"].eq("") and ~for_str_dist[
# #         "tidied_query"].isnull() and ~for_str_dist["label"].isnull()]
# # for_str_dist.drop_duplicates(inplace=True)
# # for_str_dist.sort_values(["tidied_query", "label"], inplace=True)
# for_str_dist_dict = for_str_dist.to_dict(orient="records")
#
# dist_list = []
# for pair in for_str_dist_dict:
#     # I thought profiles were necessary?!
#     # profile_0 = cosine_obj.get_profile(pair["tidied_query_lc"])
#     # profile_1 = cosine_obj.get_profile(pair["label_lc"])
#     name_type = type(pair["name"])
#     if name_type is str:
#         the_sim = cosine_obj.distance(pair["tidied_query_lc"], pair["name_lc"])
#         the_dist = (1 - the_sim)
#         dist_list.append(the_dist)
#
# for_str_dist.drop(labels=["tidied_query_lc", "name_lc"], axis=1, inplace=True)
# for_str_dist["cosine"] = dist_list
#
# raw_through_dist = raw_through_annotations.merge(for_str_dist, how="left", on=["tidied_query", "name"])
#
# getting_sloppy = []
#
# for i in requested_pvs_names:
#     ce = requested_pvs_obj[i]
#     cr = raw_through_dist.loc[raw_through_dist["raw_query"].eq(i)]
#     max_cosine = cr["cosine"].max()
#     with_max = cr.loc[cr["cosine"] == max_cosine]
#     if len(with_max.index) > 0:
#         with_max = with_max.drop(labels=['xrefs'], axis=1)
#         with_max.drop_duplicates(inplace=True)
#         # actually, take action on it here
#         # may still need to do some row filtering/prioritizing by source or annotation typ
#         getting_sloppy.append(with_max)
#
# getting_sloppy = pd.concat(getting_sloppy)
#
# gs_tq_vc = getting_sloppy["tidied_query"].value_counts()
# print(gs_tq_vc)
