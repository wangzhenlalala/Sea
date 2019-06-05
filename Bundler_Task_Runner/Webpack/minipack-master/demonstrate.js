
//modules after parsed
let AllModules = {
    0: [
        function(require, module, exports){
            let app = require('../app.js');
            app.run();
            //for bootstrap (root) script , is it necessary to export something ???
        },
        {
            './app.js': 1,
        }
    ],
    1: [
        function(require, module, exports){
            // those below  are from our source file that being transpiled by babel!!
            let request = require('../request');
            let config = require('../../common/config/index.js');
            module.exports = {
                name: 'hello',
                age: "world",
                greet: function(){}
            }
            // those above are from our source file that being transpiled by babel!!
        },
        {
            '../request.js': 2,
            '../../common/config/index.js': 3
        }
    ]
}
//script to be firstly executed by browser
//modules controller
//can i call this a manifest.js ?????
(function(modules){
    //modules contains all modules and relations between each other!!!!
    function require(moduleId){
        let [fn, mapping] = modules[moduleId] ;
        function localRequire(relativePath){
            //递归展开的过程，先执行叶子模块的代码，并收集他们的interface
            return require( mapping[relativePath] );
        };
        //这样的话，同一个组件多次被依赖，会有多个状态对象，相互独立，不共享
        let module = {
            exports: {}
        };
        
        fn(localRequire, module, module.exports);
        return module.exports;
    }

    require(0);   //bootstrap script's moduleId is 0 ;
})( AllModules )