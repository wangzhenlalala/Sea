/**
1. ArrayBuffer
2. Blob
3. BufferView
4. number.toString(进制)
5. parseInt(number, 进制)
6. DOMString: is UTF-16
7. URL.createObjectURL(blob)
8. TypedArray
**/

// browser will show ‘王镇’
//nodejs 显示乱码
var buf = new ArrayBuffer(4);
var viewBuf = new Uint16Array(buf);

viewBuf[0] = parseInt("0x738b", 16);
viewBuf[1] = parseInt("0x9547", 16);

for(let i=0; i < viewBuf.length; i++){
	console.log(String.fromCharCode(viewBuf[i]));
}

/************** A Blob object represents a file-like object of immutable, raw data. ***********/

var blobStr1 = "*{color: red;}";
var blobStr2 = "*{background: pink;}";
var blob = new Blob(
		[blobStr1, blobStr2], //DOMString, ArrayBuffer, BufferView, Blob
		{type: "text/css", endings: 'transparent'} //type: MIME type
	);
var link = document.createElement('link');
link.rel = "stylesheet";
link.href = window.URL.createObjectURL(blob);
document.head.appendChild(link);
