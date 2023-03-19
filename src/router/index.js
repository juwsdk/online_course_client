//导入路由
import VueRouter from 'vue-router';
//导入页面
import MyIndex from '@/pages/MyIndex';
import CourseLayout from '@/layout/';
import HomeWork from '@/pages/HomeWork';
import Course from './course'
import Manage from './manage';
import Teacher from './teacher'
import Login from '@/pages/Login';
//创建并暴露路由
const router = new VueRouter({
  // mode:'history',
  routes: [
    //登录页面
    {
      name: 'login',
      path: '/login',
      component: Login,
      meta: { title: '登录', icon: '' }
    },
    //用户交互页面
    {
      name: 'index',
      path: '/',
      redirect: '/myindex',
      component: CourseLayout,
      meta: { title: '主页', icon: 'el-icon-s-home' },
      children: [
        {
          name: 'myindex',
          path: '/myindex',
          component: MyIndex,
          meta: { title: '主页', icon: 'el-icon-s-home' }
        },
        Course,//课程路由
        Manage,//管理路由
        Teacher,//教师路由
        //作业路由
        {
          name: 'homework',
          path: '/homework',
          component: HomeWork,
          meta: { title: '作业', icon: 'el-icon-notebook-1' }
        },

      ]
    },


  ]
});
//全局前置路由守卫
router.beforeEach((to, from, next) => {
  next();
})
//全局后置路由守卫
// router.afterEach((to, from) => {
//   // to and from are both route objects.
// })
export default router;