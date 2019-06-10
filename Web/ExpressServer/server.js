const express = require('express');
const path = require("path")

//0.0.0.0, 127.0.0.1, can not be reached by my phone
//local lan address works
const server_configure = {
    address: '10.100.49.102',
    port: 8002
}

const app = express();

app.use("/root", express.static(path.join(__dirname, "../")));
app.listen(
    server_configure.port, //port 
    server_configure.address, //address [optionl]
    (error) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(`
            server is running with address: ${server_configure.address}, port: ${server_configure.port}
        `);
    }
)