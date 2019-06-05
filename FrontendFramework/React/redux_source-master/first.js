var createStore = Redux.createStore;
var applyMiddleware = Redux.applyMiddleware;
var bindActionCreator = Redux.bindActionCreator;
var combineReducers = Redux.combineReducers;
// debugger
var wrapDispatchMiddleware = function(store){
    return function(next){
        return function(action){
            console.log("before dispatch",action.type);
            next(action);
            console.log("after dispatch",action.type);
        }
    }
}
var reducer = function(state,action){
    if(state == undefined){
        //进入这里的条件不能是 !state
        return 0
    };
    switch(action.type){
        case "add": 
            return state + 1;
        case "minus": 
            return state -1;
        default: 
            return state;
    }

}
var onChangeHandler = function(){
    console.log(store.getState(),'onChangeHandler getState');
}
var store = createStore(reducer,applyMiddleware(wrapDispatchMiddleware));
var unsubscribeHandler = store.subscribe(onChangeHandler);

store.dispatch({type: 'add'})
console.log(store.getState(),'after add');