/**
    如何用js控制 dom元素的 transition 动画

    * 要求 wrapper 是relative
    *      scroller： 如果不支持transform， relative || absolute (使用top,left)
    *                 支持transform 随便
    * 
    * 
    transitionProperty
    transitionDuration // 单独的改变duration, 没有加快/减慢剩余的动画速度
    startValue
    endValue // 如果在transitiion的过程中，endValue的值改变了，浏览器会根据新的 currentValue -> endValue, duration, timing-func，进行新的动画
    
 */
let startBtn = document.querySelector('.transitionWrapper .start');
let stopBtn = document.querySelector('.transitionWrapper .stop');
let transitionBox = document.querySelector('.transitionBox');
let transitionWrapper = document.querySelector('.transitionWrapper');

function onToStartTransition(e) {
    // transition: width 2s, height 2s, background-color 2s, transform 2s;
    transitionBox.style.transitionProperty = 'transform height';
    transitionBox.style.transitionDuration = '8s';
    transitionBox.style.transform = 'translateX(500px)';
    transitionBox.style.height = '200px';
}

function onToStopTransition(e) {
    // transitionBox.style.transitionProperty = "";
    // 如果设置为none， 则正在动画的属性，会立刻变成最终的值 ！！！
    // 所以如果这不是我们想要的，而是要让他停留在当时的状态，我们需要自己去获取当时的状态并设置他
    // 这时， transitionEnd事件是不会触发的

    // let boxRect = getRect(transitionBox);
    // let wrapperRect = getRect(transitionWrapper);
    // let x = boxRect.left - wrapperRect.left;

    // transitionBox.style.transitionDuration = '0s'; 
    // transitionBox.style.transform = `translateX(${x}px)`; // 浏览器会立即跳到 新的 end value
    // transitionBox.style.height = '50px';    

    console.log('current x,y - ', myS)
}

function onTransitionEnd(){
    // 有几个属性被transition，就会有几个 transitiionEnd
    console.log('transition end');
}

addListener(startBtn, 'click', onToStartTransition);
addListener(stopBtn, 'click', onToStopTransition);
addListener(transitionBox, 'transitionend', onTransitionEnd);