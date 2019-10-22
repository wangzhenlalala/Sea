/*
    data: 说明数据已经异步加载完成了
    node: 该数据对应的dom节点，如果data == null, 则为tombstone，data != null, 说明是对应的节点
*/
let Item = {
    node: null, // dom or tombstone dom
    height: 0, // 已知的
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
    this._loadedItemNumber = 0; // 已经异步加载来的数据的数目
    this._tombstones = [];
    this._startIndex = 0;
    this._endIndex = 0; // 生成dom，的item的范围 _endIndex也会被渲染出来
    this.FRONT_NUMBER = 3; // 滚动方向，前方的数量
    this.BACK_NUMBER = 3;
    this._sentinelTranslateY = 0;
    this._distanceAfterEndIndex = 200;
    this._isRequestInProgress = false; // 保证数据请求的顺序到达 and 节省资源
    // add scroll listener to scroller
    scroller.addEventListener('scroll', this.onScroll.bind(this));

    // insert sentinel
    this._sentinel = document.createElement('div');
    this._sentinel.style.cssText = `
        position: absolute;
        transform: translate(0, 1400px);
        width: 1px;
        height: 1px;
        opacity: 0;
    `;
    this._scroller.appendChild(this._sentinel);

    // set it go 
    this.onScroll();
}

InfiniteScroll.prototype = {
    onScroll() {
        // 不要 event 参数， 数据直接从scroller上获取
        let delta = this._scroller.scrollTop - this._scrollTop;
        this._scrollTop = this._scroller.scrollTop;
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
        console.log('onscroll end');
        
    },
    // 计算距离item offset长度的item,offset > 0 : 向下； offset < 0 : 向上 
    calculateAnchoredItem(anchorItem, offset) {
        console.count('calculateAnchoredItem begins');
        if(offset == 0) return anchorItem;
        offset = offset + anchorItem.offset;
        let index = anchorItem.index;
        let tombstones = 0;
        if(offset < 0) {
            while ( 
                offset < 0 && // 正常的终止
                index > 0 && // 数组边界判断
                this._items[index-1].data != null // tombstone判断
            ) {
                offset += this._itemDomHeight; // _items[i-1].height
                index--;
            }
            // tombstones = Math.max(-index, Math.ceil(Math.min(offset, 0) / this._tombstoneHeight));
            // 正常终止
            if(offset >= 0) {
                offset = offset;
                index = index;
            }

            // 数组边界
            if(this.index >= 0) {
                index = index;
                offset = 0;
            }

            // tombstone // 这里总是找不到 this._items[index-1] 为 undefined
            if(this._items[index - 1].data == null) {
                offset = Math.max(-index*this._tombstoneHeight, offset);
                tombstones = Math.ceil(-offset / this._tombstoneHeight);

                index = index - tombstones;
                offset = tombstones * this._tombstoneHeight + offset; 
            }

        } else {
            // 注意 >，>=
            while (
                index < this._items.length && // 到达数组边界
                offset > 0 && // 还可以继续 
                this._items[index].data != null && //不是tombstone
                this._itemDomHeight < offset // 不是改item，继续
            ) {
               offset -= this._itemDomHeight;
               index++; 
            }
            // 这里的offset不会是负的
            if(index >= this._items.length || this._items[index].data == null) {
                tombstones = Math.floor( Math.max(offset, 0) / this._tombstoneHeight);
            }
            offset -= tombstones * this._tombstoneHeight; 
            index = index + tombstones;
        }
        return {
            index: index,
            offset: offset
        }
    },
    fill(start, end) {
        console.log('fill begins: ', `start: ${start}, end: ${end}`);
        // 为[start, end] 范围内的item生成对应的dom
        this._startIndex = Math.max(0, start);
        this._endIndex = end;
        for(let i = this._startIndex; i <= this._endIndex; i++ ) {
            if(this._items.length <= i) {
                this._items.push({
                    node: null,
                    top: 0,
                    data: null,
                    height: 0,
                });
            }
        }
        this.attachContent();
    },
    getTombstone(dom) {
        // tombstone dom的样式是由， store提供的，但是他的显示和隐藏是由我么操控的
        // 不像 item dom, 如何根据 data渲染dom， 逻辑完全由store决定
        // tombstone上的类名不应该是我们自己来维护吗
        dom = dom || this._store.createTombstone();
        dom.classList.remove('invisible');
        dom.style.transform = "";
        dom.classList.add('_tombstone_');
        return dom;
    },
    attachContent() {
        // 每个item记录了每个dom节点的所有信息， 根据游标范围来渲染数据
        // 更新 [_startIndex, _endIndex]范围内的item
        // 回收旧的dom, itemDom, tombstoneDom
        let unusedNodes = [];
        let i = 0;
        console.log(`collect unused nodes begins`);
        for(let i = 0; i++; i < this._items.length) {
            if(i >= this._startIndex) {
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
        console.log(`collect unused nodes ends`);
        console.log(`unusedNodes: ${unusedNodes.length}`, )
        // 更新dom 
        console.log(`update dom begins`);
        for (i = this._startIndex; i <= this._endIndex; i++) {
            // 可以放在fill里面做
            while (this._items.length <= i) {
                this.addItem();
            }
            let item = this._items[i];
            if(item.node) {
                // have node
                if(item.node.classList.contains('_tombstone_') && item.data) {
                    item.node.classList.add('invisible');
                    this._tombstones.push(item.node);
                    item.node = null; 
                } else {
                    // it has been rendered !! next one
                    // tombstone has no data
                    // itemdom has data 
                    continue;
                }
            }
            if(item.data) {
                item.node = this._store.render(item.data, unusedNodes.pop());
            } else {
                item.node = this.getTombstone(this._tombstones.pop());
            }
            item.top = -1;
            item.node.style.position = 'absolute';
            this._scroller.appendChild(item.node);
        }

        // 删除无用的dom
        console.log(`delete unless item nodes begins.`);
        while(unusedNodes.length) {
            this._scroller.removeChild(unusedNodes.pop()) // 从document中删除
        };
        console.log(`delete unless item nodes ends. ${unusedNodes.length}`);

        // 到这里 [_startIndex, _endIndex] 里面的每个item都对应有node
        // 更新每个dom的位置, 插入到document中
        this._scrollTop = 0;
        for(let j = 0; j < this._anchorItem.index; j++) {
            this._scrollTop += this._items[j].data ? this._itemDomHeight : this._tombstoneHeight;
        };
        this._scrollTop = this._scrollTop + this._anchorItem.offset;
        console.log(`this._scrollTop updated: ${this._scrollTop}`);
        let curPos = this._scrollTop - this._anchorItem.offset;
        let index = this._anchorItem.index;
        // 我们需要定位的元素 位于 [_startIndex, _endIndex], 所以接下来 把curPos定位到， _startIndex上面去
        while(index < this._startIndex) {
            curPos += this._items[index].data ? this._itemDomHeight : this._tombstoneHeight;
            index++;
        }
        while(index > this._startIndex) {
            curPos -= this._items[index - 1].data ? this._itemDomHeight : this._tombstoneHeight;
            index--;
        }
        console.log(`set current position to _startIndex: ${index} -- ${curPos}`);

        // position dom
        console.log(`position dom begins`);
        for(let i = this._startIndex; i <= this._endIndex; i++) {
            this._items[i].top = curPos;
            this._items[i].node.style.transform = `translateY(${curPos}px)`;
            curPos += this._items[index].data ? this._itemDomHeight : this._tombstoneHeight; 
        }
        console.log(`position dom ends`);

        this._sentinelTranslateY = Math.max(this._sentinelTranslateY, curPos + this._distanceAfterEndIndex); // 如果向下滚动很多后， 有向上滚动，sentinel的位置是不变的
        this._sentinel.style.transform = `translateY(${this._sentinelTranslateY}px)`;
        this._scroller.style.scrollTop = this._scrollTop;

        this.maybeRequestConent();
    },
    maybeRequestConent() {
        if(this._isRequestInProgress) return;
        let count = this._endIndex - this._loadedItemNumber ;
        if(count < 0)  return;
        // 需要请求数据
        this._isRequestInProgress = true;
        console.log(`need to fetch more date - ${count}`);
        this._store.fetch(count).then( items => {
            console.log(`fetch data ok: ${items.length}`);
            this.addItems(items);
        })

    },
    addItem() {
        // 填充一个空的占位元素
        if(this._items.length > 3000) {
            debugger;
        }
        this._items.push({
            node: null,
            top: 0,
            data: null,
            height: 0,
        });
    },
    addItems(items){
        // 数据到达，填充数据
        this._isRequestInProgress = false;
        let i = 0;
        while(this._loadedItemNumber < this._items.length) {
            if(this._items.length <= this._loadedItemNumber) this.addItem();
            this._items[this._loadedItemNumber++].data = items[i++]; 
        }
        console.log(`add fetched data to _items ok`);
        this.attachContent();
    }
}