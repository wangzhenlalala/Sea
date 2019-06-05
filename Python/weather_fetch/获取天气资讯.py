#coding=gbk

##网上说sqlite3内部，用的是utf-8的编码，可是，我向数据库中添加的时候，用的也是Unicode string并没有
##编码成utf-8，读取的时候，还得用Unicode （%uni_result），并没有什么错误啊。

import sqlite3
import sys
import os
import urllib
import json


#############################################################################################################
def get_city_from_user():
    provience=raw_input(r"请输入你的省份/直辖市： ")
    city=raw_input(r"请输入你的城市/区： ")
    country=raw_input(r"请输入你的县/区： ")

    result = provience+city+country
    uni_result = result.decode(sys.stdin.encoding) ##用sys.stdin.encoding.来得到标准输入的编码方式
                                                   ## 或者还有locale模块的 getpreferredencoding(True)
    return uni_result


def give_city_id(sql_cursor,city):
    query = u'''SELECT * FROM weather_id WHERE city_name == "%s"''' %city

        ##query 要加u,是其实Unicode string，"%s" 的两边一定要加 引号，引号，引号！！！

    sql_cursor.execute(query)

    sql_id = sql_cursor.fetchone()
    if sql_id == None : ##如果没有符合条件的记录，sqlite3会返回None值。
        print u"              ##对不起，您的输入有误！！！"
        return None       ##在这里就发现一个问题，当没有找到记录是，应该退出当前的循环，进入下一轮循环，当时此时处在两层的函数调用中，
    else:                 ##continue，无法被while感知，所以就一层层的返回预定的出错值，突然理解了，C中的longjump()函数的作用！哈哈哈
        return sql_id[1]


def print_weather(city_id):
    if city_id:
        #url = u"http://www.weather.com.cn/data/sk/%s.html" %city_id
        url = u"http://www.weather.com.cn/data/cityinfo/%s.html" %city_id
        url_content = urllib.urlopen(url).read().decode("utf-8")
        python_content = json.loads(url_content)
        for key in python_content["weatherinfo"].keys():
            to_print = '''\t %10s  :  %-20s'''  %(key,python_content["weatherinfo"][key])
            print to_print
    else:
        return False
####################################################################################################################

myconnect = sqlite3.connect(u".\sqlite3_cityID/weather.db")
mycursor = myconnect.cursor()

while raw_input(u"退出请按【空格键】/任意键【继续查询】：").decode(sys.stdin.encoding) != u" ":
    if not print_weather(give_city_id(mycursor,get_city_from_user())):
        continue
    
myconnect.close()
