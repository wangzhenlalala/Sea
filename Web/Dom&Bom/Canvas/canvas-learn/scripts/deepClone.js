function deepClone(){
    let hasDone = [];
    let result = {};
    function checkDone(key){
        //确定给定的key是否已经被访问过了
        return hasDone.some(function(item){
            return key === item;
        })
    }

    return function traverse(obj){
        for(let  key in obj){
            if(!checkDone(obj[key])) {
                hasDone.push(obj[key]);
                result[key] = 
                traverse(obj[key]);
            };
        }
    }
};
