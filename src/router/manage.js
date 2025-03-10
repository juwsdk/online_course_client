import MAdmine from '@/pages/management/MAdmine';
import Mstu from '@/pages/management/MStu'
import MTeacher from '@/pages/management/MTeacher';
import MSta from "@/pages/management/MSta.vue";
export default {
  //管理路由
  name: 'manage',
  path: '/manage',
  component: { render: (e) => e("router-view") }, //缓存路由 render: (e) => e("keep-alive", [e("router-view")])
  meta: { title: '信息管理', icon: 'el-icon-menu', requiresAuth: true, role: 'admin',admLevel:2 },
  children: [
    {
      name: 'manage-op',
      path: 'manageop',
      component: MAdmine,
      meta: { title: '管理员管理', icon: 'el-icon-user-solid', requiresAuth: true , role: 'admin',admLevel:0}
    },
    {
      name: 'manage-student',
      path: 'managestu',
      component: Mstu,
      meta: {title: '学生管理', icon: 'el-icon-s-check', requiresAuth: true, role: 'admin', admLevel: 1}
    },
    {
      name: 'manage-teacher',
      path: 'manageteacher',
      component: MTeacher,
      meta: {title: '教师管理', icon: 'el-icon-s-custom', requiresAuth: true, role: 'admin', admLevel: 2}
    },
    {
      name: 'manage-sta',
      path: 'managesta',
      component: MSta,
      meta: {title: '信息统计', icon: 'el-icon-s-order', requiresAuth: true, role: 'admin', admLevel: 2}
    }
  ]
}