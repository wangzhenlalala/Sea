var ele1 = document.querySelector('.one');
var ele2 = document.querySelector('.two');

function getElementTop(ele){
    //offsetTop is the distance between element's outter border edge and its closest positioned parent's outter border edge
    var top = 0;
    while(ele != null){
        top += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return top;
};
var one = document.querySelector('.one');
var two = document.querySelector('.two');