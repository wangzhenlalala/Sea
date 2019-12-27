// 默认的array 是 Integer || Double
// 升序排列
class Heap {
    constructor(props) {
        this.list = props.list.slice(0);
        this.list.unshift(null);
        this.heapify(this.list);
    }
    _heapify() {

    }

    _swin(i) {

    }

    _sink(i) {

    }
    getMin() {
        return this.list[1];
    }
}

class HeapSort {

}