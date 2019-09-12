/**
	1. 所有的元素都是absoulte定位，容器的滚动条是如何做到比例变化的？？？
**/

let container_1 = document.querySelector('.container_1');
container_1.addEventListener('scroll', function(e) {
	// 收到scroll事件的时候，滚动已经发生了？？？
	// layout， paint已经完成了吗？？
	// 还是我们只是收到一个事件，并且可以获得页面的将到达的一个状态？？
	// e.preventDefault(); // 并不能阻止滚动的发生，因为滚动已经发生了， keyUP, keyDown, mouseWhell事件，会触发scroll事件，应该在那里阻止scroll事件的
	console.log(e);
})

container_1.addEventListener('keydown', function(e) {
	// e.preventDefault(); // 阻止scroll事件的发生
});

container_1.addEventListener('mousewheel', function(e) {
	// e.preventDefault(); // 阻止scroll事件的发生
})

/**
let scrollEventObject = {
	bubbles: false,
	cancelBubble: false,
	cancelable: false,
	composed: false,
	currentTarget: null,
	defaultPrevented: false,
	eventPhase: 0,
	isTrusted: true,
	path:  [div.container_common.container_1, div.container, body, html, document, Window],
	returnValue: true,
	srcElement: div.container_common.container_1,
	target: div.container_common.container_1,
	timeStamp: 17404.89499999967,
	type: "scroll",
}
**/