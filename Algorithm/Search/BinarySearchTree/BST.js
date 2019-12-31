/**
 * 1. { (key, value) }的集合
 * 2. 集合元素的有序性，是由什么来决定的， key? value?
 * 3. key extends Comparable
 */

class Node {
    constructor(props) {
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
    /** 查找指定的key，并返回对应的value */
    get(key) {}

    /** 插入/更新 key 对应的value */
    put(key, value) {
        
    }
    /** return::Node */
    _put(node, key, value) {
        if(node == null) return new Node({value, value});
        let cmp = 0;
    }

    /** 删除key， 以及对应的value */
    delete(key) {}

    /** 查找最小值 */
    min() {}

    /** 查找最大值 */
    max() {}

    /** 找到第k个元素,下标为k 从0开始 */
    select(k) {
        return this._select(this.root, k);
    }
    _select(node, k) {
        if(node == null) return null;
        let size = this.size(node);
        if     ( size == 0 ) return node;
        else if( size >  0 ) return this._select(node.left, k);
        else                 return this._select(node.right, k - size -1);
    }

    /** 返回key是第几个元素，key的下标，从0开始 */
    /** 返回 所有比key小的元素的个数*/
    rank(key) {}

    /** 所有比key大的元素中，最小的key */
    ceiling(key) {}

    /** 所有比key小的元素中，最大的key */
    floor(key) {}

    // 返回以node 为根节点的树的总的节点数量
    size(/** BST */ node) {
        if(node === null) return 0;
        return node.childNodeCount;
    }
}