

import zipfile ,time
print time.time()

print hasattr(zipfile,"ZipFile")
try:
      my=zipfile.ZipFile(r"C:\Users\stark\Desktop\CAD.zip","r")
except Exception,e:
      print e

for i in my.namelist():
      print i
print my.infolist()[3].file_size
print my.infolist()[3].filename 
my.printdir()

my.close()