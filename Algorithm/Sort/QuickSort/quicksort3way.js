/**
 * 每次切分 确定位置的元素 不仅仅是一个， 是所有和切分元素相等的元素，对于要排序数组中有大量重复的元素，效果很好。
 */
class QuickSort3Way {
	static Sort(list) { // 大写的sort
		QuickSort3Way.sort(list, 0, list.length - 1);
	}
    static sort(list, startIndex, endIndex) { // 消息的sort
        console.log(`start - end: ${startIndex} - ${endIndex}`);
		if(startIndex >= endIndex) return;
        let lt = startIndex;
        let gt = endIndex;
        let i = lt + 1;
        let pivot = list[startIndex]; // 要预先存起来，
        while( i <= gt ) {
            let flag = QuickSort3Way.compare(list[i], pivot);
            if(flag > 0){
                // 右边子数组要增长
                QuickSort3Way.swap(list, i, gt--); // i 不能增加
            } else if (flag < 0) {
                // 左边子数组 要增长
                QuickSort3Way.swap(list, lt++, i++); // 把相等的子数组向右移动一个元素
            } else {
                // 相等的 子数组要增长
                i++;
            } 
        }
        QuickSort3Way.sort(list, startIndex, lt - 1);
        QuickSort3Way.sort(list, gt + 1, endIndex);
	}
	
	static lessEq(itemA, itemB) {
		return itemA <= itemB;
	}

	static less(itemA, itemB) {
		return itemA < itemB;
	}

    static compare(itemA, itemB) {
        let sign = itemA - itemB;
        if( sign > 0 ) {
            return 1;
        } else if( sign == 0 ) {
            return 0;
        } else {
            return -1;
        }
    }
	static swap(list, i, j) {
		let temp = list[j];
		list[j] = list[i];
		list[i] = temp;
	}

	static isSorted(list){
		for(let i = 0; i < list.length - 1; i++) {
			if(!QuickSort3Way.lessEq(list[i], list[i+1])) return false;
		}
		return true;
	}

	static main() {
		// for test
        let list = [];
        let count = 5;
		for(let i = 0; i < count; i++) {
			list.push(chance.integer({min: 1, max: 20}));
		}
		console.log('before sort', list);
		QuickSort3Way.Sort(list);
		console.log('after sort', list);
		console.log(`isSorted: ${QuickSort.isSorted(list)}`);
	}
}