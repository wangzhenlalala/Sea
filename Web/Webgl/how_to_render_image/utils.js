(function (global) {
    
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

    function resizeCanvas(canvas) {
        let width = canvas.clientWidth;
        let height = canvas.clientHeight;
        if(canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            return true;
        }
        return false;
    }

    window.utils = {
        createShader: createShader,
        createProgram: createProgram,
        resizeCanvas: resizeCanvas
    }
})(
    window
)