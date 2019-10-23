<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/img/logo.png" alt="my login image">
        </div>
        <!-- 手机号 -->
        <div class="text_group">
            <div class="input_group" :class="{'is-invalid':valiPhone}">
                <input type="input" v-model="phoneId"  @blur="isValidate" placeholder="手机号">
            </div>
            <div v-show="valiPhone" class="invalid-feedback">请输入手机号</div>
        </div>

        <!-- 验证码 -->
        <div class="text_group">
            <div class="input_group is-invalid">
                <input type="input" v-model="code" placeholder="验证码">
                <button :disabled="disabled" @click="sendCode">{{disabled?num:btnStr}}</button>
            </div>
            <div class="invalid-feedback">请输入验证码</div>
        </div>
        <div class="login_des">
            <p>
                新用户登录即自动注册，并表示已同意
                <span>《用户服务协议》</span>和<span>《隐私权政策》</span>
            </p>
        </div>
        <!-- 登录按钮 -->
        <div class="login_btn">
            <button @click="login">登录</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return {
                valiPhone:false,
                phoneId:"",
                timer:null,
                disabled:false,
                num:60,
                btnStr:"获取验证码",
                code:""
            }
        },
        methods:{
            async sendCode(){
                if(this.isValidate()){
                    const res = await  this.$store.dispatch("sendCode",{phoneId:this.phoneId});
                    if(res.ok === 1){
                        this.disabled = true;
                        this.num = 60;
                        this.timer = setInterval(()=>{
                            this.num--;
                            if(this.num <= 0)
                            {
                                clearInterval(this.timer);
                            }
                        },1000);
                    }else{
                        alert(res.msg);
                    }
                }
            },
            async login(){
                if(this.isValidate()){
                    const data = await this.$store.dispatch("userLogin",{phoneId:this.phoneId,code:this.code});
                    if(data.ok === 1){
                        this.$store.commit("CHANGE_PHONE_ID",{
                            phoneId:data.phoneId,
                            token:data.token
                        });
                        this.$router.push("/my");
                    }else{
                        console.log(data);
                    }

                }
            },
            isValidate(){
                if(this.phoneId.length<1 || !/^1[345678]\d{9}$/.test(this.phoneId))
                    this.valiPhone = true;
                else
                    this.valiPhone = false;
                if(this.valiPhone=== false){
                    return true;
                }
            }
        }
    }
</script>

<style scoped>
    .login {
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        background: #fff;
    }
    .logo {
        text-align: center;
    }
    .logo img {
        width: 150px;
    }
    .text_group,
    .login_des,
    .login_btn {
        margin-top: 20px;
    }
    .login_des {
        color: #aaa;
        line-height: 22px;
    }
    .login_des span {
        color: #4d90fe;
    }
    .login_btn button {
        width: 100%;
        height: 40px;
        background-color: #4cd96f;
        border-radius: 4px;
        color: white;
        font-size: 14px;
        border: none;
        outline: none;
    }
    .login_btn button[disabled] {
        background-color: #8bda81;
    }


    .input_group {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .input_group input {
        height: 100%;
        width: 60%;
        border:none;
        outline: none;
    }
    .input_group button {
        border: none;
        outline: none;
        background: #fff;
    }
    .input_group button[disabled] {
        color: #aaa;
    }
    .is-invalid {
        border: 1px solid red;
    }
    .invalid-feedback {
        color: red;
        padding-top: 5px;
    }
</style>