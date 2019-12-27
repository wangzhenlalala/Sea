console.log(Vue);
let Me = {
    name : 'wangzhen', 
    age: 27,
    family: [
        {name: 'fanghua', role: 'wife', hobby: {basketball: true} },
        {name: 'hechen', role: 'son', hobby: {basketball: true} },
        {name: 'woruo', role: 'daughter', hobby: {basketball: true} },
    ]
}

let vue1 = new Vue({
    name: 'me',
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