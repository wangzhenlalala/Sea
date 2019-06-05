var createStore = Redux.createStore;
var applyMiddleware = Redux.applyMiddleware;
var bindActionCreator = Redux.bindActionCreator;
var combineReducers = Redux.combineReducers;

let types = {
  a: 'AA',
  b: 'BB',
};


let reducer1 = function(state,action){
  if(state == undefined) return 'reducer_1_origin';
  switch(action.type){
    case types.a:
      return 'reducer_1_A';
    case types.b:
      return "reducer_1_B"
    default:
      return state
  }
};

let reducer2 = function(state,action){
  if(state == undefined) return 'reducer_2_origin';
  switch(action.type){
    case types.a:
      return 'reducer_2_A';
    case types.b:
      return "reducer_2_B"
    default:
      return state
  }
}
let rootReducer = combineReducers({
  reducer1: reducer1,
  reducer2: reducer2
});
let store = createStore(rootReducer);

let listener1 = function(){
  console.log('listener1')
};

let listener2 = function(){
  console.log('listener2');
  console.log(store.getState())
};

let listener3 = function(){
  console.log('listener3');
  store.dispatch({
    type: types.a
  })
  // Uncaught RangeError: Maximum call stack size exceeded !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
};

let unsubscriber1 = store.subscribe(listener1);
let unsubscriber2 = store.subscribe(listener2);
let unsubscriber3 = store.subscribe(listener3);

store.dispatch({
  type: types.a
})

store.dispatch({
  type: types.b
})