function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
      }
  
      return next(action);
    };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

/** redux middleware prototype */
let __redux_store = {}; 
let middleware1 = store => next => action => {}
let middleware2 = store => next => action => {}
let middleware3 = store => next => action => {}

let reduxEnhencer = __redux_store.applyMiddleware(middleware1, middleware2, middleware3);
// redux 提供了对action处理过程的扩展， 对于每个middleware， 完成自己对action的处理后，在继续整个流程
const __redux_dispatch =  (action) => {

}

// applyMiddleware 被调用之后， store.dispatch就不是store本身的dispatch了， 
// 此时的store.dispatch是整个 pipeline的开始
// next是pipeline中当前middleware的下一个middleware
const __thunk = ({dispatch, getState}) => next => action => {
    if(typeof action === "function") {
        return action(dispatch, getState, extraArgument);
    }
    next(action);
}

/****** dispatch(AsyncAction).then() ????? 每个middleware的返回值返回给了谁？？？？？*/
/*
1. 如果么个middleware都把下一个middleware的返回值给返回出去
2. 如果middlewareA, 没有调用next，而是直接返回了一个值 resultA
3. 那么user-> store.dispatch(action) 的返回值就是resultA
*/