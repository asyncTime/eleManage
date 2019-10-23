module.exports = {
    devServer:{
        open:false,
        host:"127.0.0.1",
        port:8081,
        /*
           // http://127.0.0.1:8081/ele/adminLog
        // http://127.0.0.1/adminlog
        * 1 http://127.0.0.1:8090*/
        // 反向代理。
        proxy:{
            // htttp://127.0.0.1:8081/ele/lala
            // 当访问的地址以/ele开头意味着，你要使用该代理
            "^/ele":{
                // 代理的服务器地址  http://127.0.0.1/adminLog
                target:"http://127.0.0.1",
                // 是否开启代理
                changeOrigin:true,// http://127.0.0.1/lala
                // 地址重写
                pathRewrite:{
                    "^/ele":""
                }
            }
        }
    }
}