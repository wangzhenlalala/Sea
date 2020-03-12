let container = null; 
let pushStateBtn = null; 
let backBtn = null;
let forwardBtn = null;

let count = 1;
let root = "/";
root = window.location.pathname.replace(/index\.html$/, "");

window.addEventListener("DOMContentLoaded", function() {
    container = document.querySelector('#container');
    pushStateBtn = document.querySelector('.push-state');
    backBtn = document.querySelector('.history-back');
    forwardBtn = document.querySelector('.history-forward');
    pushStateBtn.addEventListener("click", function() {
        let state = {
            count: count
        };
        let path = window.location.pathname + "#" + count++;
        // push state 不会触发onpopstate事件
        // 单击浏览器的 前进和后退按钮 会触发
        // js 调用history.back, history.forward 也会触发
        history.pushState(state, "Hello", path);
    });

    backBtn.addEventListener('click', function() {
        history.back();
    });

    forwardBtn.addEventListener('click', function() {
        history.forward();
    });
    console.log('dom content loaded');
});

window.addEventListener('load', function() {
    console.log('page loaded');
}); 

window.addEventListener('popstate', function(event) {
    console.log(window.location.href);
});

// 使用hash的方式实现感知路由的变化 轮询
let currentUrl = "";
function listenUrl() {
    let url = getUrl();
    if(currentUrl !== url) {
        // 路由变化了， 通知更新ui
        currentUrl = url;
        console.log("route changed", currentUrl);
    }
    setTimeout(listenUrl, 200);
}

function getUrl() {
    // http:://www.xxx.com/yyy?one=1#/user/profile
    // http:://www.xxx.com/yyy#/user/profile?one=1
    let href = window.location.href;
    let match = /#(.*)[?$]?/.exec(href);
    if(match) {
        return match[1];
    }
}
/**
 * 单页面路由的改变方式
 *  1. 用户的改变
 *      * 单击浏览器的 前进和后退按钮 (不会reload页面) [可以通过监听popstate事件来 得知 url的变化]
 *      * 直接修改地址栏中的url (会reload页面) [不用得知url变化了，一切重新来]
 *      - 单击刷新按钮 (同上)
 *      +++ 所以单页面的应用，使用history 路由模式，需要服务器的配置，把所有的路由有重定向到index.html页面
 * 
 *  2. app自身的改变
 *      [ 如果是这种情况，app自己可以触发 url 的变化事件 ]
 *      * 通过 history.back | history.forward
 *      * 通过 history.pushState(state, title, url)
 *          -- url 需要是 app 的root路径 + 路由的路径
 *      * 修改 window.location.href
 */

 /**
  * window.location.href = window.location.href
  *     window.location.href=window.location.href will not reload the page if there's an anchor (#) in the URL
  * 
  * window.location.reload();
*        window.location.reload() takes an additional argument skipCache 
*        so that with using window.location.reload(true) the browser will skip the cache and reload the page from the server. 
  *     window.location.reload(false) will do the opposite, and load the page from cache if possible.
  */