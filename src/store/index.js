import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    name: localStorage.getItem('name') ? localStorage.getItem('name') : ''
  },
  getters: {//如果要使用watch观察状态改变那么一定配置这一项
 
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      state.name = user.name;
      localStorage.setItem('name', user.name);
      localStorage.setItem('Authorization', user.Authorization);
    //   alert("1")
    }
  }
});
 
export default store;