let _ = {
    now: Date.now
};
/**
 *  +++++++++++++++++++++++++++++++++++T+++++++++++++++++++++++++++++++++++T+++++++++++++++++++++++++++++++++++T (time line)
 *  A  &      &      &       &     B      C & & &&& &                  &D         E && F                         (event happened)
 * 
          
                                                invoke: 
    1. {leading: true, trailing: false  }       A, C, E
    2. {leading: true, trailing: true   }       A, B, C, D, E, F
    3. {leading: false, trailing: false }       no one will be called
    4. {leading: false, trailing: true  }       B, D, F
 */

_.throttle = function (func, wait, options) {
    // timeout 标识最近一次被追踪的调用 
    // context 和 args 缓存 func 执行时需要的上下文，result 缓存 func 执行结果 
    var timeout, context, args, result;
    // 最近一次 func 被调用的时间点 
    var previous = 0;
    if (!options) options = {};

    // 创建一个延后执行的函数包裹住 func 的执行过程 
    var later = function () {
        // 执行时，刷新最近一次调用时间 
        previous = options.leading === false ? 0 : _.now();
        // 清空为此次执行设置的定时器
        timeout = null;
        result = func.apply(context, args); // func，会再次触发 throlltedFunc吗
        if (!timeout) context = args = null;
    };

    // 返回一个 throttle 化的函数 
    var throttled = function () {
        // 我们尝试调用 func 时，会首先记录当前时间戳 
        var now = _.now();
        // 是否是第一次调用 
        if (!previous && options.leading === false) previous = now;
        // func 还要等待多久才能被调用 = 预设的最小等待期 -（当前时间 - 上一次调用的时间）
        var remaining = wait - (now - previous);
        // 记录执行时需要的上下文和参数 
        context = this;
        args = arguments;
        // 如果计算后能被立即执行 
        if (remaining <= 0 || remaining > wait) {
            // 清除之前的设置的延时执行，就不存在某些回调一同发生的情况了 
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            // 刷新最近一次 func 调用的时间点 
            previous = now;
            // 执行 func 调用 
            result = func.apply(context, args);
            // 再次检查 timeout，因为 func 执行期间可能有新的 timeout 被设置，如果 timeout 被清空了，代表不再有等待执行的 func，也清空 context 和 args
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            // 如果设置了 trailing edge，那么暂缓此次调用尝试的执行 
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    // 不再控制函数执行调用频率 
    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
};