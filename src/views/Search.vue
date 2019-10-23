<template>
    <div class="search">
        <!--头部-->
        <header class="header">
            <!-- 左侧返回按钮 -->
            <div class="header-button is-left">
                <i class="iconfont iconfanhui"></i>
                <button @click="$router.push('/')">返回</button>
            </div>
            <!-- 标题 -->
            <h1 class="header-title">搜索</h1>
        </header>

        <div class="search_header">
            <form class="search_wrap">
                <i class="iconfont iconxingtaiduICON_sousuo-- fa-search"></i>
                <input type="text" v-model="keyWord"  placeholder="输入商家,商品信息">
                <button @click.prevent="shopBySearch">搜索</button>
            </form>
        </div>

        <div class="shop">
            <div v-if="shopList.length===0" class="empty_wrap">
                <img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt>
                <div class="empty_txt">
                    <h4>附近没有搜索结果</h4>
                    <span>换个关键词试试吧</span>
                </div>
            </div>
            <div v-else>
                <ul class="search_list">
                    <li v-for="item in shopList" @click="$router.push({name:'shop',query:{id:item._id}})">
                        <img :src="'/ele/'+item.shopPic">
                        <i class="fa fa-search"></i>
                        <div class="shopitem">
                            <span class="title">{{item.shopName}}</span>
                            <span class="rating">评分100</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import  axios from "axios";
    export default {
        name: "search",
        data(){
            return {
                keyWord:"",
                shopList:[]
            }
        },
        methods:{
            async shopBySearch(){
               const {shopList} = await axios.get("/shopBySearch",{
                   params:{
                       keyWord:this.keyWord
                   }
               });
               this.shopList = shopList;
            }
        }
    }
</script>

<style scoped>
    /******************search************************************************/
    .search {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
    }
    .search_header {
        margin-top: 45px;
        background: #fff;
        padding: 0 4.266667vw;
    }
    .search_header .search_wrap {
        padding: 2.933333vw 2.933333vw 2.933333vw 0;
        display: flex;
        align-items: center;
        position: relative;
    }
    .search_wrap .fa-search {
        width: 2.933333vw;
        height: 2.933333vw;
        color: #888;
        position: absolute;
        top: 4.6666666vw;
        left: 2.933333vw;
    }
    .search_wrap input {
        flex-grow: 1;
        border-radius: 0.266667vw;
        background-color: #f8f8f8;
        padding: 1.733333vw 4vw 1.733333vw 8.8vw;
        color: #666;
        outline: none;
        border: none;
    }
    .search_wrap button {
        outline: none;
        border: none;
        color: #333;
        font-size: 0.426667rem;
        background: #fff;
        font-weight: 700;
        margin-left: 2.933333vw;
        font-size: 14px;
    }
    /****************搜索结果************************************************/

    .shop {
        width: 100%;
        height: calc(100% - 100px);
        overflow: auto;
    }

    .empty_wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #fff;
        display: flex;
        justify-content: center;
    }
    .empty_wrap img {
        width: 35vw;
        height: 35vw;
    }
    .empty_txt h4 {
        color: #666;
        font-size: 1rem;
        margin: 12vw 0 2vw 0;
    }
    .empty_txt span {
        color: #999;
        font-size: 0.8rem;
    }



    .search_list {
        background: #fff;
    }
    .search_list li {
        padding: 0 4.266667vw;
        display: flex;
        height: 13.933333vw;
        align-items: center;
    }
    .search_list li img {
        width: 6.4vw;
        height: 6.4vw;
        margin-right: 4.266667vw;
        border-radius: 0.133333vw;
    }
    .shopitem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        height: 13.933333vw;
        border-bottom: 1px solid #e3e3e3;
    }
    .shopitem .title {
        display: inline-block;
        max-width: 56vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.888rem;
        color: #333;
        margin-right: 0.8vw;
    }
    .shopitem .rating {
        color: #999;
        font-size: 0.8rem;
    }

    .search_list li i {
        margin-right: 4.266667vw;
        color: #888;
    }
    /****************头部*******************************************/
    .header {
        align-items: center;
        background-color: #009eef;
        box-sizing: border-box;
        color: #fff;
        display: flex;
        font-size: 16px;
        height: 45px;
        line-height: 1;
        padding: 0 10px;
        position: relative;
        text-align: center;
        white-space: nowrap;
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 99;
    }

    .header-button button {
        background-color: transparent;
        border: 0;
        box-shadow: none;
        color: inherit;
        display: inline-block;
        padding: 0;
        font-size: inherit;
        outline: none;
    }
    .header-title {
        flex: 1;
    }
    .is-left {
        text-align: left;
    }
    /*.is-right {*/
    /*text-align: right;*/
    /*}*/
</style>