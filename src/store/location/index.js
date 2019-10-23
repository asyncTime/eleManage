import { Indicator } from 'mint-ui';
const state = {
    address:"正在为您定位中……",
    addressList:[]
}
const mutations = {
    CHANGE_ADDDRESS(state,address){
        state.address = address;
    },
    CHANGE_ADDDRESS_LIST(state,addressList){
        state.addressList = addressList;
    }
}
const actions = {
    autoComplete({commit},{keyword}){
        AMap.plugin('AMap.Autocomplete', function(){
            // 实例化Autocomplete
            var autoOptions = {
                //city 限定城市，默认全国
                city: '北京'
            }
            var autoComplete= new AMap.Autocomplete(autoOptions);
            // keyword是你要搜索的内容
            autoComplete.search(keyword, function(status, result) {
                console.log(2222,result);
                if(result.tips){
                    console.log(result.tips);
                    commit("CHANGE_ADDDRESS_LIST",result.tips);
                }else{
                    commit("CHANGE_ADDDRESS_LIST",[]);
                }
                // 搜索成功时，result即是对应的匹配数据
            })
        })
    },

    geolocation({commit}){
        Indicator.open();
        AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
            })

            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete)
            AMap.event.addListener(geolocation, 'error', onError)

            function onComplete (data) {
                // data是具体的定位信息
                commit("CHANGE_ADDDRESS",data.formattedAddress);
                Indicator.close();
                console.log("vuex:",data.formattedAddress);
            }

            function onError (data) {
                // 定位出错
                console.log(222222222);
            }
        })
    }
}
export default {
    state,
    mutations,
    actions
}