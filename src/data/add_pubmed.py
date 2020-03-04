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

pubs = json.load(open('publications.json', 'r'))


URL = 'https://www.ncbi.nlm.nih.gov/pubmed/?term={}&report=docsum&format=text'


from Bio import Entrez
Entrez.email = 'abh2138@cumc.columbia.edu'
Entrez.api_key = 'fd2a5fb8bbf75480b2371d464d6e7dd95f08'




pubmeds = collections.defaultdict(str)

c = 0

for pub in pubs:
    title = pub['title']
    
    if title == '':
        continue

    if title not in pubmeds or pubmeds[title]['id'] == '':
        print(title)
        
        handle = Entrez.esearch(db='pubmed', term=title, field='title')
        record = Entrez.read(handle)
        handle.close()
        
        if len(record['IdList']) > 0:
            handle = Entrez.efetch(db='pubmed', id=record['IdList'][0], retmode='medline', rettype='text')
            text = handle.read()
            handle.close()
        
            id = ''
        
            matcher = re.search(r'PMID: (\d+)', text)
        
            if matcher:
                id = matcher.group(1)
        
            print(id)
            pubmeds[title] = {'id':id, 'data':text}
            time.sleep(1)
            
            #break
        
    print(c)
    
    c += 1
    
    
f = open('pubmed_ids.txt', 'w')
f.write('title\tpubmed\n')
for title in sorted(pubmeds):
    f.write('{}\t{}\n'.format(title, pubmeds[title]['id']))
f.close()