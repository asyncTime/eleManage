<template>

    <!--轮播图-->
    <div id="container">
        <mt-swipe class="entries" :auto="0">
            <mt-swipe-item v-for="item in shopTypeList" class="entry_wrap">
                <div v-for="info in item" class="foodentry" @click="$router.push('/shopType/'+info._id)">
                    <div class="img_wrap">
                        <img :src="'/ele/'+info.shopTypePic">
                    </div>
                    <span>{{info.shopTypeName}}</span>
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </div>





</template>
<!--可以使用全局的axios方法-->
<script>
    import axios from "axios";
    export default {
        name: "shop-type-swiper",
        data(){
            return {
                shopTypeList:[[]]
            }
        },
        methods:{
            async shopTypeSwiper(){
                const data = await axios.get("/shopTypeSwiper/30");
                this.shopTypeList = data.shopTypeList;
            }
        },
        mounted(){
            this.shopTypeSwiper();
        }

    }
</script>

<style scoped>
    .entries {
        background: #fff;
        height: 47.2vw;
        text-align: center;
        overflow: hidden;
    }
    .foodentry {
        width: 20%;
        float: left;
        position: relative;
        margin-top: 2.933333vw;
    }
    .foodentry .img_wrap {
        position: relative;
        display: inline-block;
        width: 12vw;
        height: 12vw;
    }
    .img_wrap img {
        width: 100%;
        height: 100%;
    }
    .foodentry span {
        display: block;
        color: #666;
        font-size: 0.32rem;
    }
</style>