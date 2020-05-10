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

new_lab = False
lab_group = 'Director'

for i in range(13, df.shape[0]):
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
    
    firstName = names[-1]
    lastName = names[0]
    formatted_name = '{} {}'.format(firstName, lastName)
    
    if new_lab:
        current_lab = {'id':formatted_name.lower().replace(' ', '-'),
                       'name':formatted_name,
                       'Principal Investigators':[],
                       'Research Staff':[],
                       'Graduate Students':[],
                       'Undergraduate Students':[],
                       'Staff':[]}

        
        new_lab = False
    
    if i == 14:
        lab_group = 'Director'
    else:
        lab_group = 'Principal Investigators'
    
    id = '{}-{}'.format(firstName.lower(), lastName.lower())
    id = id.replace('\'', '')
    id = id.replace(' ', '-')
    id = id.replace('.', '')
    
    
    
    id_map[formatted_name] = id
    
    title = df.iloc[i, 1]
    title = title.replace('Prof ', 'Professor ')
    title = title.replace('Assoc ', 'Associate ')
    
    print(formatted_name, title, lab_group)
    
    if 'Prof' in title:
        # Map multiple faculoty to same lab if necessary
        lab_map[lab_group][formatted_name] = current_lab
        
        current_lab['Principal Investigators'].append(formatted_name)
    elif 'Scientist' in title:
        current_lab['Research Staff'].append(formatted_name)
    elif 'Instructor' in title:
        current_lab['Research Staff'].append(formatted_name)
    elif 'GRA' in title:
        current_lab['Graduate Students'].append(formatted_name)
    else:
        current_lab['Staff'].append(formatted_name)
    
    phone = df.iloc[i, 2]
    phone = phone.replace('cell: ', '')
    
    fax = df.iloc[i, 3]
    
    email = df.iloc[i, 4]
    
    if '@' not in email:
        email = '{}@cumc.columbia.edu'.format(email)
        
    uni = re.sub(r'@.+', '', email)
    
    room = df.iloc[i, 5]
    
    url = ''
    
    #
    # Create markdown
    #
    
    t = 'Staff'
    
    if 'Research' in title or 'Postdoc' in title or 'Instructor' in title:
        t = 'Research Staff'
    
    if 'Professor' in title:
        t = 'Faculty'
    
    f = open('people/{}.md'.format(id), 'w')
    print('---', file=f)
    print('id: "{}"'.format(id), file=f)
    print('name: "{}"'.format(formatted_name), file=f)
    print('firstName: "{}"'.format(firstName), file=f)
    print('lastName: "{}"'.format(lastName), file=f)
    print('postNominalLetters: "{}"'.format(' '.join(letters)), file=f)
    print('title: "{}"'.format(title), file=f)
    print('phone: "{}"'.format(phone), file=f)
    print('fax: "{}"'.format(fax), file=f)
    print('email: "{}"'.format(email), file=f)
    print('room: "{}"'.format(room), file=f)
    print('url: "{}"'.format(url), file=f)
    print('group: "{}"'.format(t), file=f)
    print('researchAreas: []', file=f)
    print('tags: []'.format(url), file=f)
    print('---', file=f)
    f.close()
        
    

#
# Sorted map of labs to people
#

GROUPS = ['Director', 'Principal Investigators']

SUB_GROUPS = ['Principal Investigators', 'Research Staff', 'Graduate Students', 'Staff']

all_groups = []
all_lab_map = {}

for g in GROUPS:
    group = {'id':g.lower().replace(' ', '-'), 'name':g, 'url':'', 'faculty': []}
    
    faculty_names = sort_names(lab_map[g])
    
    for name in faculty_names:
        lab = {'id':id_map[name], 'name':name, 'url':'', 'people':[]} #, 'divisions': []}
        
        for sg in SUB_GROUPS:
            division = {'id':sg.lower().replace(' ', '-'), 'name':sg, 'url':'', 'people':[]}
            member_names = sort_names(lab_map[g][name][sg])
            division['people'] = [id_map[name] for name in member_names]
            lab['people'].extend([id_map[name] for name in member_names])
            #lab['divisions'].append(division)
            
        group['faculty'].append({'id':id_map[name], 'labId':lab_map[g][name]['id']})
        
        # Lab names only, not the faculty mapping to the lab
        if name == lab_map[g][name]['name']:
            all_lab_map[lab_map[g][name]['name']] = lab
        
    all_groups.append(group)
    
all_labs = [all_lab_map[name] for name in sort_names(all_lab_map)]    

with open('faculty.json', 'w') as f:
    json.dump(all_groups, f, indent=2)
    
with open('labs.json', 'w') as f:
    json.dump(all_labs, f, indent=2)
    

