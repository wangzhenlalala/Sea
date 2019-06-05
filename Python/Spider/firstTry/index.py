import re
from urllib import request
import pprint
from subprocess import Popen, PIPE
# tidy = Popen('tidy', stdin=PIPE, stdout=PIPE, stderr=PIPE)
import os
current_dir = os.getcwd()
dir = current_dir + os.sep + 'pic' + os.sep
print(dir)
def craw(url, page):
    html1 = request.urlopen(url).read() #binary
    
    html1 = str(html1)
    
    pattern1 = r'<div id="plist" .+?<div class="page clearfix">'
    result1 = re.compile(pattern1).findall(html1) 
    result1 = result1[0]    #找到包含 img的最外层 div
    img_pattern = r'<img.+?width="220".*?src="(.+?\.(jpg|png))".*?\/?>'
    img_re = re.compile(img_pattern)
    result2 = img_re.findall(result1)
    index = 1
    for item in result2:
        # print(item[0])
        #只能指定文件名 bane.jpg; 不能带有目录名 pic/dir2/a.jpg 不可以; 如果带目录路径要提前存在
        filename, xx = request.urlretrieve("http:"+item[0], './pic/' + str(index) +  '.' + item[1]) 
        print(filename)
        index = index + 1
if __name__ == '__main__':
    url = "https://list.jd.com/list.html?cat=9987,653,655&page=1&sort=sort_rank_asc&trans=1&JL=6_0_0#J_main"
    craw(url, 1)

name = """
    //img30.360buyimg.com/jgsq-productsoa/jfs/t27292/168/1057078522/1632/ae3f0411/5bc042fbN42f84c5e.png",sizingMethod="noscale");\'></div>            
    </div>\n            <div class="p-scroll">\n              <span class="ps-prev"> < </span>\n              <span class="ps-next"> > 
    </span>\n              <div class="ps-wrap">\n                <ul class="ps-main">\n                  
    <li class="ps-item" ids=""> <a title="\xe9\x93\x82\xe5\x85\x89\xe9\x87\x91" 
    href="javascript:;" ><img  data-sku="6703015" width="25" height="25" 
    class="loading-style2" data-lazy-img="//img10.360buyimg.com/n9/jfs/t20305/259/1209609364/193755/a3940552/5b21ce25N131ce626.jpgjpg
"""