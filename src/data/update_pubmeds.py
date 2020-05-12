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
        
json.dump(pubs, open('publications.json', 'w'), indent=2)