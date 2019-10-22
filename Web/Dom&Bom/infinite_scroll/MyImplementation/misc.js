/**
	1. 所有的元素都是absoulte定位，容器的滚动条是如何做到比例变化的？？？
**/
let container = document.querySelector('.container');
let scroller = document.querySelector('.scroller');
let store = new Store();
let anchoredItem = {
    id: -1,
    offset: 0
}

function initApp(){
	appendItems(scroller, store.generateData(60, 90));
	bindEvent();
}

function bindEvent() {
	container.addEventListener('scroll', function(e) {
		// 收到scroll事件的时候，滚动已经发生了？？？
		// layout， paint已经完成了吗？？
		// 还是我们只是收到一个事件，并且可以获得页面的将到达的一个状态？？
		// e.preventDefault(); // 并不能阻止滚动的发生，因为滚动已经发生了， keyUP, keyDown, mouseWhell事件，会触发scroll事件，应该在那里阻止scroll事件的
		console.log(container.scrollTop);
	})

	container.addEventListener('keydown', function(e) {
		// e.preventDefault(); // 阻止scroll事件的发生
	});

	container.addEventListener('mousewheel', function(e) {
		// e.preventDefault(); // 阻止scroll事件的发生
	})
}

function appendItems(parent, dataList) {
	let offDoc = document.createDocumentFragment();
	for(let i=0; i < dataList.length; i++) {
		offDoc.appendChild( renderItem(dataList[i]) );
	}
	parent.appendChild(offDoc);
}

// 根据数据生成一个dom
function renderItem(item) {
	let domItem = document.createElement('div');
	domItem.classList.add('item');
	domItem.setAttribute('data-id', item.id);
	domItem.style.height = item.height + 'px';
	domItem.style.width = "100%";
    domItem.style.background = item.bgColor;
	return domItem;
}
// start
initApp();


// 在touchmove中调用preventDefault()
// Ignored attempt to cancel a touchstart/touchmove event with cancelable=false, for example because scrolling is in progress and cannot be interrupted