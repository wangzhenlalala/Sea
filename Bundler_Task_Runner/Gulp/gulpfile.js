/**
    Any exported functions will be registered into gulp's task system
    Each gulp task is an asynchronous JavaScript function
 */

 /**
  Node libraries handle asynchronicity in a variety of ways:
    error-first callbacks, 
    streams, 
    promises, 
    event emitters, 
    child processes, 
    observables
  */
const { series, parallel, src, dest} = require("gulp");
const { EventEmitter, } = require('events');
const {of } = require('rxjs');

function priviteTask_1(cb){
    cb();
}

function priviteTask_2(cb){
    cb();
}

function publicTask(cb){
    cb();
}

function javascript(){
    //handle javascript file
}
function css(){

}
function image(){

}
// If nothing is returned from your task, you must use the error-first callback to signal completion.
// to indicate an error, you return a error object
function series_1(infoGulp){
    //error-first callback
    console.log('series_1');
    infoGulp();
    //infoGulp( new Error("something wronog") );
}
function series_2(){
    //Promise
    console.log('series_2');
    return Promise.resolve('ok');
}
function parallel_1(){
    //EventEmitter
    console.log('parallel_1');
    let emitter = new EventEmitter();
    setTimeout(() => emitter.emit('finish'), 2000);
    return emitter;
}
function parallel_2(infoGulp){
    console.log('parallel_2');
    infoGulp(); 
}
function parallel_3(){
    //observable
    console.log('parallel_3');
    return of(1,2,3);
}
function parallel_4(){
    //stream
    console.log('parallel_4');
    return src('*.js')
    .pipe(dest('output'));
}

function test_glob(cb){
    return src(
        ['glob_test/*.js', "!glob_test/wanted/**", "glob_test/wanted/wanted.js"]
    ).pipe(
        dest("output/")
    );
}
//require && exports
//import && export default
exports.publicTask = publicTask;
exports.build = series(priviteTask_1, priviteTask_2);
exports.production = parallel(javascript, css, image);
exports.compose = series(
    series_1,
    parallel(
        parallel_1,
        parallel_2
    ),
    parallel(
        parallel_3,
        parallel_4
    ),
    series_2
);
exports.glob = test_glob;
//The following tasks did not complete: compose, series_1
//Did you forget to signal async completion?





// A glob is a string of literal and/or wildcard characters used to match **filepaths**. 
// Globbing is the act of ***locating files*** on a filesystem using one or more globs.

//Avoid using Node's path methods, like path.join, to create globs.
//Segments and separators
        //A segment is everything between separators. The separator in a glob is always the / character

//Special character: * (single-star)
        //Matches any amount - including none - of characters within a single segment.

//Special character: ** (double-star)
        //Matches any amount - including none - of characters across segments.
//Special character: ! (negative)
        //To ignore all files in a directory, only add the /** glob after the directory name.