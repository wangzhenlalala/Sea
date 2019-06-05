combineReducers({
    a: function(){return stateA },
    b: function(){return stateB },
    c: function(){return stateC }
})

let state = {
    a: stateA,
    b: stateB,
    c: stateC 
};

//如何让state tree是真正分层次的呢？？？
//拥有命名空间???    像dva中的model一样，
class nameSpace {
    constructor(initilizer){
        //the three properties below is mandatory !!!
        this.namespace = initilizer.namespace;
        this.state = {};
        this.reducer = initilizer.reducer;
        //maybe there are some child namespace
        this.childNamespace = {};
        // this.parentNameSpace = null;
    }

    /**
     * 当dispatch('nameA/nameB/nameC/actionType', payload)的时候，
     *  
     * @param {action} action 
     */
    nextState(action){

    }

    /**
     * 这个方法，给由谁来调用呢？？？子空间来调用父空间的吗？？？？
     * @param {nameSpace} child  必须是一个 nameSpace 的实例
     */
    addChildNamespace(child){
        if(!(child instanceof nameSpace)) throw Error(`add child Namespace to namespace: ${this.namespace} failed! wrong child Type`);
        this.childNamespace[child.namespace] = child;
    }

    /**
     * 
     * @param {String} identifier  根据字符串来返回 该命名空间下的 子命名空间
     */
    giveChildNamespace(identifier){
        return this.childNamespace[identifier];
    }
}
//state 就是一个一直的命名空间的名字，或者说是全局的(范围最大的)
var state = {
    namespaceA: {

    },
    namespaceB: {

    },
    namespaceC: {

    },

    //必须给的
    reducer: function(oldState, action){},
    state: {}
}