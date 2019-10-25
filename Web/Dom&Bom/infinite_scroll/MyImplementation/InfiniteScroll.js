function InfiniteScroll(store, scroller, config) {
    this.item_height = 0; // 每个item的高度
    this.vierport_height = 0;
    this.scroller = scroller;
    this.item_list = [];
    this.scrollTop = 0;
    this.anchorIndex = 0;
    
    this.FRONT_NUMBER = 3; // 滚动方向，前方的数量
    this.BACK_NUMBER = 3;
    this._sentinelTranslateY = 0;
    // add scroll listener to scroller
    scroller.addEventListener('scroll', this.refresh.bind(this));

    // insert sentinel
    this._sentinel = document.createElement('div');
    this._sentinel.style.cssText = `
        position: absolute;
        transform: translate(0, 1400px);
        width: 1px;
        height: 1px;
        opacity: 0;
    `;
    this.scroller.appendChild(this._sentinel);
}

InfiniteScroll.prototype = {
    onScroll() {
        
    },
    // 调用者手动制定
    // 拖动触发 resize 事件 
    onResize(viewport_height, vierport_width) {

    },
    attachContent() {
        // 每个item记录了每个dom节点的所有信息， 根据游标范围来渲染数据
        // 更新 [_startIndex, _endIndex]范围内的item
        // 回收旧的dom, itemDom, tombstoneDom
        let unusedNodes = [];
        let i = 0;
        console.log(`collect unused nodes begins`);
        for(let i = 0; i < this._items.length; i++) {
            // if(i >= this._startIndex) { // infinite loop
            if(i == this._startIndex) {
                i = this._endIndex + 1;
                continue;
            };
            if(this._items[i].node) {
                if(this._items[i].node.classList.contains("_tombstone_")) {
                    this._tombstones.push(this._items[i].node);
                    this._tombstones[this._tombstones.length - 1].classList.add('invisible');
                 } else {
                    unusedNodes.push(this._items[i].node);
                }
                this._items[i].node = null;
            }
        }
        
    },
    addItems(items){
        // 我们自己要不要维护一个数组呢？？
        // 外界的数组的长度和元素的顺序都可能发生变化， 此时需要重新更新可视范围内的元素吗？？？
        // 在scroll的时候，只要从 自己维护的数组中计算就可以了

        /**
         * 所有我们需要别人提供的参数是
         * viewport height
         * item height 
         * item list 用来计算 应该渲染哪些元素 start index, end index
         *      长度 变化
         *      顺序 变化
         *      内容 变化
         */
    },
    refresh(viewport_height, item_height, item_list) {
        this.viewport_height = viewport_height;
        this.item_height = item_height;
        this.item_list = item_list;
        // 1. 更新实例的数据
        // 2. 计算应该渲染哪些元素
        let preAncorItem = 
        // 3. 更新范围内元素的dom
        // 4. 更新当前的状态
    }
}