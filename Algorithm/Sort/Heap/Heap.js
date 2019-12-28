// 默认的array 是 Integer || Double
// 升序排列
class Heap {
    constructor(list) {
        this.list = list.slice(0);
        this._heapify(this.list);
    }
    _heapify() {
        for(let i = 0; i < this.list.length; i++) {
            this._swim(i);
        }
    }

    _swim(i) {
        while( i > 0 ) { // 只要大于0，就有父节点
            let pIndex = Math.floor( (i - 1) / 2);
            if(this._compare(i, pIndex) >= 0) break;
            this._swap(i, pIndex);
            i = pIndex;
        }
    }
    _sink(i) {
        while(i < this.list.length) {
            let left = i * 2 + 1;
            let right = left + 1;
            let min = i;
            if(left < this.list.length && this._compare(left, min) < 0 ) min = left;
            if(right < this.list.length && this._compare(right, min) < 0) min = right;
            if(min == i) break;
            this._swap(i, min);
            i = min;
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
        return this.list[0];
    }

    delMin() {
        if(this.size() <= 0) return null;
        // 这样做 list[0], 永远都有值
        // let head = this.list[0];
        // this.list[0] = this.list.pop();
        // this._sink(0);

        // 要先交换值，然后，再减少数据的长度
        // 如果先减少再赋值，那么数组总会有一个元素，最后一个元素
        let head = this.list[0];
        let lastIndex = this.list.length - 1;
        this._swap(0, lastIndex); 
        this.list.pop();
        this._sink(0);
        return head;
    }
    size() {
        return this.list.length;
    }
}
