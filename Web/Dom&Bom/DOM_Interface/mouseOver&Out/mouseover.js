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

function Tooltip(selector){
    this.element = document.querySelector(selector);
    this.uid = uid++;
    this.selector = selector;
    this.state = 'hide';
}

Tooltip.uid = 1;
Tooltip.template = `
    <div class="tooltip" role="tooltip">
        <div class="arrow"></div>
        <div class="tooltip-inner"></div>
    </div> 
`
Tooltip.prototype.show = function(){
    let ttEle = document.createElement('div');
    let offset = offsetEle(this.element); 
    ttEle.outerHTML = Tooltip.template;
    this.element.setAttribute('data-tooltip-id', this.uid);
    ttEle.style = `
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(${offset.left}px, ${offset.top - offset.height}px);
        background: lime;
    `  
    //set tooltip text here
    ttEle.querySelector('tooltip-inner').innerText = "Hello Tooltip";
    this.state = 'show';
    document.body.appendChild(ttEle);
    return this;  
}
Tooltip.prototype.hide = function(){
    this.state = 'hide';
    let ttEle = document.querySelector(`[data-tooltip-id="${this.uid}"]`);
    ttEle.style.display = 'none';
    return this;
}

Tooltip.prototype.dispose = function(){
    let ttEle = document.querySelector(`[data-tooltip-id="${this.uid}"]`);
    this.element.removeAttribute('data-tooltip-id');
    ttEle.remove();
    return null;
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