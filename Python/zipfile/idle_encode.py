# -*- coding: utf-8 -*-
try:
    f = open("c:/users/stark/desktop/关机.bat")
except Exception,e:
    print e
else:
    print f.read()
