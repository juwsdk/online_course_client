import Courses from '@/pages/course/Courses'
import CourseSelect from '@/pages/course/CourseSelect';
import CourseSta from '@/pages/course/CourseSta';
import CoursesDetail from '@/pages/course/CoursesDetail';
import CourseSelectDetail from '@/pages/course/CourseSelectDetail';
import MySche from '@/pages/course/MySche';
export default {
  //课程路由
  name: 'path',
  path: '/course',
  component: { render: (e) => e("router-view") },
  meta: { title: '课程管理', icon: 'el-icon-menu', requiresAuth: true, role: 'student' },
  // redirect:'/course/courses',
  children: [
    {
      name: 'mycourse',
      path: 'mycourse',
      component: { render: (e) => e("router-view") },
      meta: { title: '课程', icon: 'el-icon-monitor', requiresAuth: true, role: 'student'  },
      redirect: '/course/mycourse/courses',
      children: [
        {
          // 展示所有教学视频
          name: 'courses',
          path: 'courses',
          component: Courses,
          meta: { title: '', icon: '', requiresAuth: true, role: 'student'  }
        },
        {
          // 根据卡片取出哪一个教学视频
          name: 'CoursesDetail',
          path: 'courses/:teacherId/:courseId',
          component: CoursesDetail,
          meta: { title: '', icon: '', requiresAuth: true, role: 'student'  },
        },
      ]
    },
    {
      name: 'course-selects',
      path: 'courseselects',
      component: { render: (e) => e("router-view")/* ("keep-alive", [e("router-view")]) */ }, //缓存路由
      meta: { title: '课程选择', icon: 'el-icon-reading', requiresAuth: true , role: 'student' },
      redirect: '/course/courseselects/courseselect',
      children: [
        {
          // 展示所有教学视频
          name: 'course-select',
          path: 'courseselect',
          component: CourseSelect,
          meta: { title: '', icon: '', requiresAuth: true, role: 'student'  }
        },
        {
          // 根据卡片取出哪一个教学视频
          name: 'course-select-detial',
          path: 'courseselect/:courseId',
          component: CourseSelectDetail,
          meta: { title: '', icon: '', requiresAuth: true , role: 'student' }
        },
      ]

    },
    {
      name: 'course-sta',
      path: 'coursesta',
      component: CourseSta,
      meta: { title: '课程信息统计', icon: 'el-icon-s-data', requiresAuth: true , role: 'student' }
    },
    {
      name: 'plan',
      path: 'plan',
      component: MySche,
      meta: { title: '我的计划', icon: 'el-icon-date', requiresAuth: true , role: 'student' }
    }
  ]
}