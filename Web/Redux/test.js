let initialState = {
    counter: 0,
};

let reducers = function(state, actions) {
    if(!state) return initialState;
    switch(actions.type) {
        case "ADD":
            return {
                counter: state.counter + actions.count,
            }
        default:
            return state;
    }
}


let store = Redux.createStore(reducers, null, Redux.applyMiddleware(thunk, logger));
store.subscribe(() => {
    console.log("state: ", store.getState());
});

let counterCreator = function() {
    return {
        type: "ADD",
        count: 2
    }
}

let counterCreatorAsync = function() {
    return dispatch => {
        setTimeout( () => {
            store.dispatch( counterCreator() );
        }, 2000);
    }
}

store.dispatch( counterCreatorAsync() );