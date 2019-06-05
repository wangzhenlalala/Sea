from bs4 import BeautifulSoup

file = open('./examply.html', 'rt')
content = file.read()
soup = BeautifulSoup(content, "lxml")
print('ok')

