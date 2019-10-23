const jwt  = require("jwt-simple");
const key = "*(&^(*&^(*&^(*&^(0990"
// 制作 payload:荷载
const token = jwt.encode({
    adminName:"admin",
    lastTime:Date.now()+10*60*1000
},key);
// + 士
console.log(token);
const results = jwt.decode(token,key);
console.log(results);