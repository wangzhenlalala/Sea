// DOM event || other event
// how to create and dispatch DOM events. Such events are commonly called synthetic events, as opposed to the events fired by the browser itself.
/* dom事件的传播: 
    1. capture vs bubble 由事件的生成这决定
    2. event.stopPropagation() and event.stopImmediatePropagation() 由事件的处理函数决定

    事件的默认处理：default
        1. new Event(xxx, {bubbles: true, cancelable: false}) 由事件的生成者决定   不能取消默认的处理
        2. event.preventDefault() 由事件的处理函数决定是否取消默认的处理
*/ 

let targetDiv = document.querySelector('.target');
let rootDiv = document.querySelector('.root');
let trigger1Btn = document.querySelector('.trigger1');
let container = document.querySelector('.container');
let scroller = document.querySelector('.scroller');

function onHello(e) {
    console.log('event: hello -', e.currentTarget.className, e.detail);
}

function onTargetHello(e) {
    console.log('event: hello - in target - ', e.currentTarget.className, e.detail);
}

function onClickTarget(e) {
    console.log('event: click - in target - ', e.currentTarget.className);
    e.target.style.top = e.clientY + 'px';
    e.target.style.left = e.clientX + 'px';
}

function onContainerWheel(e) {
    console.log('event: wheel - ', e);
}

function onTrigger1(e) {
    // 自定义的事件
    let customEvent = new CustomEvent("hello", {
        bubbles: false,
        detail: {msg: "i am alien"}
    });

    // 浏览器的事件
    let clickEvent = new MouseEvent('click', {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
        altKey: true
    });

    // 派发事件给 实现EventTarget接口的对象
    targetDiv.dispatchEvent(customEvent);
    targetDiv.dispatchEvent(clickEvent);
}

addListener(targetDiv, 'hello', onHello);
addListener(targetDiv, 'hello', onTargetHello);
addListener(rootDiv, 'hello', onHello)
addListener(targetDiv, 'click', onClickTarget);
addListener(container, 'wheel', onContainerWheel);

addListener(trigger1Btn, 'click', onTrigger1);




