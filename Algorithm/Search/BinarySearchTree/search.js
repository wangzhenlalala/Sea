let bst = new BST();

let paragraph = "lorem ipsum dolor sit consectetur adipiscing elit";
let values = paragraph.split(" ");
let keys = values.map(v => v.charCodeAt(0));
console.log("keys - ", keys);
console.log("values - ", values);

keys.forEach((key, index) => {
    bst.put(key, values[index]);
});
console.log('bst keys', bst.keys());
console.log('bst values', bst.values())
console.log('bst pairs', bst.pairs())