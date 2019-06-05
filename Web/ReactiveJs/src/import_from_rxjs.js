// public pipe(operations: ...*): Observable
// Used to stitch together functional operators into a chain.
let {
    // create,
    Observable,
    Subject,
    BehaviorSubject,
    ReplaySubject,
    AsyncSubject,
    fromEvent,
    of,    //(1,3,5) not array
    range, // (1,10)
    from,  // Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object. // Converts almost anything to an Observable.
    interval, // Emit sequence of values at 1 second interval
    timer, // timer(delay, interval)
    empty,
    throwError, //Creates an Observable that emits no items to the Observer and immediately emits an error notification.
    defer,
    // pipe,
    // map  wrong
    zip,
    merge,
    concat,
    combineLatest,
} = rxjs;

let {
    max, // when source Observable completes it emits a single item
    map,
    mapTo,
    scan,
    take,
    mergeAll,
    concatAll,
    combineAll,
    zipAll,
    startWith,
    buffer,
    multicast,
} = rxjs.operators;