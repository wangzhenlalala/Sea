let vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    uniform vec2 u_resolution;
    varying vec2 v_texCoord;

    void main() {
        vec2 zeroToOne = a_position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        v_texCoord = a_texCoord;
    }
`

let fragmentShaderSource = `
    precision mediump float;
    precision lowp float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;

    void main() {
        // 把RGBA的格式转换成BRGA的格式
        // gl_FragColor = texture2D(u_image, v_texCoord).brga;
        gl_FragColor = texture2D(u_image, v_texCoord);
    }
`
class Render {
    constructor(props) {
        let width  = props.width || 640;
        let height = props.height || 360;
        let canvas = props.canvas || new OffscreenCanvas(width, height);
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl = canvas.getContext('webgl2');
        this.program = null;
        this.vertexBuffer = null;
        this.texCoordBuffer = null;
        this.texture = null;
        
        this.initProgram(vertexShaderSource, fragmentShaderSource);
    }

    initProgram(vSource, fSource) {
        let gl = this.gl;

        this.program = Render.createProgram (
            gl,
            Render.createShader(this.gl, gl.VERTEX_SHADER, vSource),
            Render.createShader(this.gl, gl.FRAGMENT_SHADER, fSource),
        );

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        this.setRectangle(gl, 0, 0, gl.canvas.width, gl.canvas.height);
        
        this.texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0.0,  0.0,
            1.0,  0.0,
            0.0,  1.0,
            0.0,  1.0,
            1.0,  0.0,
            1.0,  1.0,
        ]), gl.STATIC_DRAW);

        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        gl.useProgram(this.program);
        let positionLocation = gl.getAttribLocation(this.program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.vertexAttribPointer(
            positionLocation, 2, gl.FLOAT, false, 0, 0
        );

        let texcoordLocation = gl.getAttribLocation(this.program, "a_texCoord"); 
        gl.enableVertexAttribArray(texcoordLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.vertexAttribPointer(
            texcoordLocation, 2, gl.FLOAT, false, 0, 0
        );
        let resolutionLocation = gl.getUniformLocation(this.program, "u_resolution");
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    }

    getImagePixels(imageData) {
        let gl = this.gl;
        let pixelBuffer = new Uint8Array( gl.canvas.width * gl.canvas.height * 4);
        this.render(imageData);
        // can not read RGB data
        gl.readPixels(
            0, 0,
            gl.canvas.width, gl.canvas.height,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            pixelBuffer,
            0
        );
        return pixelBuffer;
    }

    setRectangle(gl, x, y, width, height) {
        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + height;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2,
        ]), gl.STATIC_DRAW);
    }

    static createShader(gl, type, source) {
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
    
    static createProgram(gl, vShader, fShader) {
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

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl.viewport(0, 0, width, height);
    }

    render(imagedata) {
        let gl = this.gl;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this.program);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(
            gl.TEXTURE_2D, 
            0, 
            gl.RGB, 
            gl.canvas.width, 
            gl.canvas.height,
            0,
            gl.RGB, 
            gl.UNSIGNED_BYTE, 
            imagedata 
        );
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}