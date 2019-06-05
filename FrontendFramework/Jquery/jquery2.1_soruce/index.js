// debugger
var x = $.Callbacks('memory once');
var y = $.Callbacks('');

var f1 = function(x){ console.log('---f1---',x)};
var f2 = function(x){console.log('f1',x)};
var f3 = function(x){console.log(x)};
// x.add(f1);
// x.fire('first fire');
// x.lock();
// x.add(f2);
// x.fire('second fire')

y.add(f3);


function fn1( value ) {
    console.log('fn1 says ', value);
    return false;
  }
   
  function fn2( value ) {
    console.log('fn2 says ', value)
    return false;
  }
   
  var callbacks = $.Callbacks( "unique memory" );
  callbacks.add( fn1 );
  callbacks.fire( "foo" ); //第一次被触发
  
  callbacks.add( fn1 ); // Repeat addition //重复的值，不在添加
  callbacks.add( fn2 ); //( memory && hasFired)，所以 用上次一触发的值（’foo')，立即调用fn2，然后push进队列


  callbacks.fire( "bar" );  //用 ‘bar' 调用队列中的 所有回调

  callbacks.add( fn2 );     //重复的值，不添加
  callbacks.fire( "baz" );  // 用 'baz' 调用队列中 所有的回调


  callbacks.remove( fn2 );
  callbacks.fire( "foobar" ); //用 'foobar' 调用队列中 所有的回调

  
   
