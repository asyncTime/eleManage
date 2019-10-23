// md5:加密的方式
const md5 = require("md5");
// 盐料
// const str = "123456if(1===1){console.log('iloveyou')}";
// console.log(md5(str))

const passWord = "123456";
const str = "ele.com(*&^(*&^(*&";
console.log(md5(passWord+str))
