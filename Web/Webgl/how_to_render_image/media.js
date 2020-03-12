function Media() {
    this.videoStream = null;
    this.videoTrack = null;
    this.imageCapture = null;
}

Media.prototype = {
    getVideoStream() {
        return this.videoStream;
    },

    openCamera(width, height) {
        return navigator.mediaDevices.getUserMedia({
            video: {
                width: width,
                height: height 
            },
        })
        .then(stream => {
            console.log("stream", stream);
            this.videoStream = stream;
            this.videoTrack = stream.getVideoTracks()[0];
            return stream;
        })
        .catch(error => {
            console.log(error);
        });
    },

    grabCameraFrame() {
        if(!this.videoTrack) {
            return Promise.reject("can not find video track");
        }
        if(!this.imageCapture || !this.imageCapture instanceof ImageCapture) {
            this.imageCapture = new ImageCapture(this.videoTrack);
        }
        return this.imageCapture.grabFrame()
            .then(imagebitmap => imagebitmap)
            .catch(error => error);
    },
}
