// draw rectangles
let rootCanvas = document.querySelector('#root');
const gl = rootCanvas.getContext('webgl');
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;
let program  = null;
let positionBuffer = null;
let colorUniformLocation = null;
let vtGLSL = `
    // an attribute will receive data from a buffer
    attribute vec2 a_position;
    uniform vec2 u_resolution;
    
    // all shaders have a main function
    void main() {

        // from pixels to 
        vec2 zeroToOne = a_position / u_resolution;

        // [0...1] -> [0...2]
        vec2 oneToTwo = zeroToOne * 2.0;

        // [0...2] -> [-1...1]]
        vec2 clipSpace = oneToTwo;

        // gl_Position is a special variable that a vertex shader is responsible for setting
        gl_Position = vec4(clipSpace, 0, 1);
    }
`

let fmGLSL = `
    // fragment shaders don't have a default precision so we need
    // to pick one. mediump is a good default. It means "medium precision"
    precision mediump float;
    uniform vec4 u_color;

    // gl_FragColor is a special variable a fragment shader is responsible for setting
    void main() {
        gl_FragColor = u_color;
    }
`
function init() {
    const vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, vtGLSL);
    const fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, fmGLSL);
    // created a GLSL program on the GPU 
    program = utils.createProgram(gl, vertexShader, fragmentShader);
}

function render() {
    let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    let resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    colorUniformLocation = gl.getUniformLocation(program, 'u_color');

    gl.viewport(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gl.clearColor(0, 1, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // tell webgl which shader program to execute
    gl.useProgram(program);

    // set uniform for current attive program
    gl.uniform2f(resolutionUniformLocation, CANVAS_WIDTH, CANVAS_HEIGHT);

    // we need to tell webgl how to take data from the buffer we setup above
    // and supply it to the attribute in the shader
    gl.enableVertexAttribArray(positionAttributeLocation);
    positionBuffer = gl.createBuffer();
    // bind the position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // glvertexAttribPointer之前，一定要绑定一个缓冲区
    let size = 2;                // 2 components per iteration
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.vertexAttribPointer(
        positionAttributeLocation,
        size, 
        type,
        normalize,
        stride,
        offset
    )
    drawRandomRectangels(30);
}

function randomNumber(count, from, to) {
    let result = [];
    let length = 0;
    let rnd = 0;
    while(count--) {
        length = Math.abs(to - from);
        rnd = Math.random() * length; // [0...length)
        result.push(from + rnd);
    }
    return result;
}


function drawRandomRectangels(count) {
    // x -> [-width/2 ... width/2]
    // y -> [-height/2 ... height/2]
    for(let i=0; i < count; i++) {
        let x = randomNumber(1, -CANVAS_WIDTH/2, CANVAS_WIDTH/2);
        let y = randomNumber(1, -CANVAS_HEIGHT/2, CANVAS_HEIGHT/2); 
        let width = randomNumber(1, 0, CANVAS_WIDTH);
        let height = randomNumber(1, 0, CANVAS_HEIGHT);
        drawRectangle(gl, x[0], y[0], width[0], height[0]);
    }
}

function drawRectangle(gl, x, y, width, height) {
    console.log(x, y, width, height)
    let posList = [
        x, y,
        x + width, y,
        x, y + height,
        x + width, y,
        x + width, y + height,
        x, y + height
    ];
    let color = randomNumber(3, 0, 1);
    gl.uniform4f(colorUniformLocation, color[0], color[1], color[2], 1.0); // 颜色为什么要是 [0...1)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(posList), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function main() {
    init();
    render();
}

main();
