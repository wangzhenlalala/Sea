//////////////////////// about 小红点
var dotSize = 20;
var currentEasingType = "";
var currentEasingItem = "";
var dotter = document.querySelector('.dotter');
var dotTween  =  new TWEEN.Tween({left: 0, top: 0})
    .duration(200)
    .easing(TWEEN.Easing.Circular.Out)
    .onUpdate(function(pos){
        setDotterPos({left: pos.left, top: pos.top});
    })
    .start()

function onClickOnDocument(e){
   var cx = e.clientX;
   var cy = e.clientY;
   dotTween.to({left: cx, top: cy}).start();
}

function setTweenEasing(type, name){
    dotTween.easing(TWEEN.Tween.easing()) 
}
function setDotterPos(pos){
    dotter.style.transform = `
        translate(${pos.left - dotSize/2}px, ${pos.top - dotSize/2}px) 
    `
}
//渲染左边的easing name： Quartic, Cubic, Elastic ...
function renderControls(){
    var container = document.querySelector('.controls .easing-type');
    var easingTypes = Object.keys(TWEEN.Easing);
    var containerTemp = document.createElement('ul');
    easingTypes.forEach(function(easing){
        var li = document.createElement('li');
        li.setAttribute('data-type', easing);
        li.innerText = easing;
        containerTemp.appendChild(li);
    });
    container.innerHTML = containerTemp.innerHTML;
}



//渲染右边的easing item： In, Out, InOut， None[for Linear]
function renderEasingItem(type){
    var container = document.querySelector('.controls .easing-item');
    var easingItems = Object.keys(TWEEN.Easing[type]);
    var containerTemp = document.createElement('ul');
    easingItems.forEach(function(item){
        var li = document.createElement('li');
        li.setAttribute('data-item', item);
        li.innerText = item;
        containerTemp.appendChild(li);
    });
    container.innerHTML = containerTemp.innerHTML; 
}

//为左侧和右侧的li注册事件监听
function bindControlsEvent(){
    var container = document.querySelector('.controls .easing-type'); 
    var containerItem = document.querySelector('.controls .easing-item'); 
    container.addEventListener('click', function(e){
        e.stopPropagation();
        let type = e.target.dataset.type; //##如果不存在返回undefined
        if(!type) return;
        setSelectedType(type);

        renderEasingItem(type); //渲染新的右边的列表
        setSelectedItem(currentEasingItem)

        setCurrentEasingFunc(); //更新easing 
    });

    containerItem.addEventListener('click', function(e){
        e.stopPropagation();
        let item = e.target.dataset.item; //##如果不存在返回undefined
        if(!item) return;
        setSelectedItem(item);

        setCurrentEasingFunc(); //更新easing 
    });
}

//设置type的选中状态
//只在初始化的时候渲染一次
function setSelectedType(type){
    let previousSelected = document.querySelector(`[data-type='${currentEasingType}']`);
    let currentSelected = document.querySelector(`[data-type='${type}']`);
    if(previousSelected){
        previousSelected.classList.remove('selected-type');
    }
    currentEasingType = type; 
    currentSelected.classList.add('selected-type');

}

//设置item的选中状态
//每次改变type，都会重新渲染一次该列表
//上一次选中的，在本次中可能不存在
function setSelectedItem(item){
    let previousSelected = document.querySelector(`[data-item='${currentEasingItem}']`);
    let currentSelected = document.querySelector(`[data-item='${item}']`);
    if(previousSelected){
        previousSelected.classList.remove('selected-item');
    } 
    if(currentSelected){
        //上次的依然存在
        currentEasingItem = item;
        currentSelected.classList.add('selected-item');
    }else{
        //上次的不存在
        //选择本次的第一个
        currentSelected = document.querySelector(`[data-item]:first-child`); 
        currentSelected.click();
    }
    
}

function setCurrentEasingFunc(){
    dotTween.easing(TWEEN.Easing[currentEasingType][currentEasingItem]);
}
document.addEventListener('click', onClickOnDocument);

//////////////////////// about 小红点

function animate(){
    requestAnimationFrame(animate);
    TWEEN.update(); //change every active tween TWEEN 全部大写
}

function init(){
    renderControls();
    bindControlsEvent(); 
    document.querySelector(`[data-type]:first-child`).click(); //默认选择第一个下面的第一个
    animate();
}

init();