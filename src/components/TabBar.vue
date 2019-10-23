<template>
    <div class="tabbar">
        <router-link class="tab-item" active-class="is-selected" exact to="/">
            <div class="tab-item-icon"><i class="iconfont iconSSS"></i></div>
            <div class="tab-item-label">首页</div>
        </router-link>
        <router-link class="tab-item"  active-class="is-selected" to="/order">
            <div class="tab-item-icon"><i class="iconfont iconicon-test1"></i></div>
            <div class="tab-item-label">订单</div>
        </router-link>
        <router-link class="tab-item"  active-class="is-selected" to="/my">
            <div class="tab-item-icon"><i class="iconfont iconicon-test"></i></div>
            <div class="tab-item-label">我的</div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "tab-bar"
    }
</script>

<style scoped>
    .tabbar {
        height: 45px;
        box-sizing: border-box;
        width: 100%;
        position: fixed;
        bottom: 0;
        background-image: linear-gradient(
                180deg,
                #d9d9d9,
                #d9d9d9 50%,
                transparent 0
        );
        background-size: 100% 1px;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-color: #fafafa;
        display: flex;
        text-align: center;
    }
    .tab-item {
        display: block;
        padding: 3px 0;
        flex: 1;
    }
    .tab-item-icon {
        width: 20px;
        height: 20px;
        margin: 0 auto 5px;
    }
    .tab-item-icon i {
        font-size: 16px;
    }
    .tab-item-label {
        color: inherit;
        font-size: 10px;
        line-height: 1;
    }
    a {
        text-decoration: none;
        color: #999;
    }
    .is-selected {
        color: #009eef;
    }
</style>