import MAdmine from '@/pages/management/MAdmine';
import Mstu from '@/pages/management/MStu'
import MTeacher from '@/pages/management/MTeacher';
export default{
  //管理路由
    name:'manage',
    path:'/manage',
    component: {render: (e) => e("keep-alive",[e("router-view")])}, //缓存路由
    meta:{title:'信息管理',icon:'el-icon-menu'},
    children:[
      {
        name:'manage-op',
        path:'manageop',
        component:MAdmine,
        meta:{title:'管理员管理',icon:'el-icon-user-solid'}
      },
      {
        name:'manage-student',
        path:'managestu',
        component:Mstu,
        meta:{title:'学生管理',icon:'el-icon-s-check'}
      },
      {
        name:'manage-teacher',
        path:'manageteacher',
        component:MTeacher,
        meta:{title:'教师管理',icon:'el-icon-s-custom'}
      }
    ]
}