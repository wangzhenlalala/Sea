class QuickSort {
	static Sort(list) {
		QuickSort.xx(list, 0, list.length - 1);
	}
	static xx(list, startIndex, endIndex) {
		if(startIndex >= endIndex) return;
		let pivotIndex = QuickSort.sort_(list, startIndex, endIndex);
		QuickSort.xx(list, startIndex, pivotIndex - 1);
		QuickSort.xx(list, pivotIndex + 1, endIndex);
	}
	// Array[a] => int => int => int
	static sort_(list, startIndex, endIndex) {
		/* 将【start - end]范围内的元素，分成三部分 
		union ( 
			[x <- list | x <= pivot], 
			[pivot], 
			[x <- list | x > pivot] 
		) where pivot = list[startIndex];
		*/ 
		if(startIndex >= endIndex) return startIndex; // 要返回一个pivot 的index， 但是这里我们直接返回了，是undedined
		let i = startIndex; // x <= i ==> list[x] <= pivot
		let j = endIndex + 1; // x >= j && exist(list[x]) ==> list[x] > pivot;
		while( i < j ) {
			while( QuickSort.lessEq(list[++i], list[startIndex]) ) {
				if(i >= j) break;
			}
			while(!QuickSort.lessEq(list[--j], list[startIndex])) {
				if(j < i) break;
			}
			if(i < j) {
				QuickSort.swap(list, i, j);
			}
			else {
				break;
			}
		}
		QuickSort.swap(list, startIndex, j);
		console.log(`start - end ==> pivot: ${startIndex} - ${endIndex} ==> ${j}`);
		return j;
	}
	static lessEq(itemA, itemB) {
		return itemA - itemB <= 0
	}
	static less(itemA, itemB) {
		return itemA - itemB;
	}
	static swap(list, i, j) {
		let temp = list[j];
		list[j] = list[i];
		list[i] = temp;
	}
	static isSorted(list){
		for(let i=0; i<list.length-1; i++) {
			if(!QuickSort.lessEq(list[i], list[i+1])) return false;
		}
		return true;
	}
	static main() {
		// for tes
		let list = [];
		for(let i=0; i<20; i++) {
			list.push(chance.integer({min: 1, max: 9999}));
		}
		console.log('before sort', list);
		QuickSort.Sort(list);
		console.log('after sort', list);
		console.log(`isSorted: ${QuickSort.isSorted(list)}`);
	}
}

QuickSort.main();