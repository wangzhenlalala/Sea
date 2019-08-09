function addElements(){
    let _num = 20;
    let number = _num;
    let domFragment = document.createDocumentFragment();
    while(number--){
        let divEle = document.createElement('div');
        divEle.classList.add('classA');
        divEle.classList.add('classB');
        divEle.style.position = 'relative';
        divEle.style.left = (_num - number) * 10 + 'px';
        divEle.style.background = `rgb(${number * 12}, ${(255-number*12)}, ${number*3})`;
        domFragment.appendChild(divEle);
    }
    document.body.appendChild(domFragment);
}


addElements();


document.addEventListener("click", function(){
    // window.requestAnimationFrame(function(){
    //     let divEles = document.querySelectorAll('.classA');
    //     console.timeStamp('before get style');
    //     divEles.forEach(function(ele){
    //         // console.log( getPropFromStyle('width', ele) );
            
    //         console.log( getPropFromComputedStyle('width', ele) );
    //     })
    //     console.timeStamp('after get style');
    // })

    let divEles = document.querySelectorAll('.classA');
    console.timeStamp('before get style');
    divEles.forEach(function(ele){
        // console.log( getPropFromStyle('width', ele) );
        
        console.log( getPropFromComputedStyle('width', ele) );
        // console.log( ele.offsetWidth)
        console.log( ele.offsetLeft)
    })
    console.timeStamp('after get style');
});

function getPropFromStyle(prop, ele){
    return ele.style[prop];
};

function setPropToStyle(prop, value, ele){
    return ele.style[prop] =  value;
}
function getPropFromComputedStyle(prop, ele){
    return window.getComputedStyle(ele)[prop];
}


function getScrollbarWidth() {
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    document.body.appendChild(scrollDiv);
    var rect = scrollDiv.getBoundingClientRect();
    var scrollbarWidth = rect.width - scrollDiv.clientWidth;
    console.log(rect);
    console.log(rect.width, scrollDiv.clientWidth);
    document.body.removeChild(scrollDiv);
   
    return scrollbarWidth;
}