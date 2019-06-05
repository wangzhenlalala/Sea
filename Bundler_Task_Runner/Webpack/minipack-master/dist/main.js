var modules = {
    0: [
        function (require, module, exports) {
            "use strict";
            var _message = require("./message.js");
            var _message2 = _interopRequireDefault(_message);
            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
            console.log(_message2.default);
        },
        {"./message.js":1},
    ],
    1: [
        function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var _name = require("./name.js");
            exports.default = "hello " + _name.name + "!";
        },
        {"./name.js":2},
    ],
    2: [
        function (require, module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var name = exports.name = 'world';
        },
        {},
    ],
}


(function(modules) {
    function require(id) { // id
        const [fn, mapping] = modules[id];
        function localRequire(name) {// relative path
            return require(mapping[name]);
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports);
        return module.exports;
    }
    require(0); // we konw here. entry module's id is 0;
                // entry module is a dependency of bundler runtime !!! hahaha
})( modules )
/*
    load a moudle means:
        1. fetch that module's code (a wraped function)
        2. run that wrapped function 
        3. give the returned exports to who required that module 
*/