$('#example').tooltip(options)
             .tooltip('show')
             .tooltip('hide')
             .tooltip('dispose')
             .tooltip('toogle')

1. 为某个元素添加一个tooltip 要提供一个怎样的api
2. tooltip元素，应该被插入dom的什么位置
    * ele的子元素
    * ele的兄弟元素
    * body的子元素

1. eleA.tooltip(content, options)
2. tooltip(eleA, content, options);

## 如何然tooltip在附主上水平居中，（不知晓tooltip的宽度的情况下)


1. 把tooltip放在body中
2. 如何为某一个元素添加tooltip ??
3. 如何隐藏改元素的tooltip ??
4. 某个元素重复添加tooltip的时候如何处理，避免在body中添加属于同一个元素的tooltip ??

5. 当有多个元素都需要添加tooltip的时候
    1. 如何标识某个tooltip属于某个element ？？
    那么每个tooltip都要有一个id，这个id要放在element那里
    有一个集中的地方，来为每个tooltip分配一个id
    有一个集中的地方，根据tooltip的id来对tooltip进行处理