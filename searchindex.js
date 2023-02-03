Search.setIndex({docnames:["cli","index","install","introduction","packages/annotators","packages/generalizers","packages/importers","packages/index","packages/src/schema_automator.utils.schemautils","packages/utilities"],envversion:{"sphinx.domains.c":2,"sphinx.domains.changeset":1,"sphinx.domains.citation":1,"sphinx.domains.cpp":5,"sphinx.domains.index":1,"sphinx.domains.javascript":2,"sphinx.domains.math":2,"sphinx.domains.python":3,"sphinx.domains.rst":2,"sphinx.domains.std":2,"sphinx.ext.intersphinx":1,"sphinx.ext.todo":2,"sphinx.ext.viewcode":1,sphinx:56},filenames:["cli.rst","index.rst","install.rst","introduction.rst","packages/annotators.rst","packages/generalizers.rst","packages/importers.rst","packages/index.rst","packages/src/schema_automator.utils.schemautils.rst","packages/utilities.rst"],objects:{"schema_automator.annotators":[[4,0,1,"","JsonLdAnnotator"],[4,0,1,"","SchemaAnnotator"]],"schema_automator.annotators.JsonLdAnnotator":[[4,1,1,"","annotate"]],"schema_automator.annotators.SchemaAnnotator":[[4,1,1,"","annotate_element"],[4,1,1,"","annotate_schema"],[4,1,1,"","enrich"]],"schema_automator.generalizers":[[5,0,1,"","CsvDataGeneralizer"],[5,0,1,"","JsonDataGeneralizer"],[5,0,1,"","RdfDataGeneralizer"]],"schema_automator.generalizers.CsvDataGeneralizer":[[5,2,1,"","column_separator"],[5,1,1,"","convert"],[5,1,1,"","convert_dicts"],[5,1,1,"","convert_multiple"],[5,1,1,"","convert_to_edge_slots"],[5,2,1,"","data_dictionary_row_count"],[5,2,1,"","downcase_header"],[5,2,1,"","enum_columns"],[5,2,1,"","enum_mask_columns"],[5,2,1,"","enum_strlen_threshold"],[5,2,1,"","enum_threshold"],[5,2,1,"","infer_foreign_keys"],[5,1,1,"","infer_linkages"],[5,2,1,"","max_enum_size"],[5,2,1,"","max_pk_len"],[5,2,1,"","min_distinct_fk_val"],[5,2,1,"","robot"],[5,2,1,"","schema_name"],[5,2,1,"","source_schema"]],"schema_automator.generalizers.JsonDataGeneralizer":[[5,1,1,"","convert"],[5,2,1,"","inline_as_dict_slot_keys"]],"schema_automator.generalizers.RdfDataGeneralizer":[[5,1,1,"","convert"]],"schema_automator.importers":[[6,0,1,"","DOSDPImportEngine"],[6,0,1,"","FrictionlessImportEngine"],[6,0,1,"","JsonSchemaImportEngine"],[6,0,1,"","OwlImportEngine"]],"schema_automator.importers.DOSDPImportEngine":[[6,1,1,"","convert"],[6,1,1,"","create_class"]],"schema_automator.importers.FrictionlessImportEngine":[[6,1,1,"","convert"]],"schema_automator.importers.JsonSchemaImportEngine":[[6,1,1,"","convert"],[6,1,1,"","translate_object"]],"schema_automator.importers.OwlImportEngine":[[6,1,1,"","convert"]],"schema_automator.utils":[[8,3,0,"-","schemautils"]],"schemauto-annotate-schema":[[0,4,1,"cmdoption-schemauto-annotate-schema-curie-only","--curie-only"],[0,4,1,"cmdoption-schemauto-annotate-schema-i","--input"],[0,4,1,"cmdoption-schemauto-annotate-schema-curie-only","--no-curie-only"],[0,4,1,"cmdoption-schemauto-annotate-schema-o","--output"],[0,4,1,"cmdoption-schemauto-annotate-schema-i","-i"],[0,4,1,"cmdoption-schemauto-annotate-schema-o","-o"],[0,4,1,"cmdoption-schemauto-annotate-schema-arg-SCHEMA","SCHEMA"]],"schemauto-annotate-using-jsonld":[[0,4,1,"cmdoption-schemauto-annotate-using-jsonld-o","--output"],[0,4,1,"cmdoption-schemauto-annotate-using-jsonld-o","-o"],[0,4,1,"cmdoption-schemauto-annotate-using-jsonld-arg-SCHEMA","SCHEMA"]],"schemauto-enrich-schema":[[0,4,1,"cmdoption-schemauto-enrich-schema-annotate","--annotate"],[0,4,1,"cmdoption-schemauto-enrich-schema-i","--input"],[0,4,1,"cmdoption-schemauto-enrich-schema-annotate","--no-annotate"],[0,4,1,"cmdoption-schemauto-enrich-schema-o","--output"],[0,4,1,"cmdoption-schemauto-enrich-schema-i","-i"],[0,4,1,"cmdoption-schemauto-enrich-schema-o","-o"],[0,4,1,"cmdoption-schemauto-enrich-schema-arg-SCHEMA","SCHEMA"]],"schemauto-generalize-htmltable":[[0,4,1,"cmdoption-schemauto-generalize-htmltable-c","--class-name"],[0,4,1,"cmdoption-schemauto-generalize-htmltable-data-output","--data-output"],[0,4,1,"cmdoption-schemauto-generalize-htmltable-pandera","--no-pandera"],[0,4,1,"cmdoption-schemauto-generalize-htmltable-o","--output"],[0,4,1,"cmdoption-schemauto-generalize-htmltable-pandera","--pandera"],[0,4,1,"cmdoption-schemauto-generalize-htmltable-n","--schema-name"],[0,4,1,"cmdoption-schemauto-generalize-htmltable-table-number","--table-number"],[0,4,1,"cmdoption-schemauto-generalize-htmltable-c","-c"],[0,4,1,"cmdoption-schemauto-generalize-htmltable-n","-n"],[0,4,1,"cmdoption-schemauto-generalize-htmltable-o","-o"],[0,4,1,"cmdoption-schemauto-generalize-htmltable-arg-URL","URL"]],"schemauto-generalize-json":[[0,4,1,"cmdoption-schemauto-generalize-json-container-class-name","--container-class-name"],[0,4,1,"cmdoption-schemauto-generalize-json-depluralize","--depluralize"],[0,4,1,"cmdoption-schemauto-generalize-json-E","--enum-columns"],[0,4,1,"cmdoption-schemauto-generalize-json-enum-mask-columns","--enum-mask-columns"],[0,4,1,"cmdoption-schemauto-generalize-json-enum-threshold","--enum-threshold"],[0,4,1,"cmdoption-schemauto-generalize-json-f","--format"],[0,4,1,"cmdoption-schemauto-generalize-json-inlined-map","--inlined-map"],[0,4,1,"cmdoption-schemauto-generalize-json-max-enum-size","--max-enum-size"],[0,4,1,"cmdoption-schemauto-generalize-json-depluralize","--no-depluralized"],[0,4,1,"cmdoption-schemauto-generalize-json-omit-null","--no-omit-null"],[0,4,1,"cmdoption-schemauto-generalize-json-omit-null","--omit-null"],[0,4,1,"cmdoption-schemauto-generalize-json-o","--output"],[0,4,1,"cmdoption-schemauto-generalize-json-n","--schema-name"],[0,4,1,"cmdoption-schemauto-generalize-json-E","-E"],[0,4,1,"cmdoption-schemauto-generalize-json-f","-f"],[0,4,1,"cmdoption-schemauto-generalize-json-n","-n"],[0,4,1,"cmdoption-schemauto-generalize-json-o","-o"],[0,4,1,"cmdoption-schemauto-generalize-json-arg-INPUT","INPUT"]],"schemauto-generalize-rdf":[[0,4,1,"cmdoption-schemauto-generalize-rdf-d","--dir"],[0,4,1,"cmdoption-schemauto-generalize-rdf-o","--output"],[0,4,1,"cmdoption-schemauto-generalize-rdf-d","-d"],[0,4,1,"cmdoption-schemauto-generalize-rdf-o","-o"],[0,4,1,"cmdoption-schemauto-generalize-rdf-arg-RDFFILE","RDFFILE"]],"schemauto-generalize-toml":[[0,4,1,"cmdoption-schemauto-generalize-toml-container-class-name","--container-class-name"],[0,4,1,"cmdoption-schemauto-generalize-toml-E","--enum-columns"],[0,4,1,"cmdoption-schemauto-generalize-toml-enum-mask-columns","--enum-mask-columns"],[0,4,1,"cmdoption-schemauto-generalize-toml-enum-threshold","--enum-threshold"],[0,4,1,"cmdoption-schemauto-generalize-toml-max-enum-size","--max-enum-size"],[0,4,1,"cmdoption-schemauto-generalize-toml-omit-null","--no-omit-null"],[0,4,1,"cmdoption-schemauto-generalize-toml-omit-null","--omit-null"],[0,4,1,"cmdoption-schemauto-generalize-toml-o","--output"],[0,4,1,"cmdoption-schemauto-generalize-toml-n","--schema-name"],[0,4,1,"cmdoption-schemauto-generalize-toml-E","-E"],[0,4,1,"cmdoption-schemauto-generalize-toml-n","-n"],[0,4,1,"cmdoption-schemauto-generalize-toml-o","-o"],[0,4,1,"cmdoption-schemauto-generalize-toml-arg-INPUT","INPUT"]],"schemauto-generalize-tsv":[[0,4,1,"cmdoption-schemauto-generalize-tsv-A","--annotator"],[0,4,1,"cmdoption-schemauto-generalize-tsv-c","--class-name"],[0,4,1,"cmdoption-schemauto-generalize-tsv-s","--column-separator"],[0,4,1,"cmdoption-schemauto-generalize-tsv-data-dictionary-row-count","--data-dictionary-row-count"],[0,4,1,"cmdoption-schemauto-generalize-tsv-downcase-header","--downcase-header"],[0,4,1,"cmdoption-schemauto-generalize-tsv-E","--enum-columns"],[0,4,1,"cmdoption-schemauto-generalize-tsv-enum-threshold","--enum-threshold"],[0,4,1,"cmdoption-schemauto-generalize-tsv-max-enum-size","--max-enum-size"],[0,4,1,"cmdoption-schemauto-generalize-tsv-downcase-header","--no-downcase-header"],[0,4,1,"cmdoption-schemauto-generalize-tsv-pandera","--no-pandera"],[0,4,1,"cmdoption-schemauto-generalize-tsv-robot","--no-robot"],[0,4,1,"cmdoption-schemauto-generalize-tsv-o","--output"],[0,4,1,"cmdoption-schemauto-generalize-tsv-pandera","--pandera"],[0,4,1,"cmdoption-schemauto-generalize-tsv-robot","--robot"],[0,4,1,"cmdoption-schemauto-generalize-tsv-n","--schema-name"],[0,4,1,"cmdoption-schemauto-generalize-tsv-A","-A"],[0,4,1,"cmdoption-schemauto-generalize-tsv-E","-E"],[0,4,1,"cmdoption-schemauto-generalize-tsv-c","-c"],[0,4,1,"cmdoption-schemauto-generalize-tsv-n","-n"],[0,4,1,"cmdoption-schemauto-generalize-tsv-o","-o"],[0,4,1,"cmdoption-schemauto-generalize-tsv-s","-s"],[0,4,1,"cmdoption-schemauto-generalize-tsv-arg-TSVFILE","TSVFILE"]],"schemauto-generalize-tsvs":[[0,4,1,"cmdoption-schemauto-generalize-tsvs-s","--column-separator"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-downcase-header","--downcase-header"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-E","--enum-columns"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-enum-mask-columns","--enum-mask-columns"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-enum-threshold","--enum-threshold"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-infer-foreign-keys","--infer-foreign-keys"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-max-enum-size","--max-enum-size"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-downcase-header","--no-downcase-header"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-infer-foreign-keys","--no-infer-foreign-keys"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-robot","--no-robot"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-o","--output"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-robot","--robot"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-n","--schema-name"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-E","-E"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-n","-n"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-o","-o"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-s","-s"],[0,4,1,"cmdoption-schemauto-generalize-tsvs-arg-TSVFILES","TSVFILES"]],"schemauto-import-dosdps":[[0,4,1,"cmdoption-schemauto-import-dosdps-range-as-enums","--no-range-as-enums"],[0,4,1,"cmdoption-schemauto-import-dosdps-o","--output"],[0,4,1,"cmdoption-schemauto-import-dosdps-range-as-enums","--range-as-enums"],[0,4,1,"cmdoption-schemauto-import-dosdps-n","--schema-name"],[0,4,1,"cmdoption-schemauto-import-dosdps-n","-n"],[0,4,1,"cmdoption-schemauto-import-dosdps-o","-o"],[0,4,1,"cmdoption-schemauto-import-dosdps-arg-DPFILES","DPFILES"]],"schemauto-import-htmltable":[[0,4,1,"cmdoption-schemauto-import-htmltable-c","--class-name"],[0,4,1,"cmdoption-schemauto-import-htmltable-columns","--columns"],[0,4,1,"cmdoption-schemauto-import-htmltable-data-output","--data-output"],[0,4,1,"cmdoption-schemauto-import-htmltable-element-type","--element-type"],[0,4,1,"cmdoption-schemauto-import-htmltable-o","--output"],[0,4,1,"cmdoption-schemauto-import-htmltable-parent","--parent"],[0,4,1,"cmdoption-schemauto-import-htmltable-n","--schema-name"],[0,4,1,"cmdoption-schemauto-import-htmltable-table-number","--table-number"],[0,4,1,"cmdoption-schemauto-import-htmltable-c","-c"],[0,4,1,"cmdoption-schemauto-import-htmltable-n","-n"],[0,4,1,"cmdoption-schemauto-import-htmltable-o","-o"],[0,4,1,"cmdoption-schemauto-import-htmltable-arg-URL","URL"]],"schemauto-import-json-schema":[[0,4,1,"cmdoption-schemauto-import-json-schema-f","--format"],[0,4,1,"cmdoption-schemauto-import-json-schema-import-project","--import-project"],[0,4,1,"cmdoption-schemauto-import-json-schema-import-project","--no-import-project"],[0,4,1,"cmdoption-schemauto-import-json-schema-use-attributes","--no-use-attributes"],[0,4,1,"cmdoption-schemauto-import-json-schema-o","--output"],[0,4,1,"cmdoption-schemauto-import-json-schema-n","--schema-name"],[0,4,1,"cmdoption-schemauto-import-json-schema-use-attributes","--use-attributes"],[0,4,1,"cmdoption-schemauto-import-json-schema-f","-f"],[0,4,1,"cmdoption-schemauto-import-json-schema-n","-n"],[0,4,1,"cmdoption-schemauto-import-json-schema-o","-o"],[0,4,1,"cmdoption-schemauto-import-json-schema-arg-INPUT","INPUT"]],"schemauto-import-owl":[[0,4,1,"cmdoption-schemauto-import-owl-I","--identifier"],[0,4,1,"cmdoption-schemauto-import-owl-model-uri","--model-uri"],[0,4,1,"cmdoption-schemauto-import-owl-0","--output"],[0,4,1,"cmdoption-schemauto-import-owl-n","--schema-name"],[0,4,1,"cmdoption-schemauto-import-owl-I","-I"],[0,4,1,"cmdoption-schemauto-import-owl-n","-n"],[0,4,1,"cmdoption-schemauto-import-owl-0","-o"],[0,4,1,"cmdoption-schemauto-import-owl-arg-OWLFILE","OWLFILE"]],"schemauto-import-rdfs":[[0,4,1,"cmdoption-schemauto-import-rdfs-0","--identifier"],[0,4,1,"cmdoption-schemauto-import-rdfs-I","--input-type"],[0,4,1,"cmdoption-schemauto-import-rdfs-metamodel-mappings","--metamodel-mappings"],[0,4,1,"cmdoption-schemauto-import-rdfs-model-uri","--model-uri"],[0,4,1,"cmdoption-schemauto-import-rdfs-1","--output"],[0,4,1,"cmdoption-schemauto-import-rdfs-n","--schema-name"],[0,4,1,"cmdoption-schemauto-import-rdfs-0","-I"],[0,4,1,"cmdoption-schemauto-import-rdfs-n","-n"],[0,4,1,"cmdoption-schemauto-import-rdfs-1","-o"],[0,4,1,"cmdoption-schemauto-import-rdfs-arg-RDFSFILE","RDFSFILE"]],"schemauto-import-sql":[[0,4,1,"cmdoption-schemauto-import-sql-o","--output"],[0,4,1,"cmdoption-schemauto-import-sql-n","--schema-name"],[0,4,1,"cmdoption-schemauto-import-sql-n","-n"],[0,4,1,"cmdoption-schemauto-import-sql-o","-o"],[0,4,1,"cmdoption-schemauto-import-sql-arg-DB","DB"]],schemauto:[[0,4,1,"cmdoption-schemauto-q","--quiet"],[0,4,1,"cmdoption-schemauto-v","--verbose"],[0,4,1,"cmdoption-schemauto-q","-q"],[0,4,1,"cmdoption-schemauto-v","-v"]]},objnames:{"0":["py","class","Python class"],"1":["py","method","Python method"],"2":["py","attribute","Python attribute"],"3":["py","module","Python module"],"4":["std","cmdoption","program option"]},objtypes:{"0":"py:class","1":"py:method","2":"py:attribute","3":"py:module","4":"std:cmdoption"},terms:{"0":[0,5],"00000044":5,"00000182":5,"00000232":5,"0001":5,"01000527":5,"01000534":5,"01000535":5,"01001209":5,"022":5,"07":5,"09":5,"1":5,"105":5,"10x10":5,"156554":5,"156649":5,"156728":5,"156738":5,"2":5,"2016":5,"3":[2,5],"30":5,"31626":5,"3x3":5,"4":5,"5":5,"50":5,"5432":6,"5x2":5,"5x5":5,"6":5,"60":5,"8":5,"809":5,"9":2,"abstract":5,"case":[1,5],"class":[0,3,4,5,6],"default":[0,6],"do":0,"enum":[0,3,5,6],"float":5,"function":[0,3,6,8],"import":[1,4,5,7],"int":5,"long":5,"new":5,"null":0,"public":6,"return":[4,5,6],"true":[0,4,5,6],"var":6,A:[0,4,5,6],And:5,At:0,For:[0,4,5,6],If:[0,5],In:[0,3,5],The:[0,1,3,5,6,7],To:[0,2],Will:5,_id:5,about:0,absolut:0,ac:6,access:[0,2],across:5,ad:[4,5],add:[0,3,5],addit:[0,5],after:5,ahead:6,alchemi:6,all:[0,2,3,4,5],all_tsv_row:5,allow:[3,5],allow_parti:4,also:[3,5,6],alteio_bwmincontrol_nextera2:5,alteio_bworgcontrol_nextera2:5,alteio_bworgheat_nextera5:5,alteio_bworgheat_nextera84:5,altern:1,an:[0,1,4,6,7],ani:[0,6],annot:[1,7],annotate_el:4,annotate_schema:4,api:0,appli:5,ar:[0,5,6],arbitrari:4,area:5,arg:0,argument:0,articl:5,assign:3,assign_element_uri:4,assign_enum_mean:4,assist:3,assum:[5,6],attempt:6,attribut:0,auto:[0,5],autom:[0,2,5],automat:[1,3,5],avail:[0,3],backend:0,barr:5,barren:5,base:[0,3,5],basic_ontology_interfac:4,basicontologyinterfac:4,beauti:0,been:0,befor:0,being:[0,5],best:0,between:5,bioport:[0,1,4,5],biosample_id:5,biosample_nam:5,black:5,bog:5,bool:[4,5,6],bootstrap:[1,3,5,6],c:0,can:[0,1,2,3,4,5,6],cannot:0,cell:5,central:6,chain:[1,7],charact:5,check:2,choic:0,ci:5,class_nam:[0,5],classdefinit:6,classdefinitionnam:6,cli:3,client:6,clig:0,code:7,coerc:5,collect:1,column:[0,5],column_separ:[0,5],com:5,comma:0,command:[1,5,6],compet:5,compon:2,conf:0,conform:5,connect:6,consid:5,contain:[0,2,5],container_class_nam:[0,5],context:[0,4],convert:[1,5,6],convert_dict:5,convert_multipl:[0,5],convert_to_edge_slot:5,copi:[0,4],core:[0,6],correspond:6,count:0,craft:6,creat:[0,5,6],create_class:6,creation:5,csv:5,csv_data_gener:5,csvdatagener:[0,5],curi:0,curie_onli:4,current:4,cv:5,d:0,data:[0,1,4,5,6],data_dictionary_row_count:[0,5],data_output:0,databas:[0,3,6],dataclass:1,dataset:1,date:5,datetim:5,db:[0,6],ddl:[1,3],debug:0,default_prefix:5,definit:[0,4,5],denoraml:6,denormalize_label:6,deplur:0,depluralize_class_nam:5,deprec:0,deriv:4,descript:[0,5],descriptor:0,design:6,detail:4,determin:5,diagnost:0,dicitonari:0,dict:[0,5,6],dictionari:[0,1,5],differ:[4,6,7],dir:[0,5],direct:1,directli:0,directori:0,disambigu:5,distinct:[0,5],divid:5,doc:0,docker:1,document:4,dosdp:6,dosdpimportengin:6,downcas:0,downcase_head:5,download:0,dpfile:0,draw:5,e:[0,5],each:[0,5,6],ebi:6,ecoregion:5,ecosystem_enum:5,edg:5,edge_properti:5,eg:0,either:[4,6],element:[0,1,3,4],element_typ:0,elt:4,end:3,endpoint:4,engin:[0,4,5],enhanc:[1,3,4],enrich:[4,5],entiti:5,enum_column:[0,5],enum_mask_column:[0,5],enum_strlen_threshold:5,enum_threshold:[0,5],enumer:1,envo:5,envo_00002261:5,envo_00005781:5,envo_01000022:5,envo_01000159:5,envo_01000174:5,envo_01000752:5,envo_01001275:5,envo_01001570:5,envo_01001581:5,envo_01001582:5,envo_biome_id:5,envo_feature_id:5,envo_id:5,envo_label:5,envo_material_id:5,esnp:5,etc:3,everi:[5,6],exact_map:5,exampl:[0,5,6],exclud:[0,5],exist:[3,4],express:6,extern:4,f:0,factori:5,fals:[0,4,5,6],far:0,fc:5,fen:5,file:[0,2,3,4,5,6],fk:5,flag:0,floor:5,follow:0,foo:6,footempl:6,forc:0,foreign:[0,5],foreignkei:5,forest:5,form:0,format:[0,4,5,6],framework:[0,1,6],frictionless:6,frictionlessimportengin:6,from:[0,1,4,7],from_schema:5,frontmatt:0,ft:5,futur:[0,3],g:[0,5],gene:5,gener:[1,6,7,9],get:5,get_implementation_from_shorthand:4,github:0,given:5,graph:3,greater:[2,5],guidelin:0,gwa:5,gz:0,ha:[0,5],had:0,hand:6,harvard:5,have:[0,2,5,6],header:[0,5],help:2,heurist:5,hh:6,high:0,highli:5,hoc:5,html:0,htmltabl:5,http:[0,5],i:[0,6],id:[0,5,6],identifi:[0,5,6],identifier_slot:5,ignor:0,implement:4,implicit:5,importengin:6,incatool:0,includ:[0,1,3,4],inclus:0,index:1,indic:0,infer:[0,1,5],infer_foreign_kei:5,infer_linkag:5,inflect:5,inflect_engin:5,info:0,inform:[4,5,6],inher:5,inherit:6,initi:1,inlin:[0,5],inline_as_dict_slot_kei:5,inlined_map:0,input:[0,4,5,6],input_typ:0,insert:6,instal:[1,6],instanc:[1,5],instead:0,integ:5,interfac:[3,4],introduct:1,introspect:0,io:0,is_a:6,item:5,its:2,join:5,json:[1,3,4,7],jsondatagener:5,jsonld:4,jsonld_path:4,jsonldannot:4,jsonschema:6,jsonschemaimportengin:6,kei:[0,5],kit:0,kwarg:[5,6],label:[5,6],lack:6,land:5,languag:[1,6],larg:4,layer:5,ld:[0,4],length:5,less:[0,6],level:0,librari:4,like:[0,1,5],line:1,link:5,linkag:5,linkml:[0,2,3,5,6],linkml_model:[4,5,6],linkml_runtim:[4,5,6],list:5,log:0,lookup:4,lov:4,lower:5,lowercas:0,lowland:5,lter:5,mai:6,main:1,make:0,map:[0,3,4,5,6],mask:0,massachusett:5,max:[0,5],max_enum_s:[0,5],max_pk_len:5,maximimum:5,maximum:5,mean:5,member:0,meta:[4,5,6],metadata:[0,3,4],metamodel:[0,6],metamodel_map:0,min_distinct_fk_v:5,mine_descript:4,minimum:5,mixin:6,model:[0,1,6],model_card:6,model_uri:[0,6],modul:1,moment:5,more:[0,4,5,6],much:0,multi:[0,5],multipl:[0,1,7],must:[0,5,6],mutat:4,my:[0,6],myschema:[0,5],n:0,name:[0,5,6],natur:5,ncbitaxon:0,necessari:6,nk:5,nltk:0,node:5,none:[4,5,6],note:[0,5],now:0,number:[0,4,5],nwdmce5xdipijrrp:6,nwt_wildfires_biophysical_2016:5,o:[0,5,6],oak:[0,4],oaklib:4,obj:6,object:[4,5,6],obo:[0,4],observ:5,obtain:4,ofn:[0,6],oger:0,oi:4,ol:[0,4],omit:0,omit_nul:5,one:[0,5,6],onli:[0,3,4],ontolog:[0,3,4,6],ontology_implement:4,ontologyinterfac:4,open:5,oper:4,opposit:6,optim:6,option:[0,5,6],order:0,org:5,organ:7,other:[1,3,5],output:[0,1],over:[0,4],owl:[1,3,4,7],owlfil:0,owlimportengin:6,p:5,packag:[1,3],page:1,pair:0,panda:0,pandera:0,paramet:[4,5,6],parent:0,pars:0,pass:0,path:[0,4,6],pattern:[0,6],pc:5,peak:5,per:6,perform:4,permiss:[4,5],permissible_valu:5,permissiblevalu:4,person:0,personinfo:0,petersham:5,pfmegrnarg:6,pgsql:6,pip:2,pk:5,plot:5,plot_siz:5,plot_size_enum:5,poor:5,posit:5,possibl:0,postgresql:6,potenti:5,preambl:1,prefix:[0,4,5],present:5,presum:5,previou:0,primari:[1,3,5],procedur:5,process:5,project:0,properti:5,prov:0,provid:[0,3,5,6],psycopg2:6,pt:5,purpos:9,pwd:2,pydant:1,python:[1,2,3,7],q:0,quiet:0,rang:[0,5,6],range_as_enum:6,rangeclass:6,rdf:[1,3,4,5],rdfdatagener:5,rdffile:0,rdfsfile:0,reader:6,relat:0,relationship:5,relev:[3,5],renam:0,represent:6,requir:[0,2,4],resourc:[5,6],result:0,right:4,rna:6,robot:[0,5,6],root:0,row:[0,5],rr:5,rs2974298:5,rs2974348:5,run:[0,1,5],s41467:5,s:0,sa:4,same:[0,5],save:0,schema:[2,4,5,7],schema_annot:4,schema_autom:[4,5,6],schema_nam:[0,5],schemaannot:4,schemadefinit:[4,5,6],schemaorg:6,schemasheet:0,schemauto:[1,2,5,6],scispaci:0,score:5,sea:5,search:1,searchinterfac:4,see:[0,2,3,4,5,6],select:[4,5],selector:[0,4],semi:5,separ:[0,5],server:6,servic:4,set:0,shacl:[1,3],shell:2,shex:1,should:[0,2,5],silenc:0,singl:[0,1,7],singular:0,site:5,size:0,slot:[0,3,5,6],slot_nam:0,slot_usag:0,smim19:5,snp:5,so:[0,4,5],softwar:6,soil:5,soup:0,sourc:[1,3,4,5,6],source_schema:5,space:5,spec:6,specif:0,specifi:[0,6],spreadsheet:3,spruce:5,sql:[1,3,7],sqlite:[3,4,6],start:[2,5],state:5,step:5,str:[4,5,6],string:5,style:[0,3,6],subcommand:0,suffix:5,support:[0,3],surfac:5,syntax:[0,6],t:5,tabl:[0,7],table_numb:0,take:[4,5,6],talk:4,target:3,templat:[0,5,6],templateclass:6,term:5,terrestri:5,test:[4,5,6],text:[0,4],than:[0,5,6],them:0,thi:[0,1,2,3,4,5,6],threshold:0,ti:2,time:[0,6],todo:5,toolkit:[1,3],top:5,total:5,trait:5,translat:6,translate_object:6,treat:6,treed:5,tsv2linkml:0,tsv:[1,3,7],tsvfile:0,ttl:[0,6],turtl:[0,5],twa:5,two:5,type:[0,5,6],typic:4,ubergraph:4,uk:6,union:[4,5],uniqu:5,unit:5,unless:6,upland:5,uri:[0,3,4,5],url:0,us:[1,2,3,4,5,6],use_attribut:6,util:1,utilitiess:3,v:[0,2],valu:[0,4,5],varieti:[0,1,3],verbos:0,version:0,via:[0,1,3,5],view:5,vocabulari:[3,4],vv:0,w3id:5,w:2,wai:3,we:[0,4,5],web:[1,3,7],websit:0,when:6,where:5,which:[0,5],wider:0,wikidata:4,wildfir:5,within:[2,5],wood:5,work:[0,2,3],wrap:4,www:5,xc2:5,yaml:[0,4,5,6],you:[0,2,3,5,6],your:[0,2,3],z:5,zero:0,zf20:5,zooma:4},titles:["Command Line","LinkML Schema Automator","Installation","Introduction","Annotators","Generalizers","Importers","Packages","schema_automator.utils.schemautils","Utilities"],titleterms:{"import":[0,3,6],altern:3,an:5,annot:[0,3,4,5],autom:1,chain:5,command:0,content:[1,7],data:3,direct:2,docker:2,dosdp:0,enrich:0,environ:5,framework:3,from:[3,5,6],gener:[0,3,5],htmltabl:0,indic:1,instal:2,instanc:3,introduct:3,json:[0,5,6],jsonld:0,line:0,linkml:1,main:0,model:3,multipl:5,owl:[0,6],packag:[5,6,7],preambl:0,rdf:0,run:2,sampl:5,schema:[0,1,3,6],schema_autom:8,schemautil:8,schemauto:0,singl:5,sql:[0,6],tabl:[1,5],toml:0,tsv:[0,5],us:0,util:[3,8,9],via:2,web:5}})