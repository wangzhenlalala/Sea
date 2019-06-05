var sun = new Image();
var earth = new Image();
var moon = new Image();
var sunPro = new Promise(function(resolve, reject){
    sun.onload = function(){
        // requestAnimationFrame(draw);
        resolve();
    }
});
var earthPro = new Promise(function(resolve, reject){
    earth.onload = function(){
        // requestAnimationFrame(draw);
        resolve();
    }
})
var moonPro = new Promise(function(resolve, reject){
    moon.onload = function(){
        // requestAnimationFrame(draw);
        resolve();
    }
})

Promise.all([sunPro, earthPro, moonPro]).then(function(){
    window.requestAnimationFrame(draw);
})

var Global = {
    width: 300,
    height: 300
}

function init(){
    sun.src = "https://mdn.mozillademos.org/files/1456/Canvas_sun.png";
    earth.src = "https://mdn.mozillademos.org/files/1443/Canvas_moon.png";
    moon.src = "https://mdn.mozillademos.org/files/1429/Canvas_earth.png";
}

var earthRotate = 0;
var moonRoatte = 0;
function draw(){
    var canvas = document.getElementById("canvas");
    canvas.height = Global.height;
    canvas.width = Global.width;
    var ctx = canvas.getContext('2d');

    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    //清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //画太阳
    ctx.drawImage(sun,0,0, canvas.width, canvas.height);
   
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2); //以太阳为中心的坐标系

    //画地球轨道
    ctx.save();
    ctx.strokeStyle = "rgba(0, 0, 255, 0.6)";
    ctx.arc(0,0,canvas.width * 0.5 * 0.7, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.restore();

    //画地球
    ctx.rotate(earthRotate * Math.PI / 180);
    ctx.translate(canvas.width * 0.5 * 0.7, 0);
    ctx.drawImage(earth, -10, -10, 20, 20);

    //背对太阳的地球阴影面
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0, 0.2)";
    ctx.fillRect(0, -10, 10, 20);
    ctx.restore();

    //月球轨道
    ctx.save();
    ctx.strokeStyle = "rgba(255,0,255, 0.3)";
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI*2);
    ctx.stroke();
    ctx.restore();

    //画月亮
    ctx.save();
    ctx.rotate(moonRoatte*Math.PI / 180);
    ctx.translate(20, 0);
    
    ctx.drawImage(moon, -5, -5, 10, 10);
    moonRoatte += 0.4;
    ctx.restore();

    ctx.restore();
    earthRotate += 0.3;
    ctx.restore();

    window.requestAnimationFrame(draw);
}

init();