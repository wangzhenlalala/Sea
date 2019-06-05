/**
 * An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers.
 * While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable),
 * Subjects are multicast.
 */

/**
 * Every Subject is an Observable.
 *      Given a Subject, you can subscribe to it, providing an Observer, which will start receiving values normally.
 *
 * Every Subject is an Observer.
 *      It is an object with the methods next(v), error(e), and complete().
 *      To feed a new value to the Subject, just call next(theValue),
 *      and it will be multicasted to the Observers registered to listen to the Subject.
 */

 /**
  * A multicasted Observable uses a Subject under the hood to make multiple Observers see the same Observable execution.
  */

const subjectStream = new Subject();
const subjectMulti = new Subject();
const fromStream = from([1,2,3]);

//act as an observable
subjectStream.subscribe({
        next: (v) => console.log("from sub1: ", v)
});
subjectStream.subscribe({
    next: v => console.log("from sub2: ", v)
});

//act as an observer to consume values
subjectStream.next('emmited by subject: 1');
subjectStream.next('emmited by subject: 2');

fromStream.subscribe(subjectStream);


const connectableObservable = fromStream.pipe(
    multicast( subjectMulti )
);

const fromSubscription = connectableObservable.subscribe({
    next: v => console.log('from multicast observable: ', v)
});

//source.subscribe(subject);
connectableObservable.connect();

/**
 * BehaviorSubject: It stores the latest value emitted to its consumers, and whenever a new Observer subscribes, it will immediately receive the "current value" from the BehaviorSubject.
 * ReplaySubject: A ReplaySubject records multiple values from the Observable execution and replays them to new subscribers.
 * AsyncSubject: The AsyncSubject is a variant where only the last value of the Observable execution is sent to its observers, and only when the execution completes.
 */

 const behaviorSub = new BehaviorSubject(0); // initial value
 const replaySub = new ReplaySubject(3); // how many values to buffer
 const asyncSub = new AsyncSubject();