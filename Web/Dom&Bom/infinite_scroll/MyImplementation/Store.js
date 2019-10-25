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
Store.prototype.getRandomInt = function (from, to) {
    return Math.round( from + Math.random() * (to - from) );
}

Store.prototype.getItemHeight = function(lower, higher) {
    let height = 0;
	if(lower === undefined)
		// 没有传递参数，默认100px
		height = 100;
	else if(higher === undefined)
		// 传递一个 
		height = lower;
	else
		// 传递二个
		height = this.getRandomInt(lower, higher);
	return height;
}

Store.prototype.getBgColor = function() {
	return `rgb(${this.getRandomInt(0, 255)}, ${this.getRandomInt(0, 255)}, ${this.getRandomInt(0, 255)})`;
}

Store.prototype.produceData = function(lower, higher) {
	let number = 0;
	if(lower === undefined)
		// 没有传递参数，默认30个
		number = 30;
	else if(higher === undefined)
		// 传递一个 
		number = lower;
	else
		// 传递二个
		number = this.getRandomInt(lower, higher);
	let list = [];
	for(; number > 0; number--) {
		list.push({
			id: this._id++,
			height: this.getItemHeight(),
			bgColor: this.getBgColor()
		})
	}
	return list;
}

