<template>
    <div class="index">
        <router-view></router-view>
        <TabBar></TabBar>
    </div>
</template>

<script>
    export default {
        name: "indexkkkkk",
        components:{
            TabBar:()=>import("@/components/TabBar")
        }
    }
</script>

<style scoped>
    .index {
        width: 100%;
        height: calc(100% - 45px);
    }
</style>