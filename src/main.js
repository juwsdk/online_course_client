import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import router from './router';
import store from './store'; //vuex
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/global.css'
import axios from 'axios';
import * as echarts from 'echarts';
import VueEcharts from 'vue-echarts';
//关闭生产提示
Vue.config.productionTip = false;
//将echarts挂载到vue原型上去
Vue.component('v-chart',VueEcharts);
Vue.prototype.$echarts=echarts;
//使用elementui,VueRouter,axios,Vuex
Vue.use(VueRouter).use(ElementUI);
Vue.prototype.$http=axios;
// Vue.prototype.$CHUNK_SIZE = 4 * 1024 * 1024; // 定义全局变量
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
