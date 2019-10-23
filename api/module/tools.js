const md5 = require("md5");
const querystring = require("querystring");
const request = require("request");
const jwt = require("jwt-simple");
const key = "*&)(*&(*&(*&";
module.exports.getNowTime = function() {
    const data = new Date();
    return data.getFullYear()+"-"+
        (data.getMonth()+1).toString().padStart(2,"0")+"-"+
        (data.getDate()).toString().padStart(2,"0")+" "+
        (data.getHours()).toString().padStart(2,"0")+":"+
        (data.getMinutes()).toString().padStart(2,"0")+":"+
        (data.getSeconds()).toString().padStart(2,"0");
}
// res响应对象
module.exports.json = function (res,ok=-1,msg="网络连接错误") {
    res.json({
        ok,
        msg
    })
}
module.exports.md5 = function (context) {
    const str = "ele.com(*&^(*&^(*&";
    return md5(context+str);
}

// 解密 token
module.exports.deToken =function (token) {
    try{
        const info = jwt.decode(token,key);
        if(info.lastTime > Date.now()){
            return {
                ok:1,
                msg:"正常"
            }
        }else{
            return {
                ok:3,
                msg:"toke过期"
            }
        }
    }catch (err){
        return {
            ok:2,// 异常
            msg:"token异常"
        }
    }
}
// 生成token
module.exports.enToken = function (payload) {
    return jwt.encode({
        ...payload,
        ...{
            lastTime:Date.now()+1000*60*60*24
        }
    },key)
}
// 求两数之间的随机数
module.exports.getRandom = function (min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

// 发送验证码
module.exports.sendCode = function (mobile,randomNum) {
    return new Promise((resolve,reject)=>{
        let url = "http://v.juhe.cn/sms/send";
        const params = {
            mobile,
            tpl_id:"164473",
            tpl_value:"#code#="+randomNum,
            key:"b3549c453ee620a0ad521c035d2f2048"
        }
        url = url +"?" + querystring.stringify(params);
        request(url,function (err,response,body) {
            if(!err && response.statusCode === 200){
               resolve();
            }else{
               reject();
            }
        })
    })


    //http://v.juhe.cn/sms/send?mobile=手机号码&tpl_id=短信模板ID&tpl_value=%23code%23%3D654654&key=
}
// const random = module.exports.getRandom(100000,999999)
// module.exports.sendCode("18435202569",module.exports.getRandom());
// console.log(module.exports.getRandom(1,3));