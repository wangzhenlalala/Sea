#coding=gbk

import chardet

fr=open(r"./天气预报城市代码.txt")
fw=open(r"./complete.txt","w+")
raw_content=fr.read()
uni_content=raw_content.decode(chardet.detect(raw_content)["encoding"])
temp_list=[]

for uni_char in uni_content:
    if uni_char != u"|" :
        temp_list.append(uni_char)
    else:
        temp_list.append(u"\n")
        temp_string=''.join(temp_list)
        temp_list=[]
        fw.write(temp_string.encode("gbk"))
