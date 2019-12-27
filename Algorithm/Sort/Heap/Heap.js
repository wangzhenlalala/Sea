// 默认的array 是 Integer || Double
// 升序排列
class Heap {
    constructor(list) {
        this.list = list.slice(0);
        this.list.unshift(null);
        this._heapify(this.list);
    }
    _heapify() {
        for(let i = 1; i < this.list.length; i++) {
            this._swim(i);
        }
    }

    _swim(i) {
        while( i > 1 ) { // 只要大于1，就有父节点
            let pIndex = Math.floor( i / 2);
            if(this._compare(i, pIndex) >= 0) break;
            this._swap(i, pIndex);
            i = pIndex;
        }
    }
    _sink(i) {
        while(i < this.list.length - 1) {
            let left = i * 2;
            let right = left + 1;
            let min = i;
            if(left <= this.list.length && this._compare(left, min) < 0 ) min = left;
            if(right <= this.list.length && this._compare(right, min) < 0) min = right;
            if(min == i) break;
            this._swap(i, min);
        }
    }

    _swap(i, j) {
        let tmp = this.list[i];
        this.list[i] = this.list[j];
        this.list[j] = tmp;
    }
    _compare(i, j) {
        return this.list[i] - this.list[j];
    }

    getMin() {
        return this.list[1];
    }

    delMin() {
        if(this.list.length == 1) return null;
        let dels = this.list.splice(1, 1);
        return dels[0];
    }
    size() {
        return this.list.length - 1;
    }
}

class HeapSort {

}