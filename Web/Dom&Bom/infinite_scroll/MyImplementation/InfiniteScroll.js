/**
 * 
 * scroll是要滚动元素的元素 
 */
function InfiniteScroll(store, scroll) {
    this._store = store;
    this._items = [];
    this._scrollTop = 0;

    // insert sentinel
    let sentinel = document.createElement('div');
    sentinel.style.cssText = `
        position: absolute;
        transform: translate(0, 1400px);
        width: 1px;
        height: 1px;
        opacity: 0;
    `;
    scroll.appendChild(sentinel);
    this._sentinel = sentinel;
}

InfiniteScroll.prototype = {

}