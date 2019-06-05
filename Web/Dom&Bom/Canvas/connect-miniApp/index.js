/**
 * 一个和我具有相同个问题的人： 如何让两个对象相互感知对方，相互交流，但又不互相拥有对方，如何解耦两个对象
 *      https://softwareengineering.stackexchange.com/questions/284999/how-can-i-have-objects-interacting-and-communicating-with-each-other-without-for
 * 
 * 知乎的关于Entity-Conponent-System的解释，（虽然没看懂多少）
 *      https://zhuanlan.zhihu.com/p/32787878
 */

// 5, 4, 18, [0, 3, 8, 19]
//程序的初始状态
let metric = {
    lines: 5,
    cols: 4,
    start: 18,
    removed: [0, 3, 8, 19]
}

//寻找dom元素
let beginEle = document.getElementById('beginCal');
let clearEle = document.getElementById('clearCal');
let lineEle = document.getElementById("lines");
let colEle = document.getElementById("cols")

//初始化 计算路径对象， 渲染计算出来的路径的对象
let connect = new Connecter(metric.lines, metric.cols, metric.start, metric.removed);
let render = new Render('app');

//设置初始化的lines and cols
lineEle.value = metric.lines;
colEle.value = metric.cols;

//初始化渲染对象
render.init();
setTable();


//开始计算路径
function beginCalculate(){
    let start = connect.traversed[0];
    if(start == -1){
        alert('请选择起始点： 右键单击图中的矩形，使其变成绿色');
        return;
    }
    let traversed = connect.Begin();
    if(traversed) {
        render.renderPath(traversed, connect.LINES, connect.COLS);
        return;
    };
    alert('不好意思，这样走不通哟')
};

//渲染table，方块
//起始点
//已经移除的方块
function setTable(){
    let start = connect.startPos;
    let removed = connect.removedPos;
    let lines = connect.LINES;
    let cols = connect.COLS;
    let col, line;
    render.renderTable(cols, lines);
    if(start != -1){
        col = Math.floor(start % cols);
        line = Math.floor(start / cols);
        render.paintSquare(col, line, 'green');
    }
    removed.forEach(function(item){
        col = Math.floor(item % cols);
        line = Math.floor(item / cols);
        render.clearSquare(col, line); 
    })
}

//添加，计算路径，清除路径的入口
beginEle.addEventListener('click', beginCalculate);
clearEle.addEventListener('click', setTable);

//为canvas元素添加 单击事件
//右键单击的时候 设置 起始点
render.canvas.addEventListener('contextmenu', function(e){
    e.preventDefault();
    let event = {
        x: e.clientX,
        y: e.clientY,
        alt: e.altKey,
        ctrl: e.ctrlKey,
        button: e.button // 0: left 1: middle 2: right
    }
    let pos = render.resolvePos(event.x, event.y, connect.LINES, connect.COLS);
    let startPre = connect.startPos;
    let col = Math.floor( startPre % connect.COLS);
    let line = Math.floor( startPre / connect.COLS);
    if(pos){
        connect.setStart(pos.pos);
        setTable();
    }
    return false; //不冒泡
});

//左键单击，设置不可到达的点
render.canvas.addEventListener('click', function(e){
    let event = {
        x: e.clientX,
        y: e.clientY,
        alt: e.altKey,
        ctrl: e.ctrlKey,
        button: e.button // 0: left 1: middle 2: right
    }
    let pos = render.resolvePos(event.x, event.y, connect.LINES, connect.COLS);
    if(pos){
        if(connect.hasRemoved(pos.pos)){
            connect.delFromRemoved(pos.pos);
        }else{
            connect.addToRemoved(pos.pos);
        }
        setTable();
    }
});

//改变行数
lineEle.addEventListener('input',function(e){
    let value = e.target.value;
    connect.setLines(parseInt(value));
    connect.delFromRemoved(-1); //清除所有的 不可到达点
    connect.setStart(0);
    setTable();
})
//改变列数
colEle.addEventListener('input',function(e){
    let value = e.target.value;
    connect.setCols(parseInt(value));
    connect.delFromRemoved(-1); //清除所有的 不可到达点
    connect.setStart(0);
    setTable();
})