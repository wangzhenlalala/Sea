var model = {
    name: 'wangzhen',
    age: 26
};
/**
 * 放在这里添加事件就不会执行，为什么？？？
 * 放在vue实例的创建之后，就可以。是不是vue挂载到#app上的时候，把click事件的监听给移除了
 */
// document.querySelector('#btn').addEventListener('click', function(){console.log("hello")})

var instance = new Vue({
    el: '#app',
    name: 'App',
    data: model,
    methods: {
        grow(){
            this.age++;
        }
    }
});

document.querySelector('#btn2').addEventListener('click', function(){
    model.age++;
})
