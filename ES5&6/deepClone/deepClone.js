

/**
 * 参考自 
 *  https://juejin.im/post/5bc1ae9be51d450e8b140b0c
 */
//似乎感觉到了 类型 的重要性 @_@
var traNode = {
    value: null, //target中的树节点
    targetValue: null  //dest树中的节点
}

var stackNode = {
    dest: null, //需要被添加属性的对象 (target)
    key: "",    //即将要添加属性的 标识 (identifier)
    value: null //要添加到dest 中被key标识的 对象
}

function isObject(data){
    // return Object.prototype.toString.call(data) === '[object Object]'
    return typeof data == 'object'
}

function deepClone(data){
    let result = {};
    let stack = []; //里面存放的是  stackNode 类型的元素。
    //构建 根元素data 的stackNode 对象
    var dest = null;
    var key = "";
    var value = null;
    var node;

    let rootNode = {
        dest: result,
        key: undefined,
        value: data
    };

    stack.push(rootNode);
    //构建 根元素data 的stackNode 对象
    while(stack.length){
        //每一趟 都会枚举一个 target对象的属性。该趟结束后，target就失去作用了，我们不在需要target的引用。因为
        //没有被添加进 dest对象的属性，都被压入了栈里面。
        //但是我们需要一个dest对象，来确定，下一次copy的目标的引用。
        node = stack.pop();
        dest = node.dest;
        key = node.key;
        value = node.value;
        
        if( key !== undefined){
            if(Object.prototype.toString.call(value) == '[object Array]') {
                dest = dest[key] = [];
            }else{
                dest = dest[key] = {}; //每两趟之间的 连接 connect point(relationship)
            }
        }

        for(var key in value){
            if( value.hasOwnProperty(key)){
                if( isObject(value[key]) ){
                    stack.push({
                        dest: dest,
                        key: key,
                        value: value[key]
                    })
                }else{
                    dest[key] = value[key];
                }
            };
        };
    };
    return result;
}

function find(array, element){
    for(var index in array){
        if(array[index].value === element){
            return array[index].targetValue;
        }
    };
    return null;
}

function circleClone(data){
    // debugger;
    let result = {};
    let stack = []; //里面存放的是  stackNode 类型的元素。
    let traversedNodes = [];
    //构建 根元素data 的stackNode 对象
    var dest = null;
    var key = "";
    var value = null;
    var node;

    let rootNode = {
        dest: result,
        key: undefined,
        value: data
    };

    stack.push(rootNode);
    //构建 根元素data 的stackNode 对象
    while(stack.length){
        //每一趟 都会枚举一个 target对象的属性。该趟结束后，target就失去作用了，我们不在需要target的引用。因为
        //没有被添加进 dest对象的属性，都被压入了栈里面。
        //但是我们需要一个dest对象，来确定，下一次copy的目标的引用。
        node = stack.pop();
        dest = node.dest;
        key = node.key;
        value = node.value;
        
        let traversedNode = find(traversedNodes, value)
        if( traversedNode ){
            //如果已经拷贝过了之后；dest[key] 指向的应该是dest中的每个已经拷贝过的对象；而不是还处在 target中的对象; 
            // dest[key] = value;
            dest[key] =  traversedNode;
            continue;
        }
        
        if( key !== undefined){
            if(Object.prototype.toString.call(value) == '[object Array]'){
                dest = dest[key] = []
            }else{
                dest = dest[key] = {}; //每两趟之间的 连接 connect point(relationship)
            }
        }

        for(var key in value){

            if( value.hasOwnProperty(key)){
                if( isObject(value[key]) ){
                    stack.push({
                        dest: dest,
                        key: key,
                        value: value[key]
                    });
                }else{
                    dest[key] = value[key];
                }
            };

        };
        // 我们应该把，新拷贝的那个对象的引用push进，travesedNodes里面。
        traversedNodes.push({
            value: value,
            targetValue: dest
        });
    };
    return result;
}

var familyTree = {
    name: 'wangzhen',
    age: 24,
    children: [
        {
            name: 'hechen',
            age: 3,
            children: {
                name: 'wukong' ,
                age: 1
            }
        },
        {
            name: 'wowuo',
            age: 4,
            children: {
                name: 'wukong' ,
                age: 1
            }
        },
    ],
    friends: {
        name: 'juhua',
        age: 26,
    }
};

let cloned = deepClone(familyTree);
console.log(familyTree, 'familyTree');
console.log(cloned, 'cloned familyTree');

/*
    测试循环的引用，比如 
    var common = {}
    var b = {
        x: common,
        y: common
    }
    当 t = deepClone(b) 的时候， t.x !== t.y，因为我们，为b.x, b.y都拷贝了一份 common
*/

// var common = {name: 'common', method: 'test'};
// var b = {
//     x: common,
//     y: common
// }

// var t = deepClone(b);
// console.log(b.x === b.y , 'before deep clone: equality');
// console.log(t.x === t.y , 'after deep clone : equality');


// var c = circleClone(b);
// console.log(c)
// console.log(b.x === b.y , 'before circle clone: equality');
// console.log(c.x === c.y , 'after circle clone : equality');