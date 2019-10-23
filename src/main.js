import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from "axios";
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import "@/assets/style/reset.css"
import { Indicator } from 'mint-ui';
// import "@/assets/style/iconfont/iconfont.css"
Vue.config.productionTip = false
Vue.use(MintUI);
// 请求拦截,可以将请求的配置进行二次处理。
axios.interceptors.request.use(config=>{
    Indicator.open();
    config.url = "/ele"+config.url;
    return config;
})
// 响应拦截
axios.interceptors.response.use(({data})=>{
    Indicator.close();
    return data;
})
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
