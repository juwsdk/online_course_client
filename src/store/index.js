import Vuex from 'vuex';
import Vue from 'vue';
const actions = {//actions用于响应组件中的动作 dispatch

};
const mutations = {//mutations用于操作数据 commit

};
const state = {//state用于存储数据
  teacherId: '6120101',
  studentId: '31201900',
  admId: '1'
};
const getters = {};//getters用于加工state
Vue.use(Vuex);
//创建store,并导出
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
});