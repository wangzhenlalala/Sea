windows7 and python2.7

只是我自己 用 Python写的一个 获取天气的 脚本，，感觉挺好玩的。
主要用到了，urllib.sqlite,json库。
首先下载到，全国城市与城市ID 的文本文件，然后，对他们进行处理，提取出city：cityID 对，然后存储在 sqlite 数据库中。收到用户 输入后，从数据库中得到城市的ID，然后经urllib 获取天气信息的json。解析后返回给用户。
