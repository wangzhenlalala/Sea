function getRandomInt(from, to) {
		return Math.round( from + Math.random() * (to - from) );
}

function Store() {
	this._id = 0;
}

Store.prototype.getItemHeight = function() {
	return getRandomInt(100, 200);
}

Store.prototype.getBgColor = function() {
	return `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`;
}

Store.prototype.generateData = function(lower, higher) {
	let number = 0;
	if(lower === undefined)
		number = 30;
	else if(higher === undefined) 
		number = lower;
	else
		number = getRandomInt(lower, higher);
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