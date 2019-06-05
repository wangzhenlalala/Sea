#coding=gbk

import chardet

dirpath=u"./new/"
file_ext=u".txt"
provience_city=u"伦加敦拿大"
list_of_one_piece=[]
current_file=''

fr=open(r"./天气预报城市代码.txt")
raw_content=fr.read()
uni_content=raw_content.decode(chardet.detect(raw_content)["encoding"])

for uni_char in uni_content:
    if uni_char != u"|" :
        list_of_one_piece.append(uni_char)
    else:
        list_of_one_piece.append(u"\n")
        city_string=''.join(list_of_one_piece)
        list_of_one_piece=[]
        current_city=city_string.split(u",")[0]
        if current_city.startswith(provience_city):
            f_current_file.write(city_string.encode("gbk"))
        else:
            provience_city=current_city
            file_name=dirpath+current_city+file_ext
            print file_name
            f_current_file=open(file_name,"w")
            f_current_file.write(city_string.encode("gbk"))
        

    
    
