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
import moment from 'moment'

// 引入js文件，这里直接使用的是这个文件里的路径，不需要再resolver中修改路径之类的操作
import semantic from '../node_modules/semantic-ui-css/semantic.min.js'
// 引入css文件
import '../node_modules/semantic-ui-css/semantic.min.css'

Vue.use(semantic);

Vue.prototype.$moment = moment
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
