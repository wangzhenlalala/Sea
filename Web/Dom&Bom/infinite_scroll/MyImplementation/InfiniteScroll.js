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
        transform: translate(0, 0);
        width: 0;
        height: 0;
        opacity: 0;
    `;
    scroll.appendChild(sentinel);
    this._sentinel = sentinel;
}

InfiniteScroll.prototype = {

}