console.log('index.js is here');

axios.get('/externals/xx.csv', {
    headers: {
        'Content-Type': 'text/csv'
    }
}).then(function(response) {
    let headers = response.headers;
    let filename = headers['content-disposition']

    
    var data = response.data;
    console.log('====================== 原始数据 ================')
    console.log(data); //原始的文件数据
    data = data.split('\n'); //把文件的每行，分割开，数组的每个元素，是一行数据
    console.log('====================== 每一行的数据 ================')
    console.log(data)
    var firstLine = data[0];
    var elements = firstLine.split(','); //把每行的数据，分割开来
    console.log('====================== 第一行的各个数据项 ================')
    console.log(elements);
}).catch(function(error){
    console.log(error)
})