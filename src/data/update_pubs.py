#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Mar  3 13:45:43 2020

@author: antony
"""

import json
import time
import urllib.request
import collections
import subprocess
import re
from shutil import copyfile
import os
from datetime import datetime
import time
import pandas as pd
import numpy as np
from pathlib import Path
import frontmatter

# map people to ids

id_map = {}

for file in os.listdir('people'):
    name = Path(file).stem
    tokens = name.split('-')
    
    last = '-'.join(tokens[1:])
    
    post = frontmatter.load(os.path.join('people', file))
    
    initials = ''.join([x[0] for x in post['firstName'].lower().split(' ')])
    lastName = post['lastName'].lower()
    print(initials, lastName)
    
    id_map['{} {}'.format(lastName, initials)] = name


current_milli_time = int(round(time.time() * 1000))

bak = 'publications.{}.json'.format(current_milli_time)

copyfile('publications.json', bak)

pubs = json.load(open('publications.json', 'r'))

df_pubmeds = pd.read_csv('pubmed_ids.txt', sep='\t', header=0)


for pub in pubs:
    title = pub['title']
    
    idx = np.where(df_pubmeds['title'] == title)[0]
    
    if idx.size > 0:
        idx = idx[0]
        
        pub['pubmed'] = '{}'.format(df_pubmeds['pubmed'].values[idx])
        
        
    # update people
    
    people = set(pub['people'])
    
    for author in pub['authors']:
        al = author.lower()
        
        for id in id_map:
            if al in id or id in al:
                people.add(id_map[id])
        
        #if al in id_map:
        #    people.add(id_map[al])
            
        pub['people'] = list(sorted(people))
        
json.dump(pubs, open('publications.json', 'w'), indent=2)