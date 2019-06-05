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
    this.tableOffsetX = 100;
    this.tableOffsetY = 100;
}

var __RenderPrototype__ = {};

Render.prototype = __RenderPrototype__;
Render.prototype.constructor = Render;


__RenderPrototype__.init = function(){
    this.canvas = document.getElementById(this.canvasId);
    this.canvas.height = window.innerHeight * 0.7;
    this.canvas.width = window.innerWidth;
    this.ctx = this.canvas.getContext('2d');    
}

//Connect对象
__RenderPrototype__.renderTable = function(cols,lines){
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

//x -> y -> a
//由鼠标的x,y坐标，来判断是否处在一个方格内，并且返回该方格的 序号 [0 ,lines*cols)左闭右开的区间
//lines,cols用来判断当前 单击的点是否是合法的
__RenderPrototype__.resolvePos = function(x,y,lines, cols){
    
    var dx = x - this.tableOffsetX;
    var dy = y - this.tableOffsetY;
    var col = Math.floor( dx / ( this.squareWidth+this.squareGap) );
    var line = Math.floor( dy / ( this.squareWidth+this.squareGap) ); 
    var pos = line*cols + col;
    if(col < 0 || col >= cols || line < 0 || line >= lines ) return undefined;

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
            line: line,
            pos: pos
        }
    }
    return undefined;
}

__RenderPrototype__.paintSquare = function(col, line, color){
    
    let ctx = this.ctx;
    ctx.save();
    ctx.translate(this.tableOffsetX, this.tableOffsetY);
    ctx.fillStyle = color || 'blue';
    ctx.fillRect(
        col*(this.squareWidth+this.squareGap), 
        line*(this.squareWidth+this.squareGap), 
        this.squareWidth, 
        this.squareWidth
    );

    ctx.restore();
}
__RenderPrototype__.clearSquare = function(col, line){
    
    let ctx = this.ctx;
    ctx.save();
    ctx.translate(this.tableOffsetX, this.tableOffsetY);
    ctx.clearRect(
        col*(this.squareWidth+this.squareGap)-2, 
        line*(this.squareWidth+this.squareGap)-2, 
        this.squareWidth+4, 
        this.squareWidth+4
    );

    ctx.restore();
}
__RenderPrototype__.strokeSquare = function(col,line){
    console.log(col, line);
    let ctx = this.ctx;
    ctx.save();
    ctx.translate(this.tableOffsetX, this.tableOffsetY);
    ctx.strokeRect(
        col*(this.squareWidth+this.squareGap), 
        line*(this.squareWidth+this.squareGap), 
        this.squareWidth, 
        this.squareWidth
    );

    ctx.restore();
}
__RenderPrototype__.renderPath = function(traversed, lines, cols){
    let start = traversed[0];
    let col = Math.floor(start % cols);
    let line = Math.floor(start / cols);
    let x = col*(this.squareWidth+this.squareGap) + this.squareWidth*0.5;
    let y = line*(this.squareWidth+this.squareGap) + this.squareWidth*0.5;
    ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = '#FF00FF';
    ctx.lineWidth = 2;
    ctx.moveTo(x,y);
    ctx.translate(this.tableOffsetX, this.tableOffsetY);
    ctx.beginPath();
    for(let i=0; i<traversed.length; i++){
        col = Math.floor(traversed[i] % cols);
        line = Math.floor(traversed[i] / cols);
        x = col*(this.squareWidth+this.squareGap) + this.squareWidth*0.5;
        y = line*(this.squareWidth+this.squareGap) + this.squareWidth*0.5;
        ctx.lineTo(x,y);
    }
    ctx.stroke();
    
    ctx.restore();
}

