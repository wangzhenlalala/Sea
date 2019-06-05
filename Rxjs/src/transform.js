// public pipe(operations: ...*): Observable
// Used to stitch together functional operators into a chain.
let {
    fromEvent,
    from,
    interval, // Emit sequence of values at 1 second interval
    timer,
    // pipe,
    // map  wrong
} = rxjs;

let {
    max, // when source Observable completes it emits a single item
    map,
    mapTo,
    scan,
    merge,
} = rxjs.operators;

let clickDomStream = fromEvent(document,"click");

//pipe is a method of Observable instance !!!!
let mappedClickDomStream = clickDomStream.pipe(
    map(event => event.clientX),
    map(x => x/10000)
);

let clickDomSubscription = mappedClickDomStream.subscribe(val => {
    console.log(val);
});

let source = [
    {name: "wangzhen", age: 32 },
    {name: "fanghua", age: 32},
    {name: "hechen", age: 2},
    {name: "woruo", age: 2},
];

let sourceStream = from(source).pipe(
    map( ({name}) => name.toUpperCase() ),
    scan( (acc, cur) => { return acc + cur + " ";}, "initial intro: ")
);

sourceStream.subscribe(console.log);

interval(1000)
    .pipe(
        seq => seq
    )
    // .subscribe(console.log);


let observable = interval(1000)
    .pipe( 
        mapTo('First'),
        merge(
            interval(1200).pipe( mapTo('second') ),
            interval(1500).pipe( mapTo('third') ),
        ),
    );

// every subscription to the same observable produces a unique execution.
let subscription_1 = observable.subscribe( (x) => console.log("1_ " + x))
let subscription_2 = observable.subscribe( (x) => console.log("2_ " + x));

setTimeout(function(){
    subscription_1.unsubscribe();
    subscription_2.unsubscribe();
}, 5000);
