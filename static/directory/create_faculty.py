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
    
    for last in name_map:
        for first in name_map[last]:
            ret.extend(name_map[last][first])
    
    return ret

df = pd.read_csv('ICG_Directory_3.13.20.txt', sep='\t', keep_default_na=False)

id_map = {}

lab_map = collections.defaultdict(lambda: collections.defaultdict(lambda: collections.defaultdict(list)))

new_lab = False
lab_group = 'Director'

for i in range(12, df.shape[0]):
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
        current_lab = lab_map[lab_group][formatted_name]
        lab_group = 'Principal Investigators'
        new_lab = False
    
    id = '{}-{}'.format(firstName.lower(), lastName.lower())
    id = id.replace('\'', '')
    id = id.replace(' ', '-')
    id = id.replace('.', '')
    
    
    
    id_map[formatted_name] = id
    
    title = df.iloc[i, 1]
    title = title.replace('Prof ', 'Professor ')
    title = title.replace('Assoc ', 'Associate ')
    
    if 'Prof' in title:
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
    
    f = open('people/{}.md'.format(id), 'w')
    print('---', file=f)
    print('id: "{}"'.format(id), file=f)
    print('name: "{}"'.format(formatted_name), file=f)
    #print('firstName: "{}"'.format(firstName), file=f)
    #print('lastName: "{}"'.format(lastName), file=f)
    print('letters: [{}]'.format(','.join(['"{}"'.format(l) for l in letters])), file=f)
    print('title: "{}"'.format(title), file=f)
    print('phone: "{}"'.format(phone), file=f)
    print('fax: "{}"'.format(fax), file=f)
    print('email: "{}"'.format(email), file=f)
    print('room: "{}"'.format(room), file=f)
    print('url: "{}"'.format(url), file=f)
    print('---', file=f)
    f.close()
        
    
    if 'Antony' in formatted_name:
        print(i, id, formatted_name)

#
# Sorted map of labs to people
#

GROUPS = ['Director', 'Principal Investigators']

SUB_GROUPS = ['Principal Investigators', 'Research Staff', 'Graduate Students', 'Staff']

all_divisions = []

for g in GROUPS:
    faculty = []
    
    division = {'id':g.lower().replace(' ', '-'), 'name':g, 'url':'', 'faculty': []}
    
    faculty_names = sort_names(lab_map[g])
    
    for name in faculty_names:
        lab = {'id':id_map[name], 'name':name, 'url':'', 'subgroups': []}
        
        for sg in SUB_GROUPS:
            subgroup = {'id':sg.lower().replace(' ', '-'), 'name':sg, 'url':'', 'members':[]}
            member_names = sort_names(lab_map[g][name][sg])
            subgroup['members'] = [id_map[name] for name in member_names]
            lab['subgroups'].append(subgroup)
            
        division['faculty'].append(lab)
        
    all_divisions.append(division)
        
    
with open('faculty.json', 'w') as f:
    json.dump(all_divisions, f, indent=2)
    
