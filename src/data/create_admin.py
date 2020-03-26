# -*- coding: utf-8 -*-
"""
Created on Thu Mar 26 11:44:28 2020

@author: nt0ny
"""


import pandas as pd
import numpy as np
import collections

df = pd.read_csv('admin.txt', sep='\t', header=0)

type = 'Administration'
tags = 'People'

for i in range(0, df.shape[0]):
    names = df['NAME'][i].split(', ')
    
    firstName = names[1].strip()
    lastName = names[0].strip()
    email = df['EMAIL'][i].strip()
    phone = df['PHONE'][i].strip()
    room = df['ROOM'][i].strip()
    title = df['TITLE'][i].strip()
    
    id = '{}-{}'.format(firstName.lower().replace(' ', '-'), lastName.lower().replace(' ', '-'))
    
    file = 'people/{}.md'.format(id)
    
    print(id, file)
    
    f = open(file, 'w')
    print('---', file=f)
    print('id: "{}"'.format(id), file=f)
    print('firstName: "{}"'.format(firstName), file=f)
    print('lastName: "{}"'.format(lastName), file=f)
    print('type: "Administration"', file=f)
    print('photo: ""', file=f)
    print('titles: ["{}"]'.format(title), file=f)
    print('letters: []', file=f)
    print('email: ["{}"]'.format(email), file=f)
    print('phone: ["{}"]'.format(phone), file=f)
    print('room: ["{}"]'.format(room), file=f)
    print('researchAreas: []', file=f)
    print('tags: ["People", "Administration"]', file=f)
    print('urls: []', file=f)
    print('---', file=f)
    f.close()