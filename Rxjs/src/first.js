let { 
    of,
    from,
    Observable,
} = rxjs;


const sourceStream = of(...[1,2,3,4,5]);

//receive an iterable || promise object
const fromStream = from([1,2,3,4,5]);
const promiseStream = from (new Promise(resovle => resovle('hello wrold')));
let person = {
    name:'wangzhen',
    age:26
};
//iterator protocol :implement next function
//iterable protocol :implement [Symbol.iterator] method. which returns an iterator.
//it is rarely desirable to implement the iterator protocol without also implementing iterable.

person[Symbol.iterator] = function*(){
    yield ['name','wangzhen'];
    yield ['age', 26];
}

const dictStream = from(person);

const dictSubscription1 = dictStream.subscribe(value => {
    console.log(value,"dict Stream");
});

// const subscribe = sourceStream.subscribe( {
//     next: val => console.log(val) ,
//     complete: end => console.log(end)
// });

const helloStream = Observable.create( observer => {
    observer.next('hello');
    observer.next('world');
});

helloStream.subscribe({
    next: val => console.log(val + " ___ "),
});


/**
 * onSubscription can optionally return either a function or an object with unsubscribe method. 
 * In both cases function or method will be called 
 * when subscription to Observable is being cancelled 
 * and should be used to clean up all resources.
 */
/**
 * create(onSubscription: function(observer: Observer): TeardownLogic): Observable
 * 
 * functionName(paramName: paramType, paramName: paramType):returnType
 * this is typescript signature
 */
const evenNumberStream = Observable.create( observer => {
    let value = 0;
    const intervalHandler = setInterval(() => {
       if(value % 2 == 0){
           observer.next(value);
       } 
       value++;
    }, 1000);

    //what does the return stm mean??
    // return to who 
    // when to run the returned function ??
    return () => clearInterval(intervalHandler);
    /*
    return {
        unsubscribe : () => clean up your customer observable's resource
    }
    */

});

// Return:
// Observable	
// An Observable that, whenever subscribed, will execute the specified function.
// When Observable is unsubscribed, function will be unregistered



evenNumberSubscription = evenNumberStream.subscribe( value => {
    console.log(value);
});

const outHandler = setTimeout( () => {
    evenNumberSubscription.unsubscribe();
    clearTimeout(outHandler);
}, 10000);