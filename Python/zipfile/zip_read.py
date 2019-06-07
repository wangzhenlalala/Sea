# -*- coding:utf-8 -*-
"""
Created on Sat Oct 01 20:41:56 2016

@author: stark
"""

import zipfile
#f = open("c:/users/stark/desktop/shutdown.bat")
#print type(f)
#print f[0],f[1],f[2]
#f.close()

myzip = zipfile.ZipFile(u"c:/users/stark/desktop/myziptest.zip","r")
f = myzip.read(u"users/stark/desktop/关机.bat")
print f[::]
##myzip.re_path = myzip.extract(u"users/stark/desktop/关机.bat",u"G:/test")
myzip.write(u"c:/users/stark/desktop/plot.log","user/stark/plot.log")
myzip.close()  #myzip.read 返回的是 str 对象不是文件对象 

print "read from zip.read() successfully!\n"

