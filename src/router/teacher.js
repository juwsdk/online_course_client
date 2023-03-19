import TeacherIndex from '@/pages/teacher';
import TCourseMange from '@/pages/teacher/TCourseMange';
import THomWAss from '@/pages/teacher/THomeworkAssignments';
import TCourseMangeDeta from '@/pages/teacher/TCourseMangeDetail';
export default {
  name: 'teacher',
  path: '/teacher',
  component: { render: (e) => e("router-view") },
  meta: { title: '学员管理', icon: 'el-icon-menu' },
  children: [
    {
      name: 'teaIndex',
      path: 'teaIndex',
      component: TeacherIndex,
      meta: { title: '主页查询', icon: 'el-icon-s-data' },
    },
   
    {
      name: 'coursemanges',
      path: 'coursemanges',
      component: { render: (e) => e("router-view") },
      redirect:'/teacher/coursemanges/coursemange',
      meta: { title: '教师课程管理', icon: 'el-icon-reading' },
      children: [
        {
          name: 'coursemange',
          path: 'coursemange',
          component: TCourseMange,
          meta: { title: '教师课程管理', icon: '' },
        },
        {
          name: 'courseMangeD',
          path: 'courseMange/:id',
          component: TCourseMangeDeta,
          meta: { title: '教师课程管理详情', icon: '' },
        }
      ]
    },
    {
      name: 'homeworkass',
      path: 'homeworkass',
      component: THomWAss,
      meta: { title: '作业布置', icon: 'el-icon-s-marketing' }
    },
  ]
}