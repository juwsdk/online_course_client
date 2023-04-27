import Vuex from 'vuex';
import Vue from 'vue';
//actions用于响应组件中的动作 dispatch
const actions = {
  //设置登录类型
  setLoginType(context, value) {
    context.commit('SETLOGINTYPE', value);
  },
  //设置id 根据登录类型来确定
  setId(context, value) {
    if (context.state.loginType == 'student')
      context.commit('SETSTUDENTID', value);
    else if (context.state.loginType == 'teacher')
      context.commit('SETTEACHERID', value);
    else if (context.state.loginType == 'admin')
      context.commit('SETADMINID', value);
  },
  //设置是否授权
  setIsAuth(context, value) {
    console.log(typeof value);
    context.commit('SETISAUTH', value);
  },
  //如果是管理员设置管理员类型
  setAdmType(context,value){
    context.commit('SETADMTYPE',value);
  }
};
//mutations用于操作数据 commit
const mutations = {
  //设置登录类型
  SETLOGINTYPE(state, value) {
    state.loginType = value;
    console.log(state.loginType);
  },
  //#region 设置ID
  SETSTUDENTID(state, value) {
    state.studentId = value;
  },
  SETTEACHERID(state, value) {
    state.teacherId = value;
  },
  SETADMINID(state, value) {
    state.admId = value;
  },
  //#endregion
  //设置是否授权
  SETISAUTH(state, value) {
    state.isAuth = value;
  },
  SETADMTYPE(state,value){
    state.admType=value;
  }

};
//state用于存储数据
const state = {
  loginType: '',
  teacherId: '',
  studentId: '',
  admId: '',
  admType:2,
  isAuth: false
};
//getters用于加工state
const getters = {
  //获取是否授权
  getIsAuth(state) {
    return state.isAuth;
  },
  //获取登录类型
  getLoginType(state) {
    return state.loginType;
  },
  //#region 获取id
  getTeacherId(state) {
    return state.teacherId;
  },
  getStudentId(state) {
    return state.studentId;
  },
  getAdmiId(state) {
    return state.admId;
  },
  //判断登录类型并获取id
  getId(state) {
    if (state.loginType == 'student')
      return state.studentId;
    else if (state.loginType == 'teacher')
      return state.teacherId;
    else
      return state.admId;
  },
  //管理员类型
  getAdmType(state){
    return state.admType;
  }
  //#endregion 获取id
};
Vue.use(Vuex);
//创建store,并导出
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
});