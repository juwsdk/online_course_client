//导入路由
import VueRouter from 'vue-router';
//导入页面
import MyIndex from '@/pages/MyIndex';
import Courses from '@/pages/course/Courses'
import CourseSelect from '@/pages/course/CourseSelect';
import CourseSta from '@/pages/course/CourseSta';
import HomeWork from '@/pages/HomeWork';
import MAdmine from '@/pages/management/MAdmine';
import Mstu from '@/pages/management/MStu'
import MTeacher from '@/pages/management/MTeacher';
//创建并暴露路由
const router= new VueRouter({
  // mode:'history',
  routes: [
    {
      name: 'myindex',
      path: '/myindex',
      component: MyIndex,
      meta: { title: '主页' ,icon:'el-icon-s-home'}
    },
    //课程路由
    {
      name:'path',
      path: '/course',
      component: {render: (e) => e("router-view")},
      meta:{title:'课程管理',icon:'el-icon-menu'},
      // redirect:'/course/courses',
      children: [
        {
          name:'courses',
          path: 'courses',
          component: Courses,
          meta: { title: '课程' ,icon:'el-icon-monitor'}
        },
        {
          name: 'course-select',
          path: 'courseselect',
          component: CourseSelect,
          meta: { title: '课程选择',icon:'el-icon-reading' }
        },
        {
          name: 'course-sta',
          path: 'coursesta',
          component: CourseSta,
          meta: { title: '课程信息统计',icon:'el-icon-s-data' }
        }
      ]
    },
    //管理路由
    {
      name:'manage',
      path:'/manage',
      component: {render: (e) => e("router-view")},
      meta:{title:'信息管理',icon:'el-icon-menu'},
      children:[
        {
          name:'manage-op',
          path:'manageop',
          component:MAdmine,
          meta:{title:'管理员管理',icon:''}
        },
        {
          name:'manage-student',
          path:'managestu',
          component:Mstu,
          meta:{title:'学生管理',icon:''}
        },
        {
          name:'manage-teacher',
          path:'manageteacher',
          component:MTeacher,
          meta:{title:'教师管理',icon:''}
        }
      ]
    },
    //作业路由
    {
      name: 'homework',
      path: '/homework',
      component: HomeWork,
      meta: { title: '作业' ,icon:'el-icon-notebook-1'}
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