
let divEle = document.querySelector('.div1');
let paraEles = document.querySelectorAll('.p_p');
function onClickDocument(e){
    for (var p = 0; p < paraEles.length; p++) { 
        var para = paraEles[p]; 
        /*
        第一次读取的时候，divEle's style is invalidated
        第二次读取的时候，就 Recalculate Style -> Layout，并且layout root是 #document
        */
        var width = divEle.offsetWidth; 
        para.style.left = width + 'px'; 
    }
}

document.addEventListener('click', onClickDocument);