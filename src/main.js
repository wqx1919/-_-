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
Vue.use(vcolorpicker)
Vue.use(VueRouter)
Vue.use(ElementUI);
// Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
