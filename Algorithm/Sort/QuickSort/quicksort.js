class QuickSort {
	static Sort(list) { // 大写的sort
		QuickSort.sort(list, 0, list.length - 1);
	}
	static sort(list, startIndex, endIndex) { // 消息的sort
		if(startIndex >= endIndex) return;
		let pivotIndex = QuickSort.partition(list, startIndex, endIndex);
		QuickSort.sort(list, startIndex, pivotIndex - 1);
		QuickSort.sort(list, pivotIndex + 1, endIndex);
	}
	// Array[a] => int => int => int
	static partition(list, startIndex, endIndex) {
		/* 将【start - end]范围内的元素，分成三部分 
		union ( 
			[x <- list | x <= pivot], 
			[pivot], 
			[x <- list | x >= pivot]
		) where pivot = list[startIndex];
		*/ 
		if(startIndex >= endIndex) return startIndex; // 要返回一个pivot 的index， 但是这里我们直接返回了，是undedined
		let i = startIndex; // x <= i ==> list[x] <= pivot
		let j = endIndex + 1; // x >= j && exist(list[x]) ==> list[x] > pivot;
		while( true ) {
			while( QuickSort.lessEq(list[++i], list[startIndex]) ) { // 小于等于
				if(i == endIndex) break; // i不会越过j, 但是要确保i在本次partition的index范围内
			}
			while( QuickSort.lessEq(list[startIndex], list[--j]) ) { // 大于等于
                // if(j == startIndex) break; // 停下的位置，是 <= 切分元素的； 如果越过了i,那么j，一定实在所有 <= 切分元素 的子数组的最右边，
                break;
            }
            // 如果两个指针没有相遇，就交换对应的元素
            // 如果相遇就说明本次的partition已经完成了
			if(i < j) { // important
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
		return itemA <= itemB;
	}

	static less(itemA, itemB) {
		return itemA < itemB;
	}

	static swap(list, i, j) {
		let temp = list[j];
		list[j] = list[i];
		list[i] = temp;
	}

	static isSorted(list){
		for(let i = 0; i < list.length - 1; i++) {
			if(!QuickSort.lessEq(list[i], list[i+1])) return false;
		}
		return true;
	}

	static main() {
		// for test
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