//使用args调用funcs中的函数： 从右向左，前一个函数的返回值，是下一个函数的参数
function aCompose(args,funcs){
  return funcs.reduceRight(function(mem, func){
    return func.call(this,mem);
  }, args)
}

//现在需要一个函数，接受一个函数数组，返回一个函数，相当于一个thunk，当调用该函数的时候，从右到左依次调用，之前的函数数组，前一个函数的输出，成为下一个函数的输入
/**
 * function compose(funcs) => Function
 */
//首先考虑 如果数组只有一个函数的话，我们会怎么做
function thunk(func){
  return function(){
    return func.apply(this, arguments.slice());
  }
}

//然后考虑 入伙数组有两个函数的话，我们要怎么做

function thunk_2(funcs){
  return function(){
    return aCompose(arguments, funcs);
  }
}

/**
 * 
 * @param {Array<Function>} funcs 
 */
function compose_s(funcs){
    
    return funcs.reduce(function(prev, next){
      //在这里只考虑，只有两个函数时的延迟调用
      return function(arg){
        return  prev( next.call(null, arg) );
      }

    });

}
let arg = 1;
let func = function add(arg){
  return arg + 1;
};

let arr = new Array(5).fill(func);

console.log(aCompose(arg, arr));