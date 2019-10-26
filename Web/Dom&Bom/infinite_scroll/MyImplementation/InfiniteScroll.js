function InfiniteScroll(scroller, config) {
    this.item_height = 0; // 每个item的高度
    this.viewport_height = 0;
    this.scroller = scroller;
    this.item_list = [];
    this.scrollTop = 0;
    this.anchorIndex = 0;
    
    this.FRONT_NUMBER = 3; // 滚动方向，前方的数量
    this.BACK_NUMBER = 3;
    this.extra_count = 5;
    this.render = config.render;

    this._sentinelTranslateY = 0;
    // insert sentinel
    this._sentinel = document.createElement('div');
    this._sentinel.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
    `;
    this.scroller.appendChild(this._sentinel);
    this.scroller.addEventListener('scroll', this.onScroll.bind(this));
}

InfiniteScroll.prototype = {
    // onScroll() { // 这样做，this 不是实例
    //     this.refresh(this.viewport_height, this.item_height, this.item_list);
    // },
    onScroll: function() { // 这样做，this 不是实例
        this.refresh(this.viewport_height, this.item_height, this.item_list);
    },
    // 调用者手动制定
    // 拖动触发 resize 事件 
    onResize: function(viewport_height, vierport_width) {

    },
    attachContent: function() {
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
    addItems: function(items){
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
    refresh: function(viewport_height, item_height, item_list) {
        // 每次之渲染固定个数的元素
        this.viewport_height = viewport_height;
        this.item_height = item_height;
        this.item_list = item_list;
        this.anchorIndex = Math.floor(this.scroller.scrollTop / this.item_height);
        // console.log(`${this.scroller.scrollTop} / ${this.item_height} = `, `${this.scroller.scrollTop / this.item_height}`)
        // 1. 更新实例的数据

        // 2. 计算应该渲染哪些元素
        let view_item_count = Math.ceil(this.viewport_height / this.item_height);
        let startIndex = this.anchorIndex >= this.extra_count ? this.anchorIndex - this.extra_count
                                                              : this.anchorIndex;

        let endIndex = Math.min(this.anchorIndex + view_item_count + this.extra_count, this.item_list.length - 1); 
        console.log('refresh', `view_item, anchor - start - end`, `${view_item_count} - ${this.anchorIndex} - ${startIndex} - ${endIndex}`);
        // 3. 更新范围内元素的dom
        let curPos = startIndex * this.item_height
        // let offDoc = document.createDocumentFragment(); // 把sentinel 也移除了

        let oldDoms = this.scroller.querySelectorAll('.item');
        oldDoms = Array.prototype.slice.call(oldDoms);
        for(let i = startIndex, j = 0; i <= endIndex; i++) {
            // 定位每个item
            // dom在哪里
            // 如何复用已经存在于docuemnt中的dom元素呢
            let dom = this.render(this.item_list[i], oldDoms.pop());
            dom.style.cssText = `
                position: absolute;
                transform: translateY(${curPos}px);
                background: ${this.item_list[i].background};
            `
            this.scroller.appendChild(dom);
            curPos += this.item_height;
        }
        while(oldDoms.length > 0) {
            this.scroller.removeChild(oldDoms.pop());
        }
        // this.scroller.appendChild(offDoc);
        this._sentinel.style.transform = `translateY(${this.item_list.length * this.item_height}px)`;
        // 4. 更新当前的状态
    }
}