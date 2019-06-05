## XPath： 7种节点
    a. 元素 <person></person>
    b. 属性 id="33" or name="wangzhen"
    c. 文本 hello world
    d. 命名空间
    e. 处理指令
    f. 注释 
    g. 文档节点(根节点)
## 当前节点
## 路径表达式
    nodename: 选取此节点的所有子节点
    /       : 从根节点开始选取
    //      ： 从匹配选择的当前节点选择文档中的节点， 而不管她再文档中的位置
    .       : 选择当前的节点
    ..      : 选择当前节点的父节点
    @       ： 选取属性

## 谓词(Predicates)
    被嵌在 []当中
    *     : 所有元素节点
    @*    ：任何属性节点
    node(): 任何类型的节点

********************************************************************************************************
## 步(Step):
    轴(axis)                 : 定义所要选择的节点 与 当前节点 之间的关系
    节点测试(node-test)       : 识别某个轴内部的节点
    0-n个谓词(Predicates)    : 更深入的提取所选择的节点

    AXES_NAME::NODE_TEST[PREDICATES]


## XPath 运算符
    |  //book | //child
    + - * div mode
    = != > < >= <= 
    or and

## details

1. hierarchy 
```
    /*/*/*/BBB
    如果表达式 以 '/'，开头，就好像是在html中的document中查找  the root node
    如果以 '//' 开头，就是任意的地方开始
```

2. position in his parent 
```
    /A/B[1]
```

3. attribute 
```
    /A/B/C[@name]
```

4. attribute value 
```
    //BBB[normalize-space(@name)='bbb'] ##leading and trailing spaces are removed before comparison
```

5. Nodes counting 
```
//*[count(BBB)=2]
```

6. Playing with names of selected elements
```
    //*[name() == 'BB'] === //BBB
    //*[starts_with(name(), 'B')]
    //*[contains(name(),'C')]
```

7. Length of String
```
    //*[string-length(name()) = 3]
    //*[string-length(name()) <  3] or //*[string-length(name()) &lt 3]
```

8. combine expressions
```
    /AAA/EEE | //DDD/CCC | /AAA | //BBB
```

9. Child axis
```
    /AAA == /child::AAA
    /AAA/BBB == /child::AAA/child::BBB 
```

10. Descendant axis
```
    /descendant::*
    /AAA/BBB/descendant::*
    //CCC/descendant::DDD
```

11. Parent axis
```
    //DDD/parent::*
```

12. Ancestor axis
```
    /AAA/BBB/DDD/CCC/EEE/ancestor::*
    //FFF/ancestor::AAA
```

13. Following-sibling axis
```
    /AAA/BBB/following-sibling::* (all the following siblings not only one )
    ## 文档中当前节点的结束标签之后的所有节点。
```

14. Preceding-sibling axis
```
    /AAA/XXX/preceding-sibling::*
```

15. Following axis
```
    //ZZZ/following::*  ## 对一棵树进行深度优先的遍历，得到的一个线性序列。如在当前node之后的所有节点。不只是其后面的兄弟节点
```

16. Preceding axis
```
    //ZZZ/preceding::*
```

17. Descendant-or-self axis
```
    /AAA/XXX/descendant-or-self::* ## 包含该节点本身， 以及其所有的子孙节点 类似于 outterHtml的感觉
```

18. Ancestor-or-self axis
```
    /AAA/XXX/DDD/EEE/ancestor-or-self::*
```

19. /bookstore/book/price/text()


**************************************
with scrapy Xpath :
    sel.xpath('//li[re:test(@class, "item-\d$")]//@href').extract()

res.css('div.co_content8')
Selector xpath="descendant-or-self::div[@class and contains(concat(' ', normalize-space(@class), ' '), ' co_content8 ')]
第一次爬取了电影天堂的电影数据， 浏览器中看到的html结构，和爬来的结构不一样
javascirpt 会改变html的结构。
所以console里面和scrapy shell里面看到的不要一样