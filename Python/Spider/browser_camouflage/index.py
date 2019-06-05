##### urllib.error.URLError: <urlopen error [WinError 10061] 由于目标计算机积极拒绝，无法连接。>


import urllib.request
import urllib.error
import http.cookiejar
import os

url = "http://www.baidu.com"
url2 = "http://python.jobbole.com/89290/"
url3 = "http://files.realpython.com/media/tcpview.53c115c8b061.png"
# 头部的伪装
accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
user_agent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
accept_language = "zh-CN,zh;q=0.9,en;q=0.8"
accept_encoding = "gzip, deflate"
connection = "keep-alive"
referer = "https://www.google.com"

##头部信息的定义
headers_map = {
    "Accept": accept,
    "User-Agent": user_agent,
    "Accept-Language": accept_language,
    "Accept-Encoding": accept_encoding,
    "Connection": connection,
    "Referer": referer
}
headers_list_tuple = list( headers_map.items() )

##代理到本地的fiddler，拦截，查看http的请求的头部
proxy_table = {
    "http": "127.0.0.1:8888"
}

## 处理cookie的handler
current_dir = os.getcwd() + os.sep
cookie_filename = "cookie.txt"
cookie_file_path = current_dir +cookie_filename

cookiejar = http.cookiejar.LWPCookieJar(cookie_file_path)
cookiejar.load(cookie_file_path, ignore_discard=True, ignore_expires=True)
cookiejar.load(filename="./cookie.txt")
# print(cookiejar)
cookie_handler = urllib.request.HTTPCookieProcessor(cookiejar)

proxy_handler = urllib.request.ProxyHandler(proxy_table)

## 为opener注册handler; 十分类似node/express的中间件 body-parser cookie-parser
opener = urllib.request.build_opener(proxy_handler, cookie_handler)
## 为opener添加请求的头部
opener.addheaders = headers_list_tuple ## opener.addheaders = [(key,value), (key1, value1)]
                                       ## opener.addheaders.append(('Cookie', 'cookiename=cookievalue'))
                                       ## Request.add_header(key, val)

request = urllib.request.Request(url2) ## 添加method
                                       ## Request(url, data, headers=headers, method=method)
                                       ## request.get_method = lambda: 'PUT'
reponse = opener.open(request)
# print(file.read(80).decode())

for item in cookiejar:
    print(item.name, item.value) # <Cookie __cfduid=dd6bc42941031a7a945a804e2aca9be0f1541861819 for .realpython.com/>
                                 # cookiejar里面保存了cookie对象
                                 # cookie里面可以有很多的 field,每个field都有自己的policy
                                 # Set-Cookie: name=wangzhen; path=/ domian=.wangzhen.com; max-age=300
                                 # Set-Cookie :age=26; expires=Sun, 10-Nov-19 15:04:49 GMT; path=/; domain=.realpython.com; HttpOnly

cookiejar.save(ignore_discard=True, ignore_expires=True) ##初次获取cookie后保存在本地


'''
print( reponse.read().decode() ) 
#UnicodeEncodeError: 'gbk' codec can't encode character '\U0001f430' in position 366917: illegal multibyte sequence
but:
print( reponse.read(800).decode() ) #ok 不出错！！！ 为什么
'''


