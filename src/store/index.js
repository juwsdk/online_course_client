import Vuex from 'vuex';
import Vue from 'vue';
//actions用于响应组件中的动作 dispatch
const actions = {
  //设置登录类型
  setLoginType(context, value) {
    console.log('=======actions======');
    console.log(context);
    console.log(value);
    context.commit('SETLOGINTYPE', value);
  },
  //设置id 根据登录类型来确定
  setId(context, value) {
    if (context.loginType == 'student')
      context.commit('SETSTUDENTID', value);
    else if (context.loginType == 'teacher')
      context.commit('SETTEACHERID', value);
    else if (context.loginType == 'admin')
      context.commit('SETADMINID', value);
  },
  //设置是否授权
  setIsAuth(context, value) {
    console.log('1111111111111');
    console.log(typeof value);
    context.commit('SETISAUTH', value);
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
  }

};
//state用于存储数据
const state = {
  loginType: '',
  teacherId: '6120101',
  studentId: '31201900',
  admId: '1',
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