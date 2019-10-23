<template>
    <div class="home">
        <div class="header" @click="$router.push('/location')">
            <div class="address_map">
                <i class="iconfont iconicon-dibiao"></i>
                <span>{{$store.state.location.address}}</span>
                <i class="iconfont iconsanjiaojiantou1"></i>
            </div>
        </div>
        <div class="search_wrap" @click="$router.push('/search')">
            <div class="shop_search">
                <i class="iconfont iconxingtaiduICON_sousuo--"></i>
                搜索饿了么商家 商品名称
            </div>
        </div>
        <ShopTypeSwiper></ShopTypeSwiper>
        <div class="shoplist-title">推荐商家</div>
        <TopShopList></TopShopList>
    </div>

</template>

<script>
    export default {
        name: "home",
        mounted(){
            if(this.$store.state.location.address === "正在为您定位中……"){
                this.$store.dispatch("geolocation");
            }
            // AMap.plugin('AMap.Geolocation', function() {
            //     var geolocation = new AMap.Geolocation({
            //         // 是否使用高精度定位，默认：true
            //         enableHighAccuracy: true,
            //         // 设置定位超时时间，默认：无穷大
            //         timeout: 10000,
            //     })
            //
            //     geolocation.getCurrentPosition()
            //     AMap.event.addListener(geolocation, 'complete', onComplete)
            //     AMap.event.addListener(geolocation, 'error', onError)
            //
            //     function onComplete (data) {
            //         // data是具体的定位信息
            //         console.log(1111111111,data);
            //     }
            //
            //     function onError (data) {
            //         // 定位出错
            //         console.log(222222222);
            //     }
            // })
        },
        components:{
            ShopTypeSwiper:()=>import("@/components/ShopTypeSwiper"),
            TopShopList:()=>import("@/components/TopShopList")
        }
    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
    }
    .header,
    .search_wrap {
        background-color: #009eef;
        padding: 10px 16px;
    }
    .header .address_map {
        color: #fff;
        font-weight: bold;
    }
    .address_map i {
        margin: 0 3px;
        font-size: 18px;
    }
    .address_map span {
        display: inline-block;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .search_wrap .shop_search {
        /* margin-top: 10px; */
        background-color: #fff;
        padding: 10px 0;
        border-radius: 4px;
        text-align: center;
        color: #aaa;
    }

    .search_wrap {
        position: sticky;
        top: 0px;
        z-index: 999;
        box-sizing: border-box;
    }

    .fixedview {
        width: 100%;
        position: fixed;
        top: 0px;
        z-index: 999;
    }



    /* 推荐商家 */
    .shoplist-title {
        display: flex;
        align-items: flex;
        justify-content: center;
        height: 9.6vw;
        line-height: 9.6vw;
        font-size: 16px;
        color: #333;
        background: #fff;
    }
    .shoplist-title:after,
    .shoplist-title:before {
        display: block;
        content: "一";
        width: 5.333333vw;
        height: 0.266667vw;
        color: #999;
    }
    .shoplist-title:before {
        margin-right: 3.466667vw;
    }
    .shoplist-title:after {
        margin-left: 3.466667vw;
    }

    .fixedview {
        width: 100%;
        position: fixed;
        top: 0px;
        z-index: 999;
    }
</style>