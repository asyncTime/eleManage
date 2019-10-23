<template>
    <div>我的</div>
</template>

<script>
    export default {
        name: "my",
        // beforeRouteEnter(to,from,next){
        //     console.log(2222222222222);
        // },

        beforeRouteEnter:(to,from,next)=>{
            if(localStorage.token)
                next();
            else
                next("/login")
        }
    }
</script>

<style scoped>

</style>