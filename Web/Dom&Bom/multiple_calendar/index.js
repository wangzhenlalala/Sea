/**
 * 为什么不用table的原因：每次添加元素的时候，需要判断是否需要新建一个tr，
 * 
 */

let startTime = "2018-10-25" //2018-10-29
//全局的时间对象，
let Time = null;
let MonthClass = ['colorA', 'colorB'];
let MonthClassIndex = 0;
let Monthes = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"]
/**
 * 1. 如何一天一天的显示
 */
let $container = $('.container');
let $addOneMonth = $('.addOneMonth');
let $month = $('.month');

// (年，月，日，星期的第几天) => DOM
let produceItem = function(year, month, date, day){
    /*
        节点共有3中状态:
            1. 空节点 empty
            2. 周一到周五 weekday
            3. 周六到周日 weekend
    */
   $item = $(
                `<div 
                    year=${year}
                    month=${month}
                    date=${date}
                    day=${day}
                    class="item"
                >
                 ${date}
                </div>`
            );
   
   return $item ;
}

let parseKey = function(time){
    let year = Time.year();
    let month = Time.month();
    let date = Time.date();
    let day = Time.day();
    return {
        year,
        month,
        date,
        day
    }
}
//确定我们指定的第一天的位置
let addEmptyItems = function(){
    let number = Time.day();
    let emptyNum = (number + 7 - 1) % 7;
    Time.subtract(emptyNum, 'days');
    let parsed = {}
    for(let i=0; i<emptyNum; i++){
        parsed = parseKey(Time);
        $container.append( produceItem(parsed.year, parsed.month, parsed.date, parsed.day) );
        Time.add(1, 'days');
    }
}

//添加一个正常的item到container当中
let addCommonItem = function(parsed){
    $container.append( produceItem(parsed.year, parsed.month, parsed.date, parsed.day) );
}

//添加一个月的元素，一直到月底
function addOneMonth(){
    //调用跟我们的时候，Time处在一个月份的某一天，我们要从该天开始，渲染到该月的最后一天。使得Time停留在下个月的第一天上
    //一个月的最后一天不好判断，但是第一天好判断
    let parsed = {};
    do{
        parsed = parseKey(Time);
        addCommonItem(parsed);
        Time.add(1, 'days');
    }while(Time.date() != 1);
    
    MonthClassIndex = (MonthClassIndex + 1) % 2;
}

function initEvent(){
    $addOneMonth.on('click', addOneMonth)
}

//程序的初始化
function init(){
    Time = moment(startTime);
    // ['日', '一', '二', '三', '四', '五', '六'];
    addEmptyItems();
    addOneMonth();
    initEvent();
}

init();

