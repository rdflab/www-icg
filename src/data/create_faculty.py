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

LAB_URLS = {'adolfo-ferrando':['Lab Web Site', 'http://ferrandolab.org/'],
            'christine-chio':['Lab Web Site', 'https://chiolab.com/'],
            'katia-basso':['Lab Web Site', 'https://rdf-lab.org/']}

def sort_names(names):
    name_map = collections.defaultdict(lambda: collections.defaultdict(list))
    
    for name in names:
        names = name.split(' ')
        last = names[-1]
        first = ' '.join(names[0:-1])
        
        name_map[last][first].append(name)
    
    ret = []
    
    for last in sorted(name_map):
        for first in sorted(name_map[last]):
            ret.extend(name_map[last][first])
    
    return ret

df = pd.read_csv('ICG_Directory_3.13.20.txt', sep='\t', keep_default_na=False)

id_map = {}

lab_map = collections.defaultdict(lambda: collections.defaultdict(lambda: collections.defaultdict()))

people_map = collections.defaultdict(lambda: collections.defaultdict(lambda: collections.defaultdict(lambda: collections.defaultdict(str))))

faclabmap = {}

new_lab = False
lab_group = 'Director'

for i in range(15, df.shape[0]):
    name = df.iloc[i, 0]
    name = name.strip()
    
    name = re.sub(r' +', ' ', name)
    
    if name == '':
        new_lab = True
        continue
    
    nl = name.lower()
    
    letters = []
    
    if 'md' in nl:
        letters.append('MD')
    
    if 'phd' in nl:
        letters.append('PhD')
    
    name = re.sub(r' *, *', ',', name)
    name = name.replace(',PhD', '')
    name = name.replace(' PhD', '')
    name = name.replace(',MD', '')
    
    alt = ''
    
    matcher = re.search(r'\((.+?)\)', name)
    
    if matcher:
        alt = matcher.group(1)
    
    name = re.sub(r' *\(.+?\) *', '', name)
    names = name.split(',')
    
    first_name = names[-1]
    last_name = names[0]
    formatted_name = '{} {}'.format(first_name, last_name)
    id = '{}-{}'.format(first_name.lower(), last_name.lower())
    id = id.replace('\'', '')
    id = id.replace(' ', '-')
    id = id.replace('.', '')
    
    if new_lab:
        current_lab = {'id':id,
                       'name':formatted_name,
                       'Faculty':[],
                       'Research Staff':[],
                       'Graduate Students':[],
                       'Students':[]}

        
        new_lab = False
    
    if i == 16:
        lab_group = 'Director'
    else:
        lab_group = 'Faculty' #'Principal Investigators'
    
    
    
    
    
    id_map[formatted_name] = id
    
    title = df.iloc[i, 1]
    title = title.replace('Prof ', 'Professor ')
    title = title.replace('Assoc ', 'Associate ')
    title = title.replace('GRA', 'Graduate Student')
    
    print(formatted_name, title, lab_group)
    
    if 'Prof' in title:
        # Map multiple faculoty to same lab if necessary
        lab_map[lab_group][formatted_name] = current_lab
        
        current_lab['Faculty'].append(formatted_name)
    elif 'Graduate' in title:
        current_lab['Graduate Students'].append(formatted_name)
    elif 'Student' in title:
        current_lab['Students'].append(formatted_name)
    else:
        current_lab['Research Staff'].append(formatted_name)
    
    phone = df.iloc[i, 2]
    phone = phone.replace('cell: ', '')
    
    fax = df.iloc[i, 3]
    
    email = df.iloc[i, 4]
    
    if '@' not in email:
        email = '{}@cumc.columbia.edu'.format(email)
        
    uni = re.sub(r'@.+', '', email)
    
    room = df.iloc[i, 5]
    
    url = LAB_URLS.get(id, [])
    
    #
    # Create markdown
    #
    
    g = 'Research Staff'
    
    #if 'Research' in title or 'Postdoc' in title or 'Instructor' in title:
    #    t = 'Research Staff'
    
    if 'Student' in title:
        g = 'Students'
    
    if 'GRA' in title or 'Grad' in title:
        g = 'Graduate Students'
    
    if 'Professor' in title:
        g = 'Faculty'
        
    faclabmap[id] = current_lab['id']
    
    f = open('people/{}.md'.format(id), 'w')
    print('---', file=f)
    print('id: "{}"'.format(id), file=f)
    #print('name: "{}"'.format(formatted_name), file=f)
    print('firstName: "{}"'.format(first_name), file=f)
    print('lastName: "{}"'.format(last_name), file=f)
    print('postNominalLetters: "{}"'.format(' '.join(letters)), file=f)
    print('titles: ["{}"]'.format(title), file=f)
    #print('groups: ["people:{}"]'.format(g), file=f)
    print('phone: "{}"'.format(phone), file=f)
    print('fax: "{}"'.format(fax), file=f)
    print('email: "{}"'.format(email), file=f)
    print('room: "{}"'.format(room), file=f)
    print('researchAreas: []', file=f)
    
    print('pubmed: "https://pubmed.ncbi.nlm.nih.gov/?term={}+{}%5BAuthor%5D"'.format(last_name, first_name[0]), file=f)
    
    
    if (len(url) > 0):
        print('url: "{}::{}"'.format(url[0], url[1]), file=f)
    else:
        print('url: ""', file=f)
    
    #print('formats: ["long"]', file=f)
    print('tags: ["page-format::long", "publication-format::recent"]'.format(url), file=f)
    print('---', file=f)
    f.close()
    
    people_map[g][last_name][first_name] = id
        
    

#
# Sorted map of labs to people
#

GROUPS = ['Director', 'Faculty']

SUB_GROUPS = ['Faculty', 'Research Staff', 'Graduate Students', 'Students']

all_groups = []
all_lab_map = {}

for g in GROUPS:
    group = {'name':g, 'people': []}
    
    faculty_names = sort_names(lab_map[g])
    
    for name in faculty_names:
        # f = open('faculty/{}.md'.format(id_map[name]), 'w')
        # print('---', file=f)
        # print('id: "{}"'.format(id_map[name]), file=f)
        # print('labId: "{}"'.format(lab_map[g][name]['id']), file=f)
        # print('name: "{}"'.format(name), file=f)
        # print('group: "{}"'.format(g), file=f)
        # print('phone: "{}"'.format(''), file=f)
        # print('fax: "{}"'.format(''), file=f)
        # print('email: "{}"'.format(''), file=f)
        # print('room: "{}"'.format(''), file=f)
        # print('url: ""'.format(''), file=f)
        # print('tags: []'.format(''), file=f)
        # print('---', file=f)
        # f.close()
        
        lab = {'id':id_map[name], 'name':name, 'groups':[]} #, 'divisions': []}
        
        for sg in SUB_GROUPS:
            member_names = sort_names(lab_map[g][name][sg])
            #division['people'] = [id_map[name] for name in member_names]
            lab['groups'].append({'name':sg, 'people':[id_map[name] for name in member_names]})
            #lab['divisions'].append(division)
            
        #group['faculty'].append({'personId':id_map[name], 'labId':lab_map[g][name]['id']})
        group['people'].append({'person':id_map[name], 'lab':faclabmap[id_map[name]]})

        
        # Lab names only, not the faculty mapping to the lab
        if name == lab_map[g][name]['name']:
            all_lab_map[lab_map[g][name]['name']] = lab
        
    all_groups.append(group)
    
all_labs = [all_lab_map[name] for name in sort_names(all_lab_map)]    


with open('faculty.json', 'w') as f:
    json.dump(all_groups, f, indent=2)
    
with open('labs.json', 'w') as f:
    json.dump(all_labs, f, indent=2)
  
sorted_people = collections.defaultdict(list)

for sg in SUB_GROUPS:
    for ln in sorted(people_map[sg]):
        for fn in sorted(people_map[sg][ln]):
            sorted_people[sg].append(people_map[sg][ln][fn])

with open('people.json', 'w') as f:
    json.dump(sorted_people, f, indent=2)
