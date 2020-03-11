from bs4 import BeautifulSoup
import json
import os
import re
import collections

def create_person():
    return {'id':'', 
            'firstName':'', 
            'lastName':'', 
            'titles':[], 
            'email':[],
            'photo':'',
            'phoneNumbers':[], 
            'tags':['People'],
            'researchAreas': [],
            'groups':[],
            'type':'',
            'urls':[]}
    
def create_group(id, name):
    return {'id':id,
            'type':'Lab',
            'name':name, 
            'photo':'',
            'leaders':[],
            'members':[],
            'email':[],
            'phone':[],
            'urls':[]}

DIR = '../icg.cpmc.columbia.edu/research-faculty/'

PEOPLE_DIR = '/mnt/hddb/websites/www-icg/src/data/people'
GROUP_DIR = '/mnt/hddb/websites/www-icg/src/data/groups'

files = sorted(os.listdir(DIR))

people = collections.defaultdict(lambda: collections.defaultdict(object))
labs = {}

for file in files:
    if 'html' not in file or 'lab' in file or 'pub' in file or 'research' in file: # or 'Dalla' not in file:
        continue
        
    #if 'Katia' not in file:
    #    continue
        
    print(file)
        
    matcher = re.search(r'(.+?)-(.+?)-', file)
    
    name = ' '.join(file.replace('.html', '').split('-'))
    lab_id = name.replace(' ', '-').lower()
        
    f = open(os.path.join(DIR, file), encoding='utf-8')
    #soup = BeautifulSoup(f, features='html.parser')

    #lis = soup.find_all('li')
    
    data = {'labId':lab_id, 'people':[]}
    
    count_map = collections.defaultdict(int)
    
    education_mode = False
    honor_mode = False
    person = create_person()
    td_data = []
    td_mode = False
    
    is_faculty = True
    get_ready = False
    person_mode = False
    education_mode = False
    award_mode = False
    col_count = 0
    
    for line in f:
        line = line.strip()
        line = line.replace('&amp;', 'and')
        
        matcher = re.search(r'(<h2>Education)', line)
        
        if matcher is not None:
           education_mode = True
           
        matcher = re.search(r'(<h2>Awards)', line)
            
        if matcher is not None:
            award_mode = True
         
        if award_mode:
            matcher = re.search(r'<p>(\d{4}(?:-\d{4})) +(.+)', line)
                    
        if matcher is not None:
            print(name, matcher.group(1), matcher.group(2))
        elif education_mode:
            pass
        else:
            pass
        
        

    
    f.close()
    




#json.dump(people_list, open(os.path.join(dir, 'people.json'), 'w'), indent=2)
          
    