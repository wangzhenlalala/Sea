# -*- coding: utf-8 -*-
"""
Created on Sat Oct 01 19:51:01 2016

@author: stark
"""

import zipfile


zpf = zipfile.ZipFile(r"c:/users/stark/desktop/shutdown.zip","w")
zpf.write(u"c:/users/stark/desktop/shutdown.bat")
print "write successfully!\n"
   
zpf.close()
