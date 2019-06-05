console.log(Vue);
let Me = {
    name : 'wangzhen', 
    age: 27,
    family:{
        name: 'fanghua',
        role: 'wife'
    }
}

let vue1 = new Vue({
    name: 'me',
    el: "#app",
    data(){
        return Me
    },
    props: {
        father: 'wanghongkuan',
        mother: 'luxinhua'
    },
    methods: {
        method1(){},
        method2(){}
    },
    computed: {
        bigName(){}
    },
    watch: {
        name(){}
    },
    render(h){
        return h('div', [this.name, " + ", this.age]) 
    }
})