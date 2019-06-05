

let clickDomStream = fromEvent(document,"click");

//pipe is a method of Observable instance !!!!
let mappedClickDomStream = clickDomStream.pipe(
    map(event => event.clientX),
    map(x => x/10000)
)
// .subscribe(val => {
//     console.log(val);
// });

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

let mergeAllOb = Observable.create((observer) => {
    observer.next(
        interval(1000).pipe(
            take(2),
            mapTo("First") )
    );
    observer.next(
        interval(1200).pipe(
            take(2),
            mapTo('second') ),
    );
    observer.next(
        interval(1800).pipe(
            take(3),
            mapTo('third') ),
    );
});

mergeAllOb
.pipe( mergeAll() )
.subscribe(console.log);

/** mergeAA */
let concurrentNum = 50;
let highOrderOb = fromEvent(btnEle, 'click').pipe(
    map( event => interval(1000))
);
let firstOrderOb = highOrderOb.pipe(
    mergeAll(concurrentNum)
);

firstOrderOb.subscribe( console.log );


// let zipFirst = interval(1000).pipe( take(4) );
// let zipSecond = interval(1500).pipe(
//     mapTo("Two"),
//     take(8)
// );
// let zipThree = zip(zipFirst, zipSecond);
// zipThree.subscribe( console.log );





/**
 * local master add in transform.js
 */


let clicksStreamBuffererBtn = fromEvent(bufferDom,'click');
let bufIntervalStream = interval(1000);
let bufferStream = bufIntervalStream.pipe(
    buffer(clicksStreamBuffererBtn)
);
bufferStream.subscribe( console.log );