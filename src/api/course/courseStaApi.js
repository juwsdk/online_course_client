import store from "@/store";
import request from "@/api";

const courseStaInterface = {
  get chooseCourseSta() {
    return "/course/" + store.getters.getStudentId + "/countCourse";
  },
  get homeworkSta() {
    return "/student/" + store.getters.getStudentId + "/studentHomeworkCount";
  },
  get answerQues() {
    return "/student/" + store.getters.getStudentId + "/studentQuestionsNum";
  },
  get clockData() {
    return "/student/" + store.getters.getStudentId + "/studentAttendance";
  },
};
// 请求加载数据学生选课数统计
export function loadCountChartOptionsData(){
  return request({
    url:courseStaInterface.chooseCourseSta,
    method:"get"
  })
}
//请求加载学生学生作业完成情况的饼图
export function loadCountAskQuestionsChartData(){
  return request({
    url:courseStaInterface.homeworkSta,
    method:"get"
  })
}
//请求加载学生提问情况的饼图
export function loadCountHomeWorkChartData(){
  return request({
    url:courseStaInterface.answerQues,
    method:"get"
  })
}
//请求最近三周打卡情况
export function loadWeekClockData(){
  return request({
    url:courseStaInterface.clockData,
    method:"get"
  })
}