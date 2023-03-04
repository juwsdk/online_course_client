import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/global.css'
Vue.config.productionTip = false
//使用elementui
Vue.use(VueRouter).use(ElementUI);
new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
