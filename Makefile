#!/usr/bin/env python

export PYTHONPATH=.
.PHONY: data/felix_modifications.tsv
.PHONY: clean

# .PHONY:  inferred-models/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.yaml

# https://docs.google.com/spreadsheets/d/1VFeUZqLmnmXDS1JcyXQbMgF513WyUBgz/edit#gid=1742629071

test:
	pytest tests/test_*py

unit-tests:
	pytest tests/unit/*.py

integration-tests:
	pytest tests/*.py

typecheck:
	mypy kgx --ignore-missing-imports

linkml_model_enrichment/dosdp/model.py: linkml_model_enrichment/dosdp/dosdp_linkml.yaml
	gen-python $< > $@ && python -m linkml_model_enrichment.dosdp.model

inferred-models/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.yaml:
	linkml_model_enrichment/infer_model.py \
	tsv2model \
	-E species \
	data/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.tsv > \
	inferred-models/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.yaml

# samples of mapping enumerables to semantic terms via BioPortal 
target/species_enum_ncbitaxon.yaml: inferred-models/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.yaml
	linkml_model_enrichment/bioportal-enum-annotation.py \
	--modelfile inferred-models/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.yaml \
	--enum_source species_enum \
	--ontoprefix ncbitaxon > target/species_enum_ncbitaxon.yaml

target/species_enum_all_bp.yaml: inferred-models/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.yaml
	linkml_model_enrichment/bioportal-enum-annotation.py \
	--modelfile inferred-models/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.yaml \
	--enum_source species_enum > \
	target/species_enum_all_bp.yaml

target/type_enum_so.yaml: inferred-models/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.yaml
	linkml_model_enrichment/bioportal-enum-annotation.py \
	--modelfile inferred-models/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.yaml \
	--enum_source type_enum \
	--ontoprefix so > \
	target/type_enum_so.yaml

data/felix_modifications.tsv:
	linkml_model_enrichment/get_felix_tsv.py

inferred-models/felix_modifications.yaml: data/felix_modifications.tsv
	linkml_model_enrichment/infer_model.py \
	tsv2model \
	data/felix_modifications.tsv > \
	inferred-models/felix_modifications.yaml

target/felix_modifications_modification_type_enum_so.yaml: inferred-models/felix_modifications.yaml
	linkml_model_enrichment/bioportal-enum-annotation.py \
	--modelfile inferred-models/felix_modifications.yaml \
	--enum_source modification_type_enum \
	--ontoprefix so > \
	target/felix_modifications_modification_type_enum_so.yaml

copy-pfx:
	find ../phenopacket-schema -name "*.proto" -exec cp {} tests/resources/phenopackets/ \;

pfx-fix-imports:
	perl -pi -ne 's@import ".*/@import "@' tests/resources/phenopackets/*proto

clean:
	[ ! -e inferred-models/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.yaml ] || \
	rm inferred-models/Ontology_example_20210317_P2B1_allmods_categorytype_different_scores_per_mod-1.yaml
	[ ! -e target/species_enum_ncbitaxon.yaml ]                        || rm target/species_enum_ncbitaxon.yaml
	[ ! -e target/species_enum_all_bp.yaml ]                           || rm target/species_enum_all_bp.yaml 
	[ ! -e target/type_enum_so.yaml ]                                  || rm target/type_enum_so.yaml 
	[ ! -e target/felix_modifications.tsv ]                            || rm felix_modifications.tsv 
	[ ! -e inferred-models/felix_modifications.yaml ]                  || rm inferred-models/felix_modifications.yaml 
	[ ! -e target/felix_modifications_modification_type_enum_so.yaml ] || rm target/felix_modifications_modification_type_enum_so.yaml 

# DOCKER

# Building docker image
VERSION = "v1.1.7"
IM=monarchinitiative/linkml
DEV=monarchinitiative/linkml-dev

docker-build:
	docker build $(CACHE) \
	    -t $(IM):$(VERSION) -t $(IM):latest -t $(DEV):latest \
	    .

docker-test:
	docker run -v $(PWD):/work -w /work/ --rm -ti linkml/linkml bash


docker-build-no-cache:
	$(MAKE) build CACHE=--no-cache

docker-build-dev:
	docker build --build-arg ODK_VERSION=$(VERSION) \
	    -t $(DEV):$(VERSION) -t $(DEV):latest \
	    .

docker-clean:
	docker kill $(IM) || echo not running
	docker rm $(IM) || echo not made

#### Publishing #####

docker-publish-no-build:
	docker push $(IM):latest
	docker push $(IM):$(VERSION)

docker-publish: docker-build
	$(MAKE) docker-publish-no-build

.PHONY: sample-enum-mapping
sample-enum-mapping:
	poetry run poetry run ea2 \
		--modelfile ../synbio-schema/handcrafted/model/synbio_organism.yaml \
		--requested_enum_name binomial_name_enum \
		--log_level INFO \
		--test_sample_size 0 > mapped.yaml
	# poetry run gen-yaml mapped.yaml > generated.yaml
	# ValueError: File "<file>", line 82, col 11 Class: "Organism" - unknown is_a reference: NamedThing

