let panoramaDom = new Image();
let panoramaPromise = new Promise(function(resolve, reject){
    panoramaDom.onload = function(){
        resolve();
    }
});

Promise.all([panoramaPromise]).then(function(){
    requestAnimationFrame(draw);
});

function init(){
    panoramaDom.src = "https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg"
}

let canvasWidth = 500;
let canvasHeight = 300;
//图片上的视图 位置
let viewPointer = 0;
let speed = 1;
function draw(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height= canvasHeight;

    let imgW = panoramaDom.width;
    let imgH = panoramaDom.height;
    var start = 0;
    if(viewPointer - canvasWidth  >= 0){
        //只需要一次渲染
        start = imgW - viewPointer;
        ctx.drawImage(panoramaDom, start, 0);
    }else{
        //需要两次渲染
        start = imgW - viewPointer;
        ctx.drawImage(panoramaDom, start, 0);
        ctx.drawImage(panoramaDom, 0, 0);
    }
    
    // viewPointer+=speed;

    viewPointer = (viewPointer + speed) % imgW;
    requestAnimationFrame(draw);
}

init();