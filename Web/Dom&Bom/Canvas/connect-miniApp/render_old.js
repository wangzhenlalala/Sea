/**
 * 
 * @param {Array[Number]} path: 需要 
 */
function Render(canvasId){
    this.canvasId = canvasId;
    this.canvas = null;
    this.ctx = null;
    this.squareWidth = 50;
    this.squareGap = 10; //方格之间的间隙
    this.tableOffsetX = 200;
    this.tableOffsetY = 200;
}


var __RenderPrototype__ = {};

Render.prototype = __RenderPrototype__;
Render.prototype.constructor = Render;


__RenderPrototype__.init = function(){
    this.canvas = document.getElementById(this.canvasId);
    this.canvas.height = window.innerHeight * 0.7;
    this.canvas.width = window.innerWidth;
    this.ctx = this.canvas.getContext('2d');
    var that = this;
    this.canvas.addEventListener('contextmenu', function(e){
        e.preventDefault();
        console.log('hello canvas right click');
        let event = {
            x: e.clientX,
            y: e.clientY,
            alt: e.altKey,
            ctrl: e.ctrlKey,
            button: e.button // 0: left 1: middle 2: right
        }
        that.resolvePos(event.x, event.y);

        // that.ctx.save();
        // that.ctx.strokeRect(event.x-20, event.y-20, 40, 40);
        // that.ctx.restore();
        
        return false; //不冒泡
    })
    this.canvas.addEventListener('click', function(e){
        console.log('hello canvas click');
        let event = {
            x: e.clientX,
            y: e.clientY,
            alt: e.altKey,
            ctrl: e.ctrlKey,
            button: e.button // 0: left 1: middle 2: right
        }
        that.resolvePos(event.x, event.y);

        // that.ctx.save();
        // that.ctx.beginPath();
        // that.ctx.arc(event.x, event.y, 20, 0, Math.PI*2, true);
        // that.ctx.stroke();
        // that.ctx.restore();
       
    });
}

//Connect对象
__RenderPrototype__.renderTable = function(connect){
    var lines = connect.LINES;
    var cols = connect.COLS;
    let step = this.squareWidth + this.squareGap
    ctx = this.ctx;
 
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //canvas描边
    ctx.save()
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();

    ctx.save(); //平移表格
    ctx.translate(this.tableOffsetX, this.tableOffsetY);
    /*** 渲染方格*/
    for(let line=0; line<lines; line++){
        for(let col=0; col<cols; col++){
            ctx.save();
            ctx.translate( col*step, line*step);
            ctx.strokeRect(0, 0, this.squareWidth, this.squareWidth);
            ctx.restore();
        }
    }
    /*** */
    ctx.restore(); //平移表格结束
};

__RenderPrototype__.renderPath = function(){

};
//x -> y -> a
//由鼠标的x,y坐标，来判断是否处在一个方格内，并且返回该方格的 序号 [0 ,lines*cols)左闭右开的区间
__RenderPrototype__.resolvePos = function(x,y){
    var dx = x - this.tableOffsetX;
    var dy = y - this.tableOffsetY;
    var col = Math.floor( dx / ( this.squareWidth+this.squareGap) );
    var line = Math.floor( dy / ( this.squareWidth+this.squareGap) );
    if(col < 0 || col >= this.cols)
    var offsetX = col*( this.squareWidth+this.squareGap);
    var offsetY = line*( this.squareWidth+this.squareGap);
    if( 
        dx >= offsetX                     && 
        dx <= offsetX  + this.squareWidth && 
        dy >= offsetY                     && 
        dy <= offsetY  + this.squareWidth 
    ){
        return {
            col: col,
            line: line
        }
    }
    return undefined;
}