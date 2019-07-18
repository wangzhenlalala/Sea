/**
 *. Messages passed between the main page and workers are copied, not shared.
 *. Chrome doesn't let you load web workers when running scripts from a local file. 
 *. Move pure computational work to Web Workers.
 */

let sayBtn = document.querySelector('.sayToWorker');
let worker = new Worker('./doWork.js');
let times = 0;

sayBtn.addEventListener('click', function(){
    postMessageToWorker(`hello worker: ${++times}`);
})

function postMessageToWorker(msg){
    worker.postMessage(msg);
}

function receiveMessageFromWorker(msg){
    console.log(msg);
}
//receive message from worker
worker.addEventListener('message', receiveMessageFromWorker );
//stop worker;
//worker.terminate();