import TeacherIndex from '@/pages/teacher/';
import TCourseMange from '@/pages/teacher/TCourseMange';
import TCourseMangeDeta from '@/pages/teacher/TCourseMangeDetail';
import HomWAssCorrect from '@/pages/teacher/teacherDetail/THomeworkCrrect';
import TResSubmit from '@/pages/teacher/teacherDetail/TResSubmit';
import TStudentClockIn from '@/pages/teacher/teacherDetail/TStudentClockIn';
import TStudentManage from '@/pages/teacher/teacherDetail/TStudentManage';
import THomWAss from '@/pages/teacher/teacherDetail/THomeworkAssignments';
export default {
  name: 'teacher',
  path: '/teacher',
  component: { render: (e) => e("keep-alive",[e("router-view")]) },
  meta: { title: '学员管理', icon: 'el-icon-menu', requiresAuth: true, role: 'teacher' },
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
      redirect: '/teacher/coursemanges/coursemange',
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
          path: 'courseMange/:teacherId/:courseId',
          component: TCourseMangeDeta,
          redirect: '/teacher/coursemanges/courseMange/:teacherId/:courseId/tStudentManage',
          meta: { title: '教师课程管理详情', icon: ''},
          children: [
            //教师课程管理详情页路由
            {
              name: 'tStudentManage',
              path: 'tStudentManage',
              component: TStudentManage,
              meta: { title: '学生管理', icon: '' }
            },
            {
              name: 'tResSubmit',
              path: 'tResSubmit',
              component: TResSubmit,
              meta: { title: '资源上传', icon: '' }
            },
            {
              name: 'homeworkass',
              path: 'homeworkass',
              component: THomWAss,
              meta: { title: '作业布置', icon: '' }
            },
            {
              name: 'homWAssCorrect',
              path: 'homWAssCorrect',
              component: HomWAssCorrect,
              meta: { title: '作业修改', icon: '' }
            },
            {
              name: 'tStudentClockIn',
              path: 'tStudentClockIn',
              component: TStudentClockIn,
              meta: { title: '学生打卡信息', icon: '' }
            }
          ]
        }
      ]
    },
  ]
}