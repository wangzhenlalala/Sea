let wrapper = document.querySelector('.wrapper');
let scroller = document.querySelector('.scroller');
let TScroll = null;

function initScroll() {
    // TScroll = new TinyScroll(wrapper);
    let myScroll = true;
    if(myScroll) {
        TScroll = new TinyScroll(wrapper);
    } else {
        TScroll = new IScroll(wrapper, {
            bounce: true,
            momentum: false,
            // deceleration: 0.01 // 0.0006
        });
    }
}

function addScrollItem() {
    let doc = document.createDocumentFragment();
    let tmpLi = null;
    let scrollItemCount = 300;
    for(let i=0; i < scrollItemCount; i++) {
        tmpLi = document.createElement("li");
        tmpLi.classList.add('scroller-item');
        tmpLi.textContent= i;
        doc.appendChild(tmpLi);
    }
    scroller.appendChild(doc);
}

document.addEventListener('DOMContentLoaded', function(e) {
    addScrollItem();
    window.requestAnimationFrame( () => {
        setTimeout(() => {
            initScroll();
        }, 0);
    })
})