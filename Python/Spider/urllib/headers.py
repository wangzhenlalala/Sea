from urllib import request, parse

import os

#web url path
crawl_url_1 = "http://blog.csdn.net/weiwei_pig/article/details/51178226"

current_crawl_url = crawl_url_1


#os file system path
local_dir = os.getcwd()
local_file_path_headers = local_dir + os.sep + 'db' + os.sep + "csdn_headers" + '.html'
local_file_path = local_dir + os.sep + 'db' + os.sep + "csdn" + '.html'


user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
#这个网站，爬取的时候，是首页的数据
#浏览器打开的是 正常的内容页面


def urlopen(url, filename):
    file = request.urlopen(url, timeout=40)     # >>> type(file) <class 'http.client.HTTPResponse'>
    data = file.read()              # data is of tpye bytes !!!! not str!!
    with open(filename, 'wb') as output_file:
        output_file.write(data)


def urlopen_headers(url, filename):
    headers_u = ("User-Agent", user_agent)
    opener = request.build_opener()
    opener.addheaders = [headers_u]
    print(opener.addheaders, 'opener.addheaders')
    file = opener.open(url)     # >>> type(file) <class 'http.client.HTTPResponse'>
    data = file.read()              # data is of tpye bytes !!!! not str!!
    with open(filename, 'wb') as output_file:
        output_file.write(data)       #clear the cached data from urlretrieve

def urlopen_request(url):
    key = '王镇'
    key = request.quote(key)        #转义url中的特殊字符
    req = request.Request(url + "?wd=" + key)
    req.add_header("User-Agent", user_agent)
    file = request.urlopen(req)
    data = file.read

def post_open(url):
    post_data = parse.urlencode({
        "name": 'wangzhen',
        "pass": '12345'
    }).encode("utf-8")
    req = request.Request(url, post_data)
    req.add_header("User-agent", user_agent)
    file = request.urlopen(req)

if "__main__" ==  __name__:

    urlopen(current_crawl_url, local_file_path) #自动下载，并且存储为本地文件
    urlopen_headers(current_crawl_url, local_file_path_headers) #自动下载，并且存储为本地文件


    