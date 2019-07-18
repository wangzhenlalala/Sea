self.addEventListener('message', function(e){
    self.postMessage(e.data);
});

//stop this worker
// self.close();