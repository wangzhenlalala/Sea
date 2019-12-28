class HeapSort {
	Sort(list) { // 大写的sort
        this.list = list; // 原位排序，改变传进来的数组
        this.sort();
    }
    
    sort() { // 消息的sort
        // 大根堆和小根堆的区别仅仅是 _compare的区别
        this._heapify();  // 建立大根堆

        let len = this.list.length;
        while(len > 0) {
            this._swap(0, --len);
            this._sink(0, len);
        }
    }

    isInOrder(a, b) {
        // 如果a，b的顺序是你想要的，就返回true
        // 大根堆 用于升序排列
        return this.list[a] - this.list[b] > 0;

        // 小根堆 用于降序排列
        // return this.list[a] - this.list[b] < 0;
    }

    _heapify() {
        for(let i = 0; i < this.list.length; i++) {
            this._swim(i);
        }
    }

    _swim(i) {
        while( i > 0 ) { // 只要大于0，就有父节点
            let pIndex = Math.floor( (i - 1) / 2);
            if(this.isInOrder(pIndex, i)) break;
            this._swap(i, pIndex);
            i = pIndex;
        }
    }
    _sink(i, list_length) {
        while(i < list_length) {
            let left = i * 2 + 1;
            let right = left + 1;
            let tmp = i;
            if(left < list_length && this.isInOrder(left, tmp)) tmp = left;
            if(right < list_length && this.isInOrder(right, tmp)) tmp = right;
            if(tmp == i) break;
            this._swap(i, tmp);
            i = tmp;
        }
    }

	_swap(i, j) {
        let tmp = this.list[i];
        this.list[i] = this.list[j];
        this.list[j] = tmp;
    }

    static lessEq(itemA, itemB) {
		return itemA <= itemB;
	}

	static less(itemA, itemB) {
		return itemA < itemB;
    }
    
	static isSorted(list){
		for(let i = 0; i < list.length - 1; i++) {
			if(!HeapSort.lessEq(list[i], list[i+1])) return false;
		}
		return true;
	}

	static main() {
		// for test
        let list = [];
        let count = 2000000;
		for(let i = 0; i < count; i++) {
			list.push(chance.floating({min: 1, max: 99999999}));
		}
        console.log('before sort', list);
        let start = performance.now();
        let heap_sort = new HeapSort();
        heap_sort.Sort(list);
        let end = performance.now();
        console.log(`time to sort ${count}: ${end - start} ms`, );
		console.log('after sort', list);
	}
}