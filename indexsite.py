#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'''
Created on Mon Mar 16 17:34:05 2020

@author: antony
'''
import os
import frontmatter
import json
import collections

PEOPLE_TYPES = [
  'Faculty',
  'Administration',
  'Research Staff',
  'Graduate Students',
  'Students',
]

def create_suffix_tree(root, text, item, min_length = 3):
    words = text.lower().split(' ')

    for word in words:
        word = word.strip()
        #for j in range(0, len(word)):
            
        # the root represents the empty string and we concat each letter
        # to it to form a word, hence the root never contains items because
        # we cannot search for the empty string.
        node = root

        suffix = word #word[j:]

        for k in range(0, len(suffix)):
            c = suffix[k]

            if c not in node[0]:
                node[0][c] = [{}, []]
            
            node = node[0][c]
            
            # to reduce tree size, only index items once tree is a certain
            # length, otherwise anything beginning with 'a' would be available
            if k > min_length - 2:
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

si += 1

#
# People
#

labs = {}
labsJson = json.load(open("src/data/labs.json", "r"))

for l in labsJson:
    for g in l['groups']:
        for p in g['people']:
            labs[l['id']] = p

peopleJson = json.load(open("src/data/people.json", "r"))

staff = collections.defaultdict(set)
research_staff = set()
admin_staff = set()

for group in peopleJson:
    staff[group['name']].update(group['people'])



people = collections.defaultdict(lambda: collections.defaultdict(str))

dir = 'src/data/people'
for file in sorted(os.listdir(dir)):
    post = frontmatter.load(os.path.join(dir, file))
    
    print(post, os.path.join(dir, file))
    
    id = post.metadata['id']
    
    first = post.metadata['firstName']
    last = post.metadata['lastName']

    people[last][first] = id

#siteData['sections'].append('People')

t = "Faculty"
    
siteData['sections'].append(t)

if t not in linkNameMap:
    linkNameMap[t] = len(siteData['linkNames'])
    siteData['linkNames'].append(t)

for last in sorted(people):
    for first in sorted(people[last]):
        id = people[last][first]
        
        if id in staff[t]:
            name = '{} {}'.format(first, last)
            
            to = '/research-areas/faculty/{}'.format(id)
    
            create_suffix_tree(siteData['tree'], name, len(siteData['links']))
    
            siteData['links'].append([name, si, to])

si += 1

t = "Research Staff"
    
siteData['sections'].append(t)

if t not in linkNameMap:
    linkNameMap[t] = len(siteData['linkNames'])
    siteData['linkNames'].append(t)

for last in sorted(people):
    for first in sorted(people[last]):
        id = people[last][first]
        
        if id in staff[t]:
            name = '{} {}'.format(first, last)
            
            to = '/people/{}'.format(id)
    
            create_suffix_tree(siteData['tree'], name, len(siteData['links']))
    
            siteData['links'].append([name, si, to])

si += 1

t = "Graduate Students"
    
siteData['sections'].append(t)

if t not in linkNameMap:
    linkNameMap[t] = len(siteData['linkNames'])
    siteData['linkNames'].append(t)

for last in sorted(people):
    for first in sorted(people[last]):
        id = people[last][first]
        
        if id in staff[t]:
            name = '{} {}'.format(first, last)
            
            to = '/people/{}'.format(id)
    
            create_suffix_tree(siteData['tree'], name, len(siteData['links']))
    
            siteData['links'].append([name, si, to])

si += 1


t = "Directors"
    
siteData['sections'].append(t)

if t not in linkNameMap:
    linkNameMap[t] = len(siteData['linkNames'])
    siteData['linkNames'].append(t)

for last in sorted(people):
    for first in sorted(people[last]):
        id = people[last][first]
        
        if id in staff[t]:
            name = '{} {}'.format(first, last)
            
            to = '/administration/staff' #'/people/{}'.format(id)
    
            create_suffix_tree(siteData['tree'], name, len(siteData['links']))
    
            siteData['links'].append([name, si, to])

si += 1

t = "Web Site"
    
siteData['sections'].append(t)

if t not in linkNameMap:
    linkNameMap[t] = len(siteData['linkNames'])
    siteData['linkNames'].append(t)

for last in sorted(people):
    for first in sorted(people[last]):
        id = people[last][first]
        
        if id in staff[t]:
            name = '{} {}'.format(first, last)
            
            to = '/administration/staff' #'/people/{}'.format(id)
    
            create_suffix_tree(siteData['tree'], name, len(siteData['links']))
    
            siteData['links'].append([name, si, to])

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
    
        siteData['links'].append([name, si, to])

si += 1

  
json.dump(siteData, open('static/site.index.json', 'w'), separators=(',', ':')) #, indent=2)
       