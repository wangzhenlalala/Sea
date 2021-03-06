/**
 * 1. { (key, value) }的集合 [key is a member of well-ordered set]
 * 2. 集合元素的有序性，是由 key 决定的
 * 3. key extends Comparable
 */
/**
    data Tree a = Empty
                | Node (Tree a) a Node (Tree a)
    不要把叶子节点(leaf node)看成是一棵树的终点，Empty才是。
    这样思考更容易理解null，在代码中的作用
 */
class Node {
    constructor(props) {
        if(props.key === null || props.key === undefined) throw new Error('you must give a key!!!');
        this.key = props.key;
        this.value = props.value || null;
        this.left = props.left || null;
        this.right = props.right || null;
        this.childNodeCount = 1;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    compare(a,b) {
        // 当初始化一个实例后，为实例赋值该方法，来覆盖默认的方法
        return a - b;
    }
    /** 查找指定的key，并返回对应的 node */
    get(key) {
        return this._get(this.root, key);
    }
    // Node -> Key -> Value
    _get(node, key) {
        if(node === null) return null;
        let cmp = this.compare(key, node.key);
        if(cmp === 0) return node.value;
        else if(cmp < 0) return this._get(node.left, key);
        else return this._put(node.right,  key);
    }
    /** 插入/更新 key 对应的value */
    put(key, value) {
        this.root = this._put(this.root, key, value);
    }
    // Node -> Key -> Value -> Node
    _put(node, key, value) {
        // 递归的做法有很多不必要的left,right更新
        if(node == null) return new Node({key: key, value, value});
        let cmp = this.compare(key, node.key);
        if(cmp == 0) {
            node.value = value;
        }else if(cmp < 0) {
            node.left = this._put(node.left, key, value);
        } else {
            node.right = this._put(node.right, key, value);
        }
        node.childNodeCount = this.size(node.left) + this.size(node.right) + 1;
        return node;
    }

    /** 删除key， 以及对应的value */
    delete(key) {
        this.root = this._delete(this.root, key);
    }
    // Node -> Key -> Node
    _delete(node, key) {
        if(node === null) return null;
        let cmp = this.compare(key, node.key);
        if(cmp < 0) {
            node.left = this._delete(node.left, key);
        }
        else if(cmp > 0) {
            node.right = this._delete(node.right, key);
        } else {
            if(node.left === null) return node.right;
            if(node.right === null) return node.left;
            let oldNode = node;
            node = this._min(node.right);
            node.right = this._delMin(oldNode.right);
            node.left = oldNode.left; 
        }
        node.childNodeCount = this.size(node.left) + this.size(node.right) + 1;
        return node;
    }
    // Void -> Void
    delMin() {
        this.root = this._delMin(this.root);
    }
    // Node -> Node
    _delMin(node){
        if(node === null) return node;
        if(node.left === null) return node.right;
        node.left = this._delMin(node.left);
        node.childNodeCount = this.size(node.left) + this.size(node.right) + 1;
        return node;
    }
    delMax() {
        this.root = this._delMax(this.root);
    }
    // Node -> Node
    _delMax(node) {
        if(node === null) return node;
        if(node.right === null) return node.left;
        node.right = this._delMax(node.right);
        node.childNodeCount = this.size(node.left) + this.size(node.right) + 1;
        return node;
    }
    /** 查找最小值 */
    min() {
        if(this.root === null) return null;
        return this._min(this.root).value;
    }
    // Node -> Node
    _min(node) {
        if(node === null || node.left === null) return node;
        else return this._min(node.left);
    }
    /** 查找最大值 */
    max() {
        if(this.root === null) return null;
        return this._max(this.root).value;
    }
    // Node -> Node
    _max(node) {
        if(node === null || node.right === null) return node;
        else return this._max(node.right);
    }
    /** 找到第k个元素,下标为k 从0开始 */
    select(k) {
        return this._select(this.root, k);
    }
    // Node -> Int -> Node
    _select(node, k) {
        if(node == null) return null;
        let size = this.size(node.left);
        if     ( size == k ) return node;
        else if( size >  k ) return this._select(node.left, k);
        else                 return this._select(node.right, k - size -1);
    }

    /** 返回key是第几个元素，key的下标，从0开始 */
    /** 返回 所有比key小的元素的个数*/
    rank(key) {
        return this._rank(this.root, key);
    }
    // Node -> Key -> Number
    // 小于key的key的数量
    _rank(node, key) {
        if(node === null) return 0;
        let cmp = this.compare(key, node.key);
        if(cmp === 0)      return this.size(node.left);
        else if(cmp < 0)   return this._rank(node.left, key);
        else               return 1 + this.size(node.left) + this._rank(node.right, key);
    }
    /** 所有比key大的元素中，最小的key */
    ceiling(key) {
        return this._ceiling(this.root, key);
    }
    // Node -> Key -> Node 
    // 大于key的所有key中的最小key
    _ceiling(node, key) {
        if(node === null) return null;
        let cmp = this.compare(key, node.key);
        if(cmp == 0) {
            return this._min(node.right);
        } else if(cmp > 0) {
            return this._ceiling(node.right, key);
        } else {
            let max = this._max(node.left);
            if(max === null || this.compare(key, max.key) >= 0) return node;
            else return this._ceiling(node.left, key);
        }
    }
    /** 所有比key小的元素中，最大的key */
    floor(key) {
        return this._floor(this.root, key);
    }
    // 我理解的floor和书上的有差别， 书上的意思和 Math.floor是一个意思
    //  Math.floor(3.5) == 3; Math.floor(3) == 3
    // 我理解的是 Math.floor(3.5) = 3; Math.floor(3) == 2所以过程不一样
    // Node -> Key -> Node
    _floor(node, key) {
        if(node == null) return null;
        let cmp = this.compare(key, node.key);
        if(cmp == 0) {
           return this._max(node.left);
        } else if(cmp < 0) {
            return this._floor(node.left, key);
        } else {
            let min = this._min(node.right);
            if(min === null || this.compare(min.key, key) >= 0) {
                return node;
            } else {
                return this._floor(node.right, key);
            }
        }
    }

    // 返回以node 为根节点的树的总的节点数量
    size(/** BST */ node) {
        if(node == null) return 0;
        return node.childNodeCount;
    }
    // 中序遍历
    traverse(func) {
        this._traverse(this.root, func);
    }

    _traverse(node, func) {
        if(node === null) return;
        this._traverse(node.left, func);
        func(node.key, node.value);
        this._traverse(node.right, func);
    }

    keys() {
        let result = [];
        let getKey = (key, value) => result.push(key);
        this.traverse(getKey);
        return result;
    }
    values() {
        let result = [];
        let getValue = (key, value) => result.push(value);
        this.traverse(getValue);
        return result;
    }
    pairs() {
        let result = [];
        let getPair = (key, value) => result.push([key, value]);
        this.traverse(getPair);
        return result;
    }
}