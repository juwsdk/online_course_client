import Courses from '@/pages/course/Courses'
import CourseSelect from '@/pages/course/CourseSelect';
import CourseSta from '@/pages/course/CourseSta';
import OneCourse from '@/pages/course/OneCourse';
export default {
  //课程路由
  name: 'path',
  path: '/course',
  component: { render: (e) => e("router-view") },
  meta: { title: '课程管理', icon: 'el-icon-menu' },
  // redirect:'/course/courses',
  children: [
    {
      name: 'courses',
      path: 'courses',
      component: Courses,
      meta: { title: '课程', icon: 'el-icon-monitor' },
      children: [
        {
          name: 'onecourse',
          path: 'onecourse',
          component: OneCourse,
          meta: { title: 'dd', icon: '' }
        }
      ]
    },
    {
      name: 'course-select',
      path: 'courseselect',
      component: CourseSelect,
      meta: { title: '课程选择', icon: 'el-icon-reading' }
    },
    {
      name: 'course-sta',
      path: 'coursesta',
      component: CourseSta,
      meta: { title: '课程信息统计', icon: 'el-icon-s-data' }
    }
  ]
}