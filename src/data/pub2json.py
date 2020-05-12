import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import xlrd
from openpyxl import load_workbook
import re
import collections
import json


df = pd.read_csv('publications.tsv', sep='\t', header=0, keep_default_na=False)
df.fillna(-1)

pubs = []

for i in range(0, df.shape[0]):
    pub = {}
    pub['title'] = df['title'].values[i]
    pub['authors'] = df['authors'].values[i].split(';')
    pub['journal'] = df['journal'].values[i]
    pub['year'] =  int(df['year'].values[i])
    pub['volume'] =  df['volume'].values[i]
    pub['issue'] =  df['issue'].values[i]
    pub['pages'] =  df['pages'].values[i]
    pub['pubmed'] =  df['pubmed'].values[i]
    pub['tags'] =  df['tags'].values[i].split(';')
    pub['url'] =  df['url'].values[i]
    pub['labs'] =  df['lab'].values[i].split(';')
    pub['people'] =  df['people'].values[i].split(';')
    
    pubs.append(pub)

print(pubs)

with open('publications.json', 'w') as f:
    json.dump(pubs, f, indent=2)

