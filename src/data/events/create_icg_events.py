# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

from datetime import datetime
from datetime import timedelta


start = datetime(2020, 3, 10)

dates = [start + timedelta(days=x*7) for x in range(0, 40)]

for d in dates:
    fd = d.strftime('%Y-%m-%d')
   
    file = 'icg_seminar_{}.md'.format(fd)
    f = open(file, 'w')
    
    print('---', file=f)
    print('title: "ICG Data Club"', file=f)
    print('location: "Florence Irving Auditorium"', file=f)
    print('start: "{}T12:00:00"'.format(fd), file=f)
    print('end: "{}T13:00:00"'.format(fd), file=f)
    print('tags: ["Event", "Seminar"]', file=f)
    print('url: ""', file=f)
    print('---', file=f)
    print('', file=f)
    print('Weekly seminar series showcasing department research.', file=f)
    print('<!-- endexcerpt -->', file=f)
    
    f.close()
    
    
