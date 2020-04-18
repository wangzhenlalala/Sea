// 链式组合
// a = b . c . d. e
// a = (arg) => b(c(d(e(arg))));  像洋葱一样的结构
// 同步的链式组合 (Synchronous)
// 异步的链式组合 (Ashnchronous)
let handle = arg => { return arg };

/***************************************** [First Round] *****************************************/
function firstRound() {

    // 每个函数都是同步的
    let first = arg => {
        let result = handle(arg);
        return result;
    }
    
    let second = arg => {
        let result = handle(arg);
        return result;
    }
    
    let third = arg => {
        let result = handle(arg);
        return result;
    }
    
    let fourth = arg => {
        let result = null;
        setTimeout( () => {
            result = handle(arg);
            return result;
        }, 200);
    }

    let fifth = arg => {
        let result = handle(arg);
        return result;
    }

    // 这是一种想要的结果 管道一样的处理： 前一个函数的返回结果，作为后一个函数的 参数 (函数的调用有时序/顺序上的依赖)
    let result = null;
    let arg = null;
    result = first(arg);
    result = second(result);
    result = third(result);
    // 可以这样的组合
    let zero = Redus.compose(third, second, first);
    result = zero(arg);

    // 但是 如果我们希望 third | fourth | fifth 顺序的执行
    result = third(arg);
    result = fourth(result); // 异步的执行， 我们需要等待其异步结果的返回才能去，执行fifth的计算；否则结果就不是我们所期望的
    // process.pause(200);
    result = fifth(result);
    
    
    // 这是一种想要的结果: 各个函数之间没有关系， 互相不依赖
    result = first(arg);
    result = second(arg);
    result = third(arg);



}
/***************************************** [First Round] *****************************************/



/***************************************** [Second Round] *****************************************/
function firstRound() {

    let first = arg => {
        let result = handle(arg);
        return result;
    }
    
    let second = arg => {
        let result = handle(arg);
        return result;
    }
    
    let third = arg => {
        let result = handle(arg);
        return result;
    }
    
    // 这是一种想要的结果 管道一样的处理： 前一个函数的返回结果，作为后一个函数的 参数
        let result = null;
        let arg = null;
        result = first(arg);
        result = second(result);
        result = third(result);
    
        // 可以这样的组合
        let zero = Redus.compose(third, second, first);
        result = zero(arg);

}
/***************************************** [Second Round] *****************************************/