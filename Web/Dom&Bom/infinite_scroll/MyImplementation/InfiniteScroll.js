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
        let scrollTop = e.target.scrollTop;
        let delta = scrollTop - this._scrollTop;
        this._anchorItem = this.calculateAnchoredItem(this._anchorItem, delta);
        let endItem = this.calculateAnchoredItem(this._anchorItem, this._scroller.offsetHeight); // 每次调用了offsetset
        if(delta > 0) {
            // 手指向上滑动, 看到下面的内容
            // 无限滚动是没有下限的
            // this.fill( Math.max(this._anchorItem.index - this.BACK_NUMBER, 0), Math.min(endItem.index + this.FRONT_NUMBER, this._items.length));
            this.fill( Math.max(this._anchorItem.index - this.BACK_NUMBER, 0), endItem.index + this.FRONT_NUMBER, this._items.length);

        } else {
            // 手指向下滑动， 看到上面的内容
            this.fill( Math.max(this._anchorItem.index - this.FRONT_NUMBER, 0), endItem.index + this.BACK_NUMBER, this._items.length);
        }
    },
    // 计算距离item offset长度的item,offset > 0 : 向下； offset < 0 : 向上 
    calculateAnchoredItem(anchorItem, offset) {
        if(offset == 0) return anchorItem;
        let distance = 0;
        let index = anchorItem.index;
        let item = {};
        if(offset > 0) {
            // 向下底对齐
            distance = this._itemDomHeight - anchorItem.offset;
            while(true) {
                if(distance >= offset) {
                    item.index = index;
                    item.offset = this._itemDomHeight - (distance - offset);
                }
                distance += this._itemDomHeight; // 这么算根本就没有考虑tombstone
                index++;
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