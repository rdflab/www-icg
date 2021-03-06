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
        
        print(last, ':', first)
        
        name_map[last][first].append(name)
    
    ret = []
    
    for last in sorted(name_map):
        for first in sorted(name_map[last]):
            ret.extend(name_map[last][first])
    
    return ret

df = pd.read_csv('ICG_Directory_3.13.20.txt', sep='\t', keep_default_na=False)

id_map = {}

lab_map = collections.defaultdict(list)

new_lab = False
lab_group = 'Administration' #'Divisional Administrator'

for i in range(3, 15):
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
    name = re.sub(r' *\(.+?\) *', '', name)
    names = name.split(',')
    
    firstName = names[-1]
    lastName = names[0]
    formatted_name = '{} {}'.format(firstName, lastName)
    
    if new_lab:
        print('aha')
        current_lab = {}
        lab_map[lab_group] = current_lab
        #lab_group = 'Administrative Staff'
        new_lab = False
    
    id = '{}-{}'.format(firstName.lower(), lastName.lower())
    id = id.replace('\'', '')
    id = id.replace(' ', '-')
    id = id.replace('.', '')
    
    
    
    id_map[formatted_name] = id
    
    title = df.iloc[i, 1]
    title = title.replace('Prof ', 'Professor ')
    title = title.replace('Assoc ', 'Associate ')
    title = re.sub(r' \(.+', '', title)
    

    phone = df.iloc[i, 2]
    phone = phone.replace('cell: ', '')
    
    fax = df.iloc[i, 3]
    
    email = df.iloc[i, 4]
    
    if '@' not in email:
        email = '{}@cumc.columbia.edu'.format(email)
        
    uni = re.sub(r'@.+', '', email)
    
    room = df.iloc[i, 5]
    
    url = ''
    
    type = 'Administrative Staff'
    
    if 'Director' in title:
        type = 'Directors'
        
    if 'Administrator' in title:
        type = 'Administrator'
        
    if 'Web' in title:
        type = 'Web Site'
    
    if type not in current_lab:
        current_lab[type] = []
        
    current_lab[type].append(formatted_name)
    
    print(type, formatted_name)
    
    #
    # Create markdown
    #
    
    f = open('people/{}.md'.format(id), 'w')
    print('---', file=f)
    print('id: "{}"'.format(id), file=f)
    #print('name: "{}"'.format(formatted_name), file=f)
    print('firstName: "{}"'.format(firstName), file=f)
    print('lastName: "{}"'.format(lastName), file=f)
    print('postNominalLetters: "{}"'.format(' '.join(letters)), file=f)
    print('titles: ["{}"]'.format(title), file=f)
    print('phone: "{}"'.format(phone), file=f)
    print('fax: "{}"'.format(fax), file=f)
    print('email: "{}"'.format(email), file=f)
    print('room: "{}"'.format(room), file=f)
    #print('lab: "{}"'.format(''), file=f)
    #print('group: "{}"'.format(type), file=f)
    #print('formats: ["long"]'.format(type), file=f)
    print('researchAreas: []', file=f)
    print('url: ""'.format(url), file=f)
    print('tags: []', file=f)
    print('---', file=f)
    f.close()

#
# Sorted map of labs to people
#

GROUPS = ['Administration'] #, 'Divisional Administrator', 'Administrative Staff']

SUB_GROUPS = ['Directors', 'Administrator', 'Administrative Staff', 'Web Site']

all_divisions = []

for g in GROUPS:
    faculty = []
    
    division = {'name':g, 'groups': []}
    

    for sg in SUB_GROUPS:
          
        if sg in lab_map[g]:
            names = sort_names(lab_map[g][sg])
 
            division['groups'].append({'name':sg, 'people':[id_map[name] for name in names]})
        
    all_divisions.append(division)
        
    
with open('administration.json', 'w') as f:
    json.dump(all_divisions, f, indent=2)
    

