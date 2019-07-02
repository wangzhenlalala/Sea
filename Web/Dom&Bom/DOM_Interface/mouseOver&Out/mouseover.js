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

/*
    如果这样设计Tooltip的话，每次为一个element添加tooltip都要保留一个Tooltip的实例的引用，
    以便在以后对该tooltip进行hide, dispose
    但是
        1. show和hide/dispose的地方可能不是在一个地方，可能在两个不同的函数里面；因此 Tooltip的实力就要成为一个全局的变量
        2. 如果在不需要tooltip的时候，如果不释放Tooltip实例的引用，会memory leak
    当是每个tooltip都必须保留自己的状态，
        如过把这些状态放在 element里面，把tooltip做成是一个函数，接受一个element参数，那么就不需要有Tooltip的实例了。
        tooltip函数就是一个纯函数。。。
*/
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