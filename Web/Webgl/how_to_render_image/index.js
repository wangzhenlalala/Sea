function main() {
    let CANVAS_WIDTH = 640;
    let CANVAS_HEIGHT = 320;
    let media = new Media();
    let canvas = document.querySelector('#root');
    let render = new Render({canvas: canvas, width: CANVAS_WIDTH , height: CANVAS_HEIGHT});
    let intervalHandler  = null;
    media.openCamera(CANVAS_WIDTH, CANVAS_HEIGHT)
        .then(() => {
            //chrome会用弹窗，提示用户，是否我们使用video
            // 如果用户直接关闭了提示的窗口，promise会被resolve, 而不是reject
            clearInterval(intervalHandler);
            intervalHandler = setInterval(() => {
                media.grabCameraFrame()
                    .then(bitmap => {
                        // let pixels = render.getImagePixels(bitmap);
                        // console.log(pixels);
                        render.render(bitmap);
                    })
                    .catch(err => {
                        clearInterval(intervalHandler);
                        console.log(err);
                    })
            }, 100)
        })
        
}

main();
