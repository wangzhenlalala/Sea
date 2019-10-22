/**
 * 这是一个简化的版本，我做出以下的假设
 *  1. 每个item元素都是 等高的； 且高度实现都已知
 *  2. tombstone元素的高度也是已知的
 *  3. 替换tomestone的时候，没有过度动画
*/

let scroller = document.querySelector('.scroller');
let store = new Store();
let config = {
    itemHeight: 150,
    tombstoneHeight: 150
}
let iscroller = new InfiniteScroll(store, scroller, config);

