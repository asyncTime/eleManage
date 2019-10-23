import axios from 'axios';
const state = {
    phoneId:localStorage.phoneId,
    token:localStorage.token
};
const mutations = {
    CHANGE_PHONE_ID(state,{phoneId,token}){
        state.phoneId = localStorage.phoneId = phoneId;
        state.token = localStorage.token = token;
    }
};
const actions = {
    userLogin({commit},data){
       return axios.post("/userLogin",data);

    },
    sendCode(content,{phoneId}){
        return axios.post("/sendCode",{
            phoneId
        })

    }

}
export   default {
    state,
    mutations,
    actions
}