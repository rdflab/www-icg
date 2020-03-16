#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'''
Created on Mon Mar 16 17:34:05 2020

@author: antony
'''
import os
from frontmatter import Frontmatter
import json

def create_suffix_tree(root, text, item):
    words = text.lower().split(' ')

    for word in words:
        word = word.strip()
        for j in range(0, len(word)):
            node = root

            suffix = word[j:]

            for k in range(0, len(suffix)):
                c = suffix[k]

                if c not in node[0]:
                    node[0][c] = [{}, []]

                node = node[0][c]

                if k > 0:
                    if item not in node[1]:
                        node[1].append(item)

siteData = {}
siteData['sections'] = []
siteData['links'] = []
siteData['linkNames']  = []
siteData['tree'] = [{}, []]
linkNameMap = {}

si = 0

#
# Labs
#

link = 'Lab page'
    
if link not in linkNameMap:
    linkNameMap[link] = len(siteData['linkNames'])
    siteData['linkNames'].append(link)

siteData['sections'].append('Labs')
dir = 'src/data/groups'
for file in sorted(os.listdir('src/data/groups')):
    print(file)
    post = Frontmatter.read_file(os.path.join(dir, file))
    print(post)
    
    id = post['attributes']['id']
    name = post['attributes']['name']
     
    to = '/research-areas/labs/{}'.format(id)
    
    create_suffix_tree(siteData['tree'], name, len(siteData['links']))
    
    siteData['links'].append([name , si, linkNameMap[link], to])
si += 1


#
# Publications
#

link = 'PubMed'
    
if link not in linkNameMap:
    linkNameMap[link] = len(siteData['linkNames'])
    siteData['linkNames'].append(link)

siteData['sections'].append('Publications')

data = json.load(open('src/data/publications.json', 'r'))

for pub in data:
    name = pub['title']
    pubmed = pub['pubmed']
    
    if pubmed != '':
        to = 'https://www.ncbi.nlm.nih.gov/pubmed/?term={}'.format(pubmed)
    
        create_suffix_tree(siteData['tree'], name, len(siteData['links']))
    
        siteData['links'].append([name, si, linkNameMap[link], to])

si += 1
    
    
    
    
    
    
    
    
json.dump(siteData, open('static/site.index.json', 'w')) #, indent=2)
       