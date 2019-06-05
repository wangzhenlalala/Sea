
let resizeCanvas = function(canvas){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.75;
  draw(canvas.getContext('2d'));
}
function init(){
    canvas = document.getElementById('canvas'); //global canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.75;
    window.onresize = resizeCanvas.bind(null,canvas);
    draw(canvas.getContext('2d'));
}
