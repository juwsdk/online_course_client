//导入路由
import VueRouter from 'vue-router';
//导入页面
import MyIndex from '@/pages/';
import CourseLayout from '@/layout/';
import Course from './course'
import Manage from './manage';
import Teacher from './teacher'
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import store from '@/store';
//创建并暴露路由
const router = new VueRouter({
  // mode:'history',
  routes: [
    //登录页面
    {
      name: 'login',
      path: '/login',
      component: Login,
      meta: { title: '登录', icon: '',requiresAuth:false }
    },
    //注册页面
    {
      name: 'register',
      path: '/register',
      component: Register,
      meta: { title: '注册', icon: '',requiresAuth:false }
    },
    //用户交互页面
    {
      name: 'index',
      path: '/',
      redirect: '/myindex',
      component: CourseLayout,
      meta: { title: '主页', icon: 'el-icon-s-home', requiresAuth: true ,role:'all'},
      children: [
        {
          name: 'myindex',
          path: '/myindex',
          component: MyIndex,
          meta: { title: '主页', icon: 'el-icon-s-home', requiresAuth: true,role:'all' }
        },
        Course,//课程路由
        Manage,//管理路由
        Teacher,//教师路由
      ]
    },
    //404页面
    {
      name: 'notfound',
      path: '/*',
      component: NotFound,
      meta: { title: '404', icon: '',requiresAuth:false }
    },


  ]
});
//全局前置路由守卫，对路由进行拦截
router.beforeEach((to, from, next) => {
  /* if ((!store.getters.getIsAuth) && to.meta.requiresAuth==true) {
    next('/login');
  } else {
    next();
  } */
  next();
})
//全局后置路由守卫
// router.afterEach((to, from) => {
//   // to and from are both route objects.
// })
export default router;