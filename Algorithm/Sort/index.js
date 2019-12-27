// QuickSort.main();
// QuickSort.main();


// 测试三路切分排序
// QuickSort3Way.main();

let testList = [2, 5, 9, 6, 1, 3];
let heap = new Heap(testList);

while(heap.size()) {
    console.log(heap.delMin());
}