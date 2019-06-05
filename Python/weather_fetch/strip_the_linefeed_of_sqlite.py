#coding=gbk

这个脚本的目的是

import sqlite3
import sys

myconnect = sqlite3.connect(u"./sqlite3_cityID/weather.db")
mycursor = myconnect.cursor()
query = u'''SELECT * FROM weather_id '''
mycursor.execute(query)

##result = mycursor.execute(query) 

sql_result = mycursor.fetchall()  


for item in sql_result:
    query =u'''UPDATE  weather_id SET city_id="%s" WHERE city_name="%s"''' %(item[1].strip(u"\n"),item[0])
    mycursor.execute(query)

myconnect.commit()

query = u'''SELECT * FROM weather_id '''
mycursor.execute(query)
sql_result = mycursor.fetchmany(3)
for item in sql_result:
    print item[0],item[1]

myconnect.close()
