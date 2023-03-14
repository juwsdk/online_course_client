import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/global.css'
import axios from 'axios';

Vue.config.productionTip = false;
//使用elementui,VueRouter,axios
Vue.use(VueRouter).use(ElementUI);
Vue.prototype.$http=axios;
// Vue.prototype.$CHUNK_SIZE = 4 * 1024 * 1024; // 定义全局变量
new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
