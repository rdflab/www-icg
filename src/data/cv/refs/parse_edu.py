from bs4 import BeautifulSoup
import json
import os
import re
import collections

files = sorted(os.listdir())


for file in files:
    data = {'id':'', 'education':[], 'training':[], 'experience':[], 'awards':[]}

    if 'txt' not in file: # or 'Dalla' not in file:
        continue
        
    #if 'Katia' not in file:
    #    continue
        
    print(file)
        
    matcher = re.search(r'(.+?)-(.+?)-', file)
    
    name = file.replace('.txt', '')
  
    f = open(file, encoding='utf-8')
    
    data['id'] = name

    mode = ''
    col_count = 0
    notes = []
    year = -1
    title = ''
    
    for line in f:
        line = line.strip()
        line = line.replace('&amp;', 'and')
        line = line.replace('<br />', '')
        line = line.replace(' - ', '-')
        line = line.replace(' -', '-')
        line = line.replace('- ', '-')
        line = line.replace('</p>', '')
        line = line.replace('Present', 'present')

        matcher = re.search(r'(<h2>Education)', line)
        if matcher is not None:
           mode = 'education'
           
        matcher = re.search(r'(<h2>.*Experience)', line)
        if matcher is not None:
           mode = 'experience'
           
        matcher = re.search(r'(<h2>.*Position)', line)
        if matcher is not None:
           mode = 'experience'
           
        matcher = re.search(r'(<h2>.*Awards)', line)
        if matcher is not None:
            mode = 'award'
            
        matcher = re.search(r'(<h2>.*Honor)', line)
        if matcher is not None:
            mode = 'award'
            
        matcher = re.search(r'(<h2>.*Affiliation)', line)
        if matcher is not None:
            mode = 'affiliation'
            
        matcher = re.search(r'(<h2>.*Training)', line)
        if matcher is not None:
            mode = 'training'
         
        matcher = re.search(r'<p>', line)
                    
        if matcher is not None:
            if mode != '':
                notes = []
                line = line.replace('<p>', '')
                
                year = 'n/a'

                matcher = re.search('(\d+\/\d+\-\d+\/\d+)', line)
                
                if matcher is not None:
                    year = matcher.group(1)
                else:
                    matcher = re.search('(\d{4}\-\d{4})', line)
                
                    if matcher is not None:
                        year = matcher.group(1)
                    else:
                        matcher = re.search('(\d+\/\d+\-present)', line)
                
                        if matcher is not None:
                            year = matcher.group(1)
                        else: 
                            matcher = re.search('(\d{4}\-present)', line)
                    
                            if matcher is not None:
                                year = matcher.group(1)
                            else:
                                matcher = re.search('(\d{4})', line)
                            
                                if matcher is not None:
                                    year = matcher.group(1)
                            
                            

                line = re.sub(r'\d+\/\d+\-\d+\/\d+', '', line)
                line = re.sub(r'\d+\-', '', line)
                line = re.sub(r'\d+\-\d+', '', line)
                line = re.sub(r'\d+\.', '', line)
                line = re.sub(r'\d+\:', '', line)
                line = re.sub(r'\d+', '', line)
                line = re.sub(r'present: ', '', line)
                line = re.sub(r': ', '', line)
                line = re.sub(r'\/ ', '', line)
                line = re.sub(r'\/', '', line)
                line = re.sub(r'present ', '', line)
                line = line.strip()
                title = line
                
                if title != '':
                    if (mode == 'education'):
                        data['education'].append({'year':year, 'title':line, 'notes':notes})
                    if (mode == 'award'):
                        data['awards'].append({'year':year, 'title':line, 'notes':notes})
                    if (mode == 'experience'):
                        data['experience'].append({'year':year, 'title':line, 'notes':notes})
                    if (mode == 'training'):
                        data['training'].append({'year':year, 'title':line, 'notes':notes})
                
                
        else:
            if not line.startswith('<'):
                notes.append(line)
        

    json.dump(data, open('{}.json'.format(name), 'w'), indent=2)
    
    f.close()
    




#json.dump(people_list, open(os.path.join(dir, 'people.json'), 'w'), indent=2)
          
    