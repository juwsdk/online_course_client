import request from "@/api";

const questInterface = {
  get tableList() {
    return function (courseId) {
      return "/courseQuestions/" + courseId + "/getAll";
    };
  },
  get tableChild(){
    return  function (courseQuestionId){
      return "/courseQuestions/"+courseQuestionId+"/getChild";
    };
  } ,
  insertOne: "/courseQuestions/addQues",
  clock: "/courseQuestions/studentClock",
};
//加载问题列表  学生/教师
export function loadQuestions(courseId) {
  return request({
    url: questInterface.tableList(courseId),
    method: "post",
  });
}
//提问/回复问题 学生/教师
export function sedQues(answer) {
  return request({
    url: questInterface.insertOne,
    method: "put",
    data: answer,
  });
}
//学生打卡 学生
export function clockIn(dataObj) {
  return request({
    url: questInterface.clock,
    method: "put",
    data: dataObj,
  });
}
// 展开回复框
export function showAnswer(courseQuestionId){
  return request({
    url:questInterface.tableChild(courseQuestionId),
    method:"post",
  })
}
