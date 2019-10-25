/**
 * 这是一个简化的版本，我做出以下的假设
 *  1. 每个item元素都是 等高的； 且高度实现都已知
 *  2. tombstone元素的高度也是已知的
 *  3. 替换tomestone的时候，没有过度动画
*/

let scroller = document.querySelector('.scroller');
let store = new Store();
let items = [];
let viewport_height = 750;
let item_height = 150;
for(let i = 0; i < 100; i++) {
    items.push({
        id: i,
        background: store.getBgColor()
    });
};
let config = {
    render: store.render
};
let iscroller = new InfiniteScroll(scroller, config);
iscroller.refresh(viewport_height, item_height, items);

