/*
    data: 说明数据已经异步加载完成了
    node: 该数据对应的dom节点，如果data == null, 则为tombstone，data != null, 说明是对应的节点
*/
let Item = {
    node: null, // dom or tombstone dom
    // height: 0, // 已知的
    top: 0, // 距离 _items[0] 的距离
    data: {}
}
/**
 * 
 * scroll是要滚动元素的元素 
 */
function InfiniteScroll(store, scroller, config) {
    this._store = store;
    this._itemDomHeight = config.itemHeight; // 每个item的高度
    this._tombstoneHeight = config.tombstoneHeight;
    this._scroller = scroller;
    this._items = [];
    this._scrollTop = 0;
    this._anchorItem = {
        index: 0,
        offset: 0,
    };
    this._startIndex = 0;
    this._endIndex = 0; // 生成dom，的item的范围
    this.FRONT_NUMBER = 20; // 滚动方向，前方的数量
    this.BACK_NUMBER = 20;
    
    // add scroll listener to scroller
    scroller.addEventListener('scroll', this.onScroll.bind(this));

    // insert sentinel
    let sentinel = document.createElement('div');
    sentinel.style.cssText = `
        position: absolute;
        transform: translate(0, 1400px);
        width: 1px;
        height: 1px;
        opacity: 0;
    `;
    scroller.appendChild(sentinel);
    this._sentinel = sentinel;
}

InfiniteScroll.prototype = {
    onScroll(e) {
        e.preventDefault();
        let delta = this._scroller.scrollTop - this._scrollTop;
        this._scrollTop = e.target.scrollTop;
        if(this._scrollTop == 0) {
            this._anchorItem = { index: 0, offset: 0 };
        }else {
            this._anchorItem = this.calculateAnchoredItem(this._anchorItem, delta);
        }
        
        let endItem = this.calculateAnchoredItem(this._anchorItem, this._scroller.offsetHeight); // 每次调用了offsetset

        // 这里只计算 startIndex 和 endIndex 不做边界处理
        if(delta > 0) {
            // 手指向上滑动, 看到下面的内容
            // 无限滚动是没有下限的
            // this.fill( Math.max(this._anchorItem.index - this.BACK_NUMBER, 0), Math.min(endItem.index + this.FRONT_NUMBER, this._items.length));
            this.fill( this._anchorItem.index - this.BACK_NUMBER, endItem.index + this.FRONT_NUMBER);

        } else {
            // 手指向下滑动， 看到上面的内容
            this.fill( this._anchorItem.index - this.FRONT_NUMBER, endItem.index + this.BACK_NUMBER);
        }
    },
    // 计算距离item offset长度的item,offset > 0 : 向下； offset < 0 : 向上 
    calculateAnchoredItem(anchorItem, offset) {
        // 要考虑tombstone
        if(offset == 0) return anchorItem;
        let distance = 0;
        let index = anchorItem.index;
        let item = {};
        if(offset > 0) {
            // 向下底对齐 
            // 有可能会遇到底部啊
            // 当前的元素有可能都是，tombstone
            // distance = this._itemDomHeight - anchorItem.offset; 
            
            if(this._items[index].data == null) {
                // tombstone节点, 由于数据是成批到来的，那么再改节点之后的节点都为tomebsone节点
                distance = this._tombstoneHeight - anchorItem.offset; 
                index = index + Math.floor((delta - distance) / this._tombstoneHeight);
                offset = 

            } else {
                distance = this._itemDomHeight - anchorItem.offset;
                while(true) {
                    if(distance >= offset) {
                        item.index = index;
                        item.offset = this._itemDomHeight - (distance - offset);
                    }
                    distance += this._itemDomHeight; // 这么算根本就没有考虑tombstone
                    index++;
                }
            }            
        } else {
            // 向上顶对齐
            distance = anchorItem.offset;
            offset *= -1;
            while(true) {
                // 每个的上边缘
                if(distance >= offset) {
                    item.index = index;
                    item.offset = distance - offset;
                }
                distance -= this._itemDomHeight; // 这么算根本就没有考虑tombstone
                index--;
            } 
        }
    },
    // 为[start, end] 范围内的item生成对应的dom
    fill(start, end) {
        
    },
}