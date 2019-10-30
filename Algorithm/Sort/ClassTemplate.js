class SortClass {
	static Sort(list) { // 大写的sort
		
	}
	static sort() { // 消息的sort
		
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
			if(!SortClass.lessEq(list[i], list[i+1])) return false;
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
		SortClass.Sort(list);
		console.log('after sort', list);
		console.log(`isSorted: ${QuickSort.isSorted(list)}`);
	}
}


/****************************** run test */
SortClass.main();