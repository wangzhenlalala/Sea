let promise1 = new Promise((resolve, reject) => {
     resolve('done promise 1');
});

let p2 = promise1.then((state) => {
    console.log(state + " then 1")
    return state + " then 1";
});

let p3 = promise1.then(state => {
    console.log(state + ' then 2 ')
    return state + " then 2"
});

let p4 = promise1.then(state => {
    console.log(state);
});

let p5 = promise1.then(state => {
    console.log( state +"then 4");
    return "promise then 5";
})
.then(state => { // this is a new promise's successful callback
    console.log(state);
    console.log("promise1.then.then");
})

/**
 * promise1 的3个then回调函数，各自独立的接收promise1的最终结果。都是相同的值。不是被链式调用的。
 *  .then函数返回一个新的promise
 */