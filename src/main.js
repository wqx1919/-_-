import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
	
import './assets/css/pannel.css' /*引入公共样式*/
import './assets/css/base.css' /*引入公共样式*/

import router from './router';
// import axios from 'axios'
import vcolorpicker from 'vcolorpicker'
import axios from 'axios'
import store from './store'
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
// Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
 
    return config;
  },
  error => {
    return Promise.reject(error);
  });
Vue.use(vcolorpicker)
Vue.use(VueRouter)
Vue.use(ElementUI);
// Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router:router,
  store
}).$mount('#app')
