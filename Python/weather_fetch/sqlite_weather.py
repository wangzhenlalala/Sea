#coding=gbk

import sqlite3
import os
import chardet

myconnect=sqlite3.connect(u"./sqlite3_cityID/weather.db")
    #如果你的路径名使用 'r'来修饰，则会显式无法打开文件，，
if os.path.exists(u"./sqlite3_cityID/weather.db"):
    print "database opened successfully !!!"

mycursor=myconnect.cursor()

mycursor.execute('''
    CREATE TABLE weather_id(
        city_name TEXT PRIMARY KEY,
        city_id TEXT
        )''')

myconnect.commit()

print "table created"

##query = '''SELECT sql FROM sqlite_master WHERE type="table" and tbl_name="weather_id"'''
##print list(mycursor.execute(query))
## what a select return is a iterator

f=open(u".\complete.txt")

if f: print "TXT opened!"

for oneline in f:
    uni_line = oneline.decode("gbk")
    uni_list = uni_line.split(u",")

    query = "INSERT INTO weather_id VALUES(?,?)"  #how to quality table with its database??
    #here we can't use uni_list[0] in the query because sqlite3 accept direct data only
    
    mycursor.execute(query,(uni_list[0],uni_list[1])) #here we put unicode chars into my database
myconnect.commit()   

f.close()

myconnect.close()
