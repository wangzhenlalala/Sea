
//构造函数
/**
 * 
 * @param {Number: 行数} lines 
 * @param {Number: 列数} cols 
 * @param {Number: 起始的位置} start 
 * @param {Array[Number]: 那些位置是不能走的} removed 
 */
function Connecter(lines, cols, start, removed){
	lines = lines == undefined ? 6 : lines;
	cols = cols == undefined ? 6 : cols;
	start = start == undefined ? 0 : start;
	removed = removed == undefined ? [] : removed 
	this.LINES = lines;
	this.COLS = cols;
	this.directions = ['up','right', 'down', 'left'];
	this.startPos = start;
	this.traversed = [start];
	this.removedPos = removed;
	this.EMPTY_SQUARE = this.removedPos.length;
}

//原型对象
let __ConnecterProto__ = {};
Connecter.prototype = __ConnecterProto__;
__ConnecterProto__.constructor = Connecter;


__ConnecterProto__.hasTraversed = function (pos){
	return this.traversed.some(function(item){
		return pos == item;
	});
};

__ConnecterProto__.hasRemoved = function(pos){
	return this.removedPos.some(function(item){
		return pos == item;
	})
}

__ConnecterProto__.Begin = function(){
	if(this.traversed.length == this.LINES * this.COLS - this.EMPTY_SQUARE){
		//已经遍历完毕，得到了一个路径
		return this.traversed;
	}
	//否则，继续寻找下一个路径
	let pos = this.traversed[this.traversed.length-1];
	let nextPos = -1;
	let result = null;
	let dir = null;
	for(let direction=0; direction<4; direction++){
		dir = this.directions[direction];
			
		switch(dir){
			case 'up':
				nextPos = pos - this.COLS;
				if(nextPos < 0 ) continue; 
				break; 
			case 'right':
				nextPos = pos+1;
				if(nextPos % this.COLS == 0) continue; //最后一列不能右移
				break;
			case 'down':
				nextPos = pos + this.COLS;
				if(nextPos >= this.LINES * this.COLS ) continue;
				break;
			case 'left':
				nextPos = pos - 1; 
				if( (nextPos + this.COLS) % this.COLS == this.COLS-1) continue; //第一列不能左移 // -1 % 4 == -1 !!!! 不是等于3
				break;
		}
		if(this.hasRemoved(nextPos)) continue;
		if(this.hasTraversed(nextPos)) continue;
		this.traversed.push(nextPos)
		result = this.Begin();
		if(result) return result;
		this.traversed.pop();
	}
	return undefined;
}

//设置起始点
__ConnecterProto__.setStart = function(start){
	this.startPos = start;
	this.traversed = [start]
};

//设置被移除的坐标
__ConnecterProto__.addToRemoved = function(pos){
	this.removedPos = this.removedPos.concat([pos]);
	this.EMPTY_SQUARE = this.removedPos.length;
}
__ConnecterProto__.hasRemoved = function(pos){
	return this.removedPos.some(function(item){
		return pos == item;
	});
}
__ConnecterProto__.delFromRemoved = function(pos){
	if(pos == -1){
		this.removedPos = [];
	}else{
		this.removedPos = this.removedPos.filter(function(item){
			return pos !== item;
		});
	}
	
	this.EMPTY_SQUARE = this.removedPos.length;
}
//设置行和列数
__ConnecterProto__.setLines = function(lines){
	this.LINES = lines;
	this.startPos = -1;
	this.traversed = [this.startPos];
	this.removedPos = [];
	this.EMPTY_SQUARE = this.removedPos.length;
}
//设置行和列数
__ConnecterProto__.setCols = function(cols){
	this.COLS = cols;
	this.startPos = -1;
	this.traversed = [this.startPos];
	this.removedPos = [];
	this.EMPTY_SQUARE = this.removedPos.length;
}

