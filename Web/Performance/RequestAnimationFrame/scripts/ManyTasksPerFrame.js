var setTimeoutDom = document.querySelector('.setTimeout');
var rAFDom = document.querySelector('.requestAnimationFrame');
var btnsDom = document.querySelector(".btns");


const   SET_TIMEOUT = 0;
const   REQUEST_ANIMATION_FRAME = 1;

function moveElementOnePixelForword(element){
    var left = element.style.left || '0px' ;
    left = left.substring(0, left.length - 2);
    left = +left;
    if(left > 400) return false;
    element.style.left = left + 1 + 'px';
    return true;
}

function walkAroundSetTimeout(){
    var continueMove = moveElementOnePixelForword(setTimeoutDom); 
    if(!continueMove) return false;
    setTimeout(walkAroundSetTimeout, 0);
    return true;
} 

function walkAroundRAF(){
    var continueMove = moveElementOnePixelForword(rAFDom); 
    if(!continueMove) return false;
    requestAnimationFrame(walkAroundRAF);
    return true;
    
} 

function reset(){
    setTimeoutDom.style.left = '0px';
    rAFDom.style.left = '0px'
}

btnsDom.addEventListener("click", function(e){
    var type = e.target.dataset.type;
    switch(type){
        case 'setTimeout':
            walkAroundSetTimeout();
            break;
        case 'requestAnimationFrame':
            walkAroundRAF();
            break;
        case 'both':
            walkAroundSetTimeout(); 
            walkAroundRAF();
        case 'reset':
            reset();
            break;
    }
})
