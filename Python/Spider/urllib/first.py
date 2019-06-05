from urllib import request
import os

#web url path
crawl_url_1 = "http://www.baidu.com"
crawl_url_2 = "http://edu.51cto.com"
current_crawl_url = crawl_url_1

#os file system path
local_dir = os.getcwd()
file_name = current_crawl_url.split(".")[1]
local_file_path = local_dir + os.sep + 'db' + os.sep + file_name + '.html' 

def urlopen(url, filename):
    file = request.urlopen(url)     # >>> type(file) <class 'http.client.HTTPResponse'>
    file.info()
    file.getcode()                  #http status code
    file.geturl()                   #http request url
    data = file.read()              # data is of tpye bytes !!!! not str!!
    with open(filename, 'wb') as output_file:
        output_file.write(data)
        
def urlretrieve(url, filename):
    request.urlretrieve(url, filename=filename)
    request.urlcleanup()            #clear the cached data from urlretrieve


if "__main__" ==  __name__:
    urlretrieve(current_crawl_url, local_file_path) #自动下载，并且存储为本地文件



'''
    有没有什么像nodejs中 path 模块解析 操作系统文件路径的 python模块啊 path.resolve(), path.join(), glob()什么的 ？？？
'''