const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require('body-parser');
const db = require("./module/db");
const tools = require("./module/tools");
const {upPic} = require("./module/upPic");
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname+"/upload"));
app.get("/shopBySearch",async function (req,res) {
    setTimeout(async ()=>{
        let keyword = req.query.keyWord || "";
        const whereObj = {};
        if(keyword.length>0){
            whereObj.shopName = new RegExp(keyword);
            console.log(keyword,whereObj);
            const shopList = await db.find("shopList",{whereObj});
            res.json({
                ok:1,
                shopList
            })
        }else{
            res.json({
                ok:1,
                shopList:[]
            })
        }
    },2000)


})

// 获得店铺类别，为二维数组。 [[{},{},{},{}],[],[]]
app.get("/shopTypeSwiper/:num",async function (req,res) {
    // 总条数
    //前端是怎么把值传过来的
    const limit = req.params.num/1;
    const results = await  db.find("shopTypeList",{
        limit,
        sort:{shopTypePic:-1}
    });

    const shopTypeList  = [];
    const m = 10;
    const n = Math.ceil(results.length/10);
    for(let i = 0;i<n;i++){
        shopTypeList.push([]);
        for(let j=i*m;j<((i+1)*m>results.length?results.length:(i+1)*m);j++){
            shopTypeList[i].push(results[j]);
        }
    }





    // console.log(shopTypeList);
    res.json({
        ok:1,
        shopTypeList
    })

})
// 根据店铺类别ID找到店铺。
app.get("/getShopByTypeId/:shopTypeId",async function (req,res) {
    let shopList = await db.find("shopList",{
        whereObj:{
            shopTypeId:mongodb.ObjectId(req.params.shopTypeId)
        },
        sort:{
            shopPic:-1
        }
    })
    res.json({
        ok:1,
        shopList
    })
});

// 推荐商家
app.get("/getTopShopList",async function (req,res) {
    const results = await db.getPageInfo("shopList",{
        pageIndex:(req.query.pageIndex || 1)/1,
        sort:{"shopPic":-1},
        resultsName:"shopList",
        limit:8,
    });
    setTimeout(()=>{
        res.json(results)
    },1000)

});



app.post("/adminLogin", function (req, res) {
    /*
    * 1、先接收数据
    * 2、去数据库当中根据条件找到数据是否存在
    * 3、更新一下登陆的时间
    * 4、增加一条登陆日志
    * 5、登陆成功以后返回结果*/
    const {adminName, passWord} = req.body;
    db.findOne("adminList", {
        adminName,
        passWord: tools.md5(passWord)
    }).then(async (adminInfo) => {
        if (adminInfo) {
            // 存在 更新登陆的时间
            await db.updateOne("adminList", {
                _id: adminInfo._id
            }, {
                $set: {
                    loginTime: Date.now()
                }
            })
            // 增加一条登陆信息
            await db.insertOne("adminLog", {
                adminId: adminInfo._id,
                adminName: adminInfo.adminName,
                createTime: Date.now()
            })

            res.json({
                ok: 1,
                adminName,
                token: tools.enToken({
                    adminName
                })
            })
        } else {
            tools.json(res, -1, "管理员账号或密码错误")
        }

    }).catch(() => {// 异常
        tools.json(res);
    })

});
/*************************test*******************************************/
app.post("/addNews", function (req, res) {
    // console.log(1111111111);
    db.insertOne('newsList', {
        newsTitle: req.body.newsTitle,
        newsContext: req.body.newsContext,
        createTime: Date.now(),
        isCollect: false
    }).then(() => {
        res.json({
            ok: 1,
            msg: "添加成功"
        })
    })
})
app.get("/newsInfo/:id", async function (req, res) {
    const newsInfo = await db.findOneById("newsList", req.params.id);
    res.json({
        ok: 1,
        newsInfo
    })
})
app.put("/newsInfo/:id", async function (req, res) {
    const id = req.params.id;
    const isCollect = !req.body.isCollect;
    await db.updateOneById("newsList", id, {
        $set: {
            isCollect
        }
    })
    res.json({
        ok: 1,
        msg: "修改成功"
    })
})
app.get("/myNewsList", function (req, res) {
    db.find("newsList", {
        whereObj: {
            isCollect: true
        },
        sort: {createTime: -1}
    }).then(newsList => {
        res.json({
            ok: 1,
            newsList
        })
    })
})
app.get("/newsList", function (req, res) {
    db.find("newsList", {sort: {createTime: -1}})
        .then(newsList => {
            res.json({
                ok: 1,
                newsList
            })
        })
        .catch(err => {
            res.json({
                ok: -1,
                msg: "网络连接错误"
            })
        })
})


/**********************************************************************/
app.post("/sendCode",async function (req,res) {
    /*思路：
    * 1、要判断之前是否发送过
    *   1、发送过
    *       1、验证发送过的时间是否过期（60秒）
    *           1、过期
    *               重新发送
    *           2、未过期
    *               提示验证码未过期，请稍后再发
    *   2、未发送过
    *       直接发送。
    *   */
    const phoneId = req.body.phoneId;
    // 得到该手机号的验证码信息
    const codeInfo = await  db.findOne("phoneCode",{phoneId});
    let code = tools.getRandom(100000,999999);
    if(codeInfo){
        //发送过
        if((Date.now()-codeInfo.addTime)/1000>60){
            // 过期，发送验证码

            await db.updateOne("phoneCode",{phoneId},{
                $set:{
                    code,
                    addTime:Date.now()
                }
            });
            tools.sendCode(phoneId,code).then(()=>{
                res.json({
                    ok:1,
                    msg:"成功"
                })
            }).catch(()=>{
                res.json({
                    ok:-1,
                    msg:"发送失败"
                })
            })
        }else{
            // 未过期
            res.json({
                ok:-1,
                msg:"请稍后再发"
            })
        }
    }else{
        // 未发送过，发送验证码
        await db.insertOne("phoneCode",{
            code,
            phoneId,
            addTime:Date.now()
        })
        tools.sendCode(phoneId,code)
            .then(()=>tools.json(res,1,"成功"))
            .catch(()=>tools.json(res,-1,"发送失败"))
    }

});
app.post("/userLogin",async function (req,res) {
    let {phoneId,code} = req.body;
    code = code/1;
    const info = await db.findOne("phoneCode",{
        phoneId,
        code,
    })
    if(info){
        if((Date.now()-info.createTime) > 20*60*1000){
            tools.json(res,-1,"验证码过期")
        }else{
            // db
            res.json({
                ok:1,
                phoneId,
                token:tools.enToken({
                    phoneId
                })
            })
        }
    }else tools.json(res,-1,"登陆失败。有可能是验证码或手机号错误")
})
/**********************************************************************/
app.all("*", function (req, res, next) {
    const {ok, msg} = tools.deToken(req.headers.authorization);
    if (ok === 1) {
        next();
    } else {
        res.json({
            ok,
            msg
        })
    }
})
app.post("/shopType",async function (req,res) {
    const data = await upPic(req,"shopTypePic");
    try{
        await db.insertOne("shopTypeList",{
            shopTypeName:data.params.shopTypeName,
            shopTypePic:data.newPicName
        });
        tools.json(res,1,"添加店铺类别成功");
    }catch (err){
        tools.json(res);
    }
});
app.get("/allShopType",function (req,res) {
    db.find("shopTypeList",{
        sort:{shopTypePic:-1}
    }).then(shopTypeList=>{
        res.json({
            ok:1,
            shopTypeList
        })
    })
})
app.get("/shopType",async function (req,res) {
    const results = await db.getPageInfo("shopTypeList",{
        pageIndex:(req.query.pageIndex || 1)/1,
        sort:{"shopTypePic":-1},
        resultsName:"shopTypeList",
        limit:2
    });
    res.json(results)
});
app.post("/shop", async function (req, res) {
    const data = await upPic(req,"shopPic");
    try{
        const shopTypeInfo = await db.findOneById("shopTypeList",data.params.shopTypeId);
        await db.insertOne("shopList",{
            shopName:data.params.shopName,
            shopTypeId:shopTypeInfo._id,
            shopTypeName:shopTypeInfo.shopTypeName,
            shopPic:data.newPicName
        });
        tools.json(res,1,"添加店铺类别成功");
    }catch (err){
        tools.json(res);
    }
})
app.get("/shop",async function (req,res) {
    const whereObj = {};
    if(req.query.keyWord.length>0){
        whereObj.shopName = new RegExp(req.query.keyWord)
    }
    const results = await db.getPageInfo("shopList",{
        pageIndex:(req.query.pageIndex || 1)/1,
        sort:{"shopPic":-1},
        resultsName:"shopList",
        limit:2,
        whereObj
    });
    res.json(results)
});
app.get("/adminLog", async function (req, res) {
    const info = await  db.getPageInfo("adminLog",{
        pageIndex:(req.query.pageIndex || 1)/1,
        sort:{
            createTime:-1
        },
        limit:6
    });
    res.json(info);
    // const pageSize = 5;// 每页显示的条数
    // let pageIndex = (req.query.pageIndex || 1) / 1;
    // const count = await db.count("adminLog", {});
    // let pageSum = Math.ceil(count / pageSize);// 总页数
    // if (pageSum < 1) pageSum = 1;
    // if (pageIndex < 1) pageIndex = 1;
    // if (pageIndex > pageSum) pageIndex = pageSum;
    // const adminLog = await  db.find("adminLog", {
    //     skip: (pageIndex - 1) * pageSize,
    //     limit: pageSize,
    //     sort: {
    //         createTime: -1
    //     }
    // })
    //
    // setTimeout(()=>{
    //     res.json({
    //         ok: 1,
    //         adminLog,
    //         pageIndex,
    //         pageSum,
    //         count
    //     })
    // },1000)


})
app.get("/lala", function (req, res) {
    res.json({
        ok: 3
    })
})
// 根据店铺类别ID查找店铺列表。
app.get("/shopListByTypeId/:shopTypeId",async function (req,res) {
    const shopTypeId = req.params.shopTypeId;
    const shopList = await db.find("shopList",{
        whereObj:{
            shopTypeId:mongodb.ObjectId(shopTypeId)
        },
        sort:{
            shopPic:-1
        }
    });
    res.json({
        ok:1,
        shopList
    })
})
app.post("/goodsType",async function (req,res) {
    const shopInfo = await db.findOneById("shopList",req.body.shopId);

    await db.insertOne("goodsTypeList",{
        goodsTypeName:req.body.goodsTypeName,
        shopId:shopInfo._id,
        shopName:shopInfo.shopName,
        shopTypeId:shopInfo.shopTypeId,
        shopTypeName:shopInfo.shopTypeName,
        createTime:Date.now()
    })

    res.json({
        ok:1,
        msg:"插入数据成功"
    })
})
/***********************************************************************/

app.listen(80, function () {
    console.log("success");
})