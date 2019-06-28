#  Questions:
1. scrollbar 是如何隐藏的    
    firstThink: 可以overflow: hidden， 然后监听他的mouse,touch，pointer事件来改变他的位置，配之动画来模拟/加强scroll行为
2. 到达边界后的弹性碰撞动画是如何实现的
3. iscroll是如何emit自定义事件的 emit custom event, 外界如何接受/处理这些自定义事件
4. scrollbar 的shrink是如何实现的

#  名词
1. wrapper
2. scroller 
3. indicator    
    An indicator listens to the scroller position and normally it just shows its position in relation to whole
4. scrollbar    
    The scrollbars are more than just what the name suggests. In fact internally they are referenced as indicators.
5. boundary

# Todo
1. 一个滚动区域，接受swipe行为，然后自己scroll，整个页面是不是也要scroll呢？？
> Set eventPassthrough to true and the iScroll area will react to horizontal swipes only. Vertical swipes will naturally scroll the whole page.
2. 滚动区域的，click/tap事件被接管了
> Set tap to true to let iScroll emit a custom tap event when the scroll area is clicked/tapped but not scrolled.
```
    element.addEventListener('tap', doSomething, false);
```
3. 默认是没有scrollbar的，可以设置成显示。用户可以与之交互, 可以在到达顶部后shrink
> interactiveScrollbars：the scrollbar becomes draggable and user can interact with it. shrinkScrollbars to shrink it when out of boundary
4. indicators.el
> holds a reference to the scrollbar container element.The first child inside the container will be the indicator.
> ***Note that the scrollbar can be anywhere on your document, it doesn't need to be inside the scroller wrapper.***
5. indicator 和 scroller的移动速度的比值是可以设置的speedRadio
6. Snap 一屏一屏的翻滚
7. iScroll needs to know the exact dimensions of both the wrapper and the scroller.

************************
## other
1. background-size:  sets the size of the element's background image.The image can be left to its natural size, stretched, or constrained to fit the available space.