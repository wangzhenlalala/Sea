let vm = new Vue({
    el: "#app",
    render(h){
        h(
            'div',
            {style: 'display: none'},
            hello
        )
    }
})