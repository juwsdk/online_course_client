//导入路由
import VueRouter from 'vue-router';
//导入页面
import MyIndex from '@/pages/MyIndex';
import Courses from '@/pages/course/Courses'
import CourseSelect from '@/pages/course/CourseSelect';
import CourseSta from '@/pages/course/CourseSta';
import HomeWork from '@/pages/HomeWork';
//创建并暴露路由
const router= new VueRouter({
  // mode:'history',
  routes: [
    {
      name: 'myindex',
      path: '/myindex',
      component: MyIndex,
      meta: { title: '主页' }
    },
    //课程路由
    {
      path: '/course',
      component: {render: (e) => e("router-view")},
      // redirect:'/course/courses',
      children: [
        {
          name:'courses',
          path: 'courses',
          component: Courses,
          meta: { title: '课程' }
        },
        {
          name: 'course-select',
          path: 'courseselect',
          component: CourseSelect,
          meta: { title: '课程选择' }
        },
        {
          name: 'course-sta',
          path: 'coursesta',
          component: CourseSta,
          meta: { title: '课程信息统计' }
        }
      ]
    },
    //作业路由
    {
      name: 'homework',
      path: '/homework',
      component: HomeWork,
      meta: { title: '作业' }
    }
  ]
});
//全局前置路由守卫
router.beforeEach((to, from, next) => {
  next();
})
//全局后置路由守卫
router.afterEach((to, from) => {
  // to and from are both route objects.
})
export default router;