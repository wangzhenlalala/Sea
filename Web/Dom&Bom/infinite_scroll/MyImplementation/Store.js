function Store() {
    
}
Store._id = 0;
Store.prototype.generateData = function() {
    return {
        id: Store._id++,
    }
}

// 每次异步获取count条数据
// 放回 长度为count 的 [item] 数组
Store.prototype.fetch = function(count) {
    let requestDelay = 1000; // ms
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            let items = [];
            while(count--) {
                items.push(this.generateData());
            }
           resolve(items); 
        }, requestDelay);
    })
}

// 每次返回一个tombstone的dom结构 
Store.prototype.createTombstone = function() {
    let div = document.createElement('div');
    div.classList.add('tombstone');
    return div;
}

// 根据item渲染出一个数据DOM, 
// dom 是复用的之前的数据DOM， 可能不存在
Store.prototype.render = function(item, dom) {
    dom = dom || document.createElement('div');
    dom.classList.add('item');
    dom.innerText = item.id;
    return dom;
}