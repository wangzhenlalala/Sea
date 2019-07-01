 // ...your code...
function offsetEle(ele){
    if(!ele) return;
    let left = 0;
    let top = 0;
    let width = ele.offsetWidth;
    let height = ele.offsetHeight; 
    while(ele){
        left += ele.offsetLeft;
        top += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return {
        left: left,
        top: top,
        width: width,
        height: height 
    }
}
function tooltip(e){
    let tooltipEle = document.createElement('div');
    let offset = offsetEle(e); 
    tooltipEle.style = `
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(${offset.left}px, ${offset.top - offset.height}px);
        background: lime;
    `  
    tooltipEle.innerText = "hello tooltip";
    document.body.appendChild(tooltipEle);
    console.log(e.tagName, offset);
}
function over(e){
    if(e.target){
        tooltip(e.target);
    }
}

function out(e){
  
}
var tooltipEles = document.querySelectorAll("[data-tooltip]");
tooltipEles.forEach(function(ele){
  ele.addEventListener('click', over);
  ele.addEventListener('mouseout', out);
})