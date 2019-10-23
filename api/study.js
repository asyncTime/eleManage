

const arr = [1,2,3,4,5,6,7,8,9,10,11,12];
// 做成一个二维数组[[1,2,3,4,5,6,7,8,9,10],[11]]
const m = 10;// 每个子数组要显示10条
const n = Math.ceil(arr.length/m);// 计算共有几个子数组
const arr2 = [];
for(let i=0;i<n;i++){
    arr2.push([])
    let len = (i+1)*m>arr.length?arr.length:(i+1)*m;

    // let len = (i+1)*m;
    // if(len>arr.length)
    //     len = arr.length;
    for(let j = i*m;j<len;j++){
        arr2[i].push(arr[j]);
    }
}
console.log(arr2);















// const querystring = require("querystring");
// const url = require("url");
// const str = "http://www.163.com/lala?a=1&b=2&c=3";







// console.log(url.parse(str).pathname);
// console.log(url.parse(str).query);
//
//
// // 将对象转为urlencode
// console.log(querystring.stringify({a:1,b:3,d:5,f:10}));// a=1&b=3&d=5&f=10
//
// // 将urlencode转为对象
// console.log(querystring.parse("a=1&b=2&c=3"));// a=1&b=3&d=5&f=10



// function fn({userName}) {
//     console.log(userName);
// }
// fn()