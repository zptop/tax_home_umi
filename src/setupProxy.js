// const proxy = require('http-proxy-middleware')
// module.exports = function(app){
//     app.use(
//         proxy('/api',{   //遇见/api前缀的请求，就会触发该代理配置
//             target:'http://dev-invoice.ship56.net',  //请求转发给谁
//             changeOrigin:true,             //控制服务器收到的请求头中host的值
//             pathRewrite:{'^/api':''}       //重写请求路径(必填)
//         })
//     )
// }