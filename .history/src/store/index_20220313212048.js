import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    // name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
    user: localStorage.getItem('user') ? localStorage.getItem('user') : '',
    host:'http://127.0.0.1:8008'
  },
  getters: {//如果要使用watch观察状态改变那么一定配置这一项
 
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      state.user = user.userinfo;
      localStorage.setItem('user',JSON.stringify(user.userinfo));
      localStorage.setItem('Authorization', user.Authorization);
      // console.log( user)
    //   alert("1")
    }
  }
});
 
export default store;