import TeacherIndex from '@/pages/teacher/';
import TCourseMange from '@/pages/teacher/TCourseMange';
import TCourseMangeDeta from '@/pages/teacher/TCourseMangeDetail';
import HomWAssCorrect from '@/pages/teacher/teacherDetail/THomeworkCrrect';
import TResSubmit from '@/pages/teacher/teacherDetail/TResSubmit';
import TStudentClockIn from '@/pages/teacher/teacherDetail/TStudentClockIn';
import TStudentManage from '@/pages/teacher/teacherDetail/TStudentManage';
import THomWAss from '@/pages/teacher/teacherDetail/THomeworkAssignments';
import TResManage from '@/pages/teacher/teacherDetail/TResManage';
import TAnsweringQuestions from '@/pages/teacher/teacherDetail/TAnsweringQuestions';
export default {
  name: 'teacher',
  path: '/teacher',
  component: { render: (e) => e("router-view") },//render: (e) => e("keep-alive",[e("router-view")])
  meta: { title: '学员管理', icon: 'el-icon-menu', requiresAuth: true, role: 'teacher' },
  children: [
    {
      name: 'teaIndex',
      path: 'teaIndex',
      component: TeacherIndex,
      meta: { title: '主页查询', icon: 'el-icon-s-data', role: 'teacher' },
    },
    {
      name: 'coursemanges',
      path: 'coursemanges',
      component: { render: (e) => e("router-view") },
      redirect: '/teacher/coursemanges/coursemange',
      meta: { title: '教师课程管理', icon: 'el-icon-reading',requiresAuth:true, role: 'teacher' },
      children: [
        {
          name: 'coursemange',
          path: 'coursemange',
          component: TCourseMange,
          meta: { title: '教师课程管理', icon: '' ,requiresAuth:true, role: 'teacher'},
        },
        {
          name: 'courseMangeD',
          path: 'courseMange/:teacherId/:courseId',
          component: TCourseMangeDeta,
          redirect: '/teacher/coursemanges/courseMange/:teacherId/:courseId/tStudentManage',
          meta: { title: '教师课程管理详情', icon: '',requiresAuth:true, role: 'teacher'},
          children: [
            //教师课程管理详情页路由
            {
              name: 'tStudentManage',
              path: 'tStudentManage',
              component: TStudentManage,
              meta: { title: '学生管理', icon: '',requiresAuth:true, role: 'teacher' }
            },
            {
              name: 'tResSubmit',
              path: 'tResSubmit',
              component: TResSubmit,
              meta: { title: '资源上传', icon: '',requiresAuth:true , role: 'teacher'}
            },
            {
              name: 'tResManage',
              path: 'tResManage',
              component: TResManage,
              meta: { title: '资源管理', icon: '',requiresAuth:true , role: 'teacher'}
            },
            {
              name: 'homeworkass',
              path: 'homeworkass',
              component: THomWAss,
              meta: { title: '作业布置', icon: '' ,requiresAuth:true, role: 'teacher'}
            },
            {
              name: 'homWAssCorrect',
              path: 'homWAssCorrect',
              component: HomWAssCorrect,
              meta: { title: '作业修改', icon: '',requiresAuth:true , role: 'teacher'}
            },
            {
              name: 'tStudentClockIn',
              path: 'tStudentClockIn',
              component: TStudentClockIn,
              meta: { title: '学生打卡信息', icon: '',requiresAuth:true , role: 'teacher'}
            },
            {
              name: 'tAnsweringQuestions',
              path: 'tAnsweringQuestions',
              component: TAnsweringQuestions,
              meta: { title: '学生答疑', icon: '',requiresAuth:true , role: 'teacher'}
            }
          ]
        }
      ]
    },
  ]
}