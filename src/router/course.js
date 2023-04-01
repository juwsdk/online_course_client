import Courses from '@/pages/course/Courses'
import CourseSelect from '@/pages/course/CourseSelect';
import CourseSta from '@/pages/course/CourseSta';
import CoursesDetail from '@/pages/course/CoursesDetail';
import CourseSelectDetail from '@/pages/course/CourseSelectDetail';
export default {
  //课程路由
  name: 'path',
  path: '/course',
  component: { render: (e) => e("router-view") },
  meta: { title: '课程管理', icon: 'el-icon-menu' },
  // redirect:'/course/courses',
  children: [
    {
      name: 'mycourse',
      path: 'mycourse',
      component: { render: (e) => e("router-view") },
      meta: { title: '课程', icon: 'el-icon-monitor' },
      redirect:'/course/mycourse/courses',
      children: [
        {
          // 展示所有教学视频
          name:'courses',
          path:'courses',
          component:Courses,
          meta:{ title: '', icon: '' }
        },
        {
          // 根据卡片取出哪一个教学视频
          name: 'CoursesDetail',
          path: 'courses/:id',
          component: CoursesDetail,
          meta: { title: '', icon: '' },
          children:[
            {
              // 多少集
              name: 'onecourseddd',
              path: ':name',
              // component: OneCourse,
              meta: { title: '', icon: '' },
            }
          ]
        },
      ]
    },
    {
      name: 'course-selects',
      path: 'courseselects',
      component: { render: (e) => e("router-view") },
      meta: { title: '课程选择', icon: 'el-icon-reading' },
      redirect:'/course/courseselects/courseselect',
      children: [
        {
          // 展示所有教学视频
          name:'course-select',
          path:'courseselect',
          component:CourseSelect,
          meta:{ title: '', icon: '' }
        },
        {
          // 根据卡片取出哪一个教学视频
          name: 'course-select-detial',
          path: 'courseselect/:id',
          component: CourseSelectDetail,
          meta: { title: '', icon: '' }
        },
      ]

    },
    {
      name: 'course-sta',
      path: 'coursesta',
      component: CourseSta,
      meta: { title: '课程信息统计', icon: 'el-icon-s-data' }
    }
  ]
}