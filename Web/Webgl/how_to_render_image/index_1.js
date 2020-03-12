let rootCanvas = document.querySelector('#root');
const gl = rootCanvas.getContext('webgl');
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 240;

let vtGLSL = `
    // an attribute will receive data from a buffer
    attribute vec4 a_position;
    uniform vec2 u_resolution;
    
    // all shaders have a main function
    void main() {
        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = a_position.xy / u_resolution;
   
        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;
   
        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;
   
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
`

let fmGLSL = `
    // fragment shaders don't have a default precision so we need
    // to pick one. mediump is a good default. It means "medium precision"
    precision mediump float;

    // gl_FragColor is a special variable a fragment shader is responsible for setting
    void main() {
        gl_FragColor = vec4(1, 0, 0, 1.0);
    }
`

// gl.drawArrays or gl.drawElements which executes your shaders on the GPU

// * attributes and buffers
// * uniforms
// * texture
// * varyings
// WebGL only cares about 2 things: clip space coordinates and colors.

// compile those shaders to put them on the GPU

function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success) {
        return shader;
    }
    console.error('create shader failed: ', type, source);
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vShader, fShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(success) {
        return program;
    }
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function resizeCanvas(canvas, width, height) {
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;
}


resizeCanvas(rootCanvas, CANVAS_WIDTH, CANVAS_HEIGHT);

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vtGLSL);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fmGLSL);

// created a GLSL program on the GPU 
const program = createProgram(gl, vertexShader, fragmentShader);

let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
let resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

// Attributes get their data from buffers
/**
 * WebGL lets us manipulate many WebGL resources on global bind points. 
 * You can think of bind points as internal global variables inside WebGL. 
 * First you bind a resource to a bind point. 
 * Then, all other functions refer to the resource through the bind point. 
 */
let positions = [
    0, 0,
    CANVAS_WIDTH, CANVAS_HEIGHT/2,
    CANVAS_WIDTH / 2, CANVAS_HEIGHT,
];

// buffer lives in GPU
let positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// gl.bufferData then copies that data to the positionBuffer on the GPU.
// put data in buffer through bind point
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


/*******************************above code is for initialization and run only once ******************************************/

// 我们提供给顶点着色器的gl_Position的坐标是： 裁剪空间的 (clip space)

/**
 * We need to tell WebGL how to convert from the clip space values we'll be setting gl_Position to 
 * back into pixels, often called screen space. 
 * To do this we call gl.viewport and pass it the current size of the canvas.
 */
// This tells WebGL the -1 +1 clip space maps to 0 <-> gl.canvas.width for x and 0 <-> gl.canvas.height for y.
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

// bind the position buffer
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

let primitiveType = gl.TRIANGLES;
let buffer_offset = 0;
let count = 3; // will execute vertex shader count times;
gl.drawArrays(primitiveType, buffer_offset, count);