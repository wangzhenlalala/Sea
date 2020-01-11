var myScroll;
function initIScroll() {
    myScroll = new IScroll('#wrapper');
}
document.addEventListener('DOMContentLoaded', onDomContentLoaded, false);

function onDomContentLoaded() {
    let wrapper = document.querySelector('#wrapper');
    let ul = wrapper.children[0];
    let doc = document.createDocumentFragment();
    for(let i = 0; i < 300; i++) {
        let liDom = document.createElement('li');
        liDom.textContent = i;
        doc.appendChild(liDom);
    }
    ul.appendChild(doc);

    window.requestAnimationFrame( () => {
        setTimeout(() => {
            initIScroll();
        }, 0);
    })
}