
function palette(ctx, startX, startY,blue){
    let lines = 16;
    let cols = 16;
    let cellWidth = 20;
    let cellHeight = 20;
    let prevStyle = ctx.fillStyle;

    let colorStepX = Math.floor(255 / cols);
    let colorStepY = Math.floor(255 / lines);
    let assembleRgb = function(r,g,b){
        let color = "rgb("
                    +  r + ","
                    +  g + ","
                    +  b 
                    + ")";
        return color;
    }
    for(let i=0; i < cols; i++ ){
        for(let j=0; j < lines; j++){
            ctx.fillStyle = assembleRgb(Math.floor(i*colorStepX), Math.floor(j*colorStepY), blue);
            ctx.fillRect( startX + i*cellWidth, startY + j*cellHeight, cellWidth, cellHeight);
        }
    }
    ctx.fillStyle = prevStyle;
}

function AlphaRect(ctx, startX, startY){
    startX = startX ? startX : 0;
    startY = startY ? startY : 0;
    let cellMetric = 150;
    /* 绘制4个矩形 */
    ctx.fillStyle = '#FD0';
    ctx.fillRect(startX + 0, startY + 0, cellMetric, cellMetric);
    ctx.fillStyle = '#6C0';
    ctx.fillRect(startX + cellMetric, startY + 0, cellMetric, cellMetric);
    ctx.fillStyle = '#09F';
    ctx.fillRect(startX + 0, startY + cellMetric, cellMetric, cellMetric);
    ctx.fillStyle = '#F30';
    ctx.fillRect(startX + cellMetric, startY + cellMetric, cellMetric, cellMetric);
    ctx.fillStyle = '#FFF';
    let globalAlpha = ctx.globalAlpha;
    ctx.globalAlpha = 0.2;
    let circleNum = 7;
    let circleSpace = Math.floor(cellMetric / circleNum);
    for(let i=0; i<7; i++){
        ctx.beginPath();
        ctx.arc(startX + cellMetric, startY + cellMetric, circleSpace + i*circleSpace, 0, Math.PI*2, true);
        ctx.fill();
    }
    ctx.globalAlpha = globalAlpha;
}
let lineDashOffsetNumber = 0;

let lineDashDom = document.getElementById('lineDashOffset');
let offset = 0;


function setLineDash(ctx, startX, startY){
    let lineDash = ctx.getLineDash();
    let strokeStyle = ctx.strokeStyle;
    ctx.strokeStyle = "blue";
    ctx.setLineDash([12,20]);
    ctx.lineDashOffset = offset;
    ctx.clearRect(startX + 10, startY + 10, 100, 100);
    ctx.strokeRect(startX + 10, startY + 10, 100, 100);
    ctx.setLineDash(lineDash);
    ctx.strokeStyle = strokeStyle;
}

function incDashOffsetHandler(){
    lineDashOffsetNumber += 5;
}

function gradient(ctx, X, Y){
    let fillStyle = ctx.fillStyle;
    let strokeStyle = ctx.strokeStyle;
    let lineWidth = ctx.lineWidth;
    let linerGrad = ctx.createLinearGradient(X, Y, X+200, Y+200); //在canvas的指定区域内创建渐变
    let radialGrad = ctx.createRadialGradient(X +300, Y+100, 20, X+350, Y+150, 190);
    linerGrad.addColorStop(0, 'red');
    linerGrad.addColorStop(0.5,'blue');
    linerGrad.addColorStop(1,'green');

    radialGrad.addColorStop(0, 'red');
    radialGrad.addColorStop(0.5,'blue');
    radialGrad.addColorStop(1,'green');
    ctx.fillStyle = linerGrad;
    ctx.strokeStyle = linerGrad;
    ctx.lineWidth = 4;
    ctx.fillRect(X, Y, 200, 200);
    ctx.strokeRect(X-4, Y-4, 200+8, 200+8);

    ctx.fillStyle = radialGrad;
    ctx.beginPath();
    ctx.arc(X+300, Y+100, 90, 90, 0, Math.PI*2, true);
    ctx.fill();

    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
}

function draw(ctx) {
    palette(ctx, 100, 100, 150);
    AlphaRect(ctx, 600,100);
    setLineDash(ctx, 950, 150);
    gradient(ctx, 1150, 150)
}



init();