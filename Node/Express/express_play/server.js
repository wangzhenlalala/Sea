
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let compression  = require('compression')
let fs = require('fs');
let path = require('path');
let cmd = require('node-cmd');
let multer = require('multer');
let upload = multer({
   dest: 'uploads/' 
})
const PORT  = 9999;

const TOKEN = 'i-am-token'
app.use(compression()); // use some middleware and compress all outgoing responses
app.use(bodyParser.json()); //到http body中的content-type为application/json的时候，自动parse json字符串
app.use(bodyParser.urlencoded({ extended: false })); //解析 request 中 body的 urlencoded字符 content-type为application/x-www-form-urlencoded格式
app.use(cookieParser()); //自动解析request header中的cookie,并且为req添加到cookies属性

//express框架的静态文件的代理
app.use('/', express.static(path.resolve(__dirname, 'static/pages')));
app.use('/images', express.static(path.resolve(__dirname,'static/images')));
app.use('/scripts', express.static(path.resolve(__dirname,'static/scripts')));
app.use('/style', express.static(path.resolve(__dirname,'static/style')));
app.use('/externals', express.static(path.resolve(__dirname,'static/externals')));

app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin", `http://localhost:${PORT}`); //必须要指定端口号
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true"); //允许client发送cookie
    next(); 
});

app.options("*",function(req,res){
    res.status(200).end();
})

app.get('/', function(req, res){
    //发送html页面
    let filePath = path.resolve(__dirname, "./static/pages", 'index.html'); //absolute path
    res.cookie('className', 'global', {
       path: '/',
       maxAge: 10000000 
    });

    res.writeHead(200,{
        "Content-Type": 'text/html'
    }); //node itself
    
    // not necessarily to be absolute path;
    //no res.end() is needed !!!
    fs.createReadStream(filePath).pipe(res); 

    // res.sendFile( filePath ); //express augmented: absolute path is required
});
app.post('/', function(req, res){
    res.status(200).end('post root ok\n');
})
app.post('/upload',upload.single('avatar'), function(req, res){
    console.log(req.file);
    // fs.readFile(path.resolve(__dirname,req.file.path), function(err, data){
    //     if(err){
    //         console.log(err);
    //         res.status(500).end('read error');
    //     }else{
    //         //写入文件的时候，目标目录要已经存在；不然会报错 ENOENT;
    //         let pathWrite = path.resolve(__dirname, 'download/',req.file.originalname);
    //         fs.writeFile(pathWrite, data, function(err){
    //             if(err){
    //                 console.log(err);
    //                 res.status(500).end('write error');
    //             }
    //             cmd.run('rm -rf uploads/*');
    //             res.status(200).end();
    //         })
    //     }
    // })
    let read = fs.createReadStream(req.file.path);
    let write = fs.createWriteStream(path.resolve(__dirname,'download/', req.file.originalname));
    read.pipe(write);
    cmd.run('rm -rf uploads/*');
    res.status(200).end();
})
app.post('/login',function(req,res){
    // res.cookie('token','abceefg',{domain: 'localhost:9876',path: '/'});  //how server set cookie Set-Cookie Header
    let {mobile,password} = req.body;
    let timer = setTimeout(function(){
        clearTimeout(timer);
        let codeInfo = password == '111111' ? '成功' : '账号或密码错误'
        let code = password == '111111' ? 200 : 001;
        res.status(200).json({
            code,
            codeInfo,
            data: {
                token:  TOKEN,
                userinfo: {
                    userId: '22222',
                    username: '孙悟空',
                    avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2646393040,4222208154&fm=26&gp=0.jpg'
                }
            }
        });
    },3000);
    
})

app.post('/book/merchantinfo', function(req, res){
    
    let {merchantId} = req.body;
    console.log(req.cookies,'cookies');
    res.status(200).json({
        "merchantId": merchantId,
        "platName": "艺朝艺夕",
        "logo": "http://tx.haiqq.com/uploads/allimg/170507/0141505T7-2.jpg",
        "slogan": "让我们来猎杀那些处在黑暗中的人们"
    });
})

app.post('/auth/sendsms', function(req,res){
    res.status(200).json({
        code: '200',
        codeInfo: '成功',
        data: {}
    })
})

app.post('/auth/quicklogin', function(req, res){
    let {mobile,vcode} = req.body;
    let timer = setTimeout(function(){
        clearTimeout(timer);
        let codeInfo = vcode == '11' ? '成功' : '账号或密码错误'
        let code = vcode == '11' ? 200 : 001;
        res.status(200).json({
            code,
            codeInfo,
            data: {
                token:  TOKEN,
                userinfo: {
                    userId: '22222',
                    username: '孙悟空',
                    avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2646393040,4222208154&fm=26&gp=0.jpg'
                }
            }
        });
    },3000);
})

app.post("/book/booktypelist", function(req, res){
    let { merchantId } = req.body;
    res.status(200).json({
        code: 200,
        codeInfo: '成功',
        data : [
            {
                
            }
        ]
    })
});

app.use("*", (req, res) => {
    res.status(404).end('sorry not found');
} );

let server = app.listen(PORT,function(){
    console.log( server.address() )
    let {address, port }= server.address();

    console.log('/******* ok ******/');
    console.log(`listening at : [ ${address} ] : [ ${port} ]`)
})
