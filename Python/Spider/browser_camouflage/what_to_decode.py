file_h = open('./charset.html', 'rb') #如果不加‘rb'，打开的时候默认是text模式，解码按照gbk（本地的默认配置吗？？）
some_bytes = file_h.read(1000)
print(type(some_bytes))
print(some_bytes.decode())