import request from "@/api";
/*
教师作业有关的接口 和 学生打卡
 */
//教师作业相关接口
const teacherHomeworkInterface = {
  homeworkUpload: "/homework/homeWorkUpload",
  get studentFinish() {
    return function (courseHomeworkId) {
      return "/homework/" + courseHomeworkId + "/showHomework";
    };
  },
  studentSubmit:"/homework/downLoadStuSubmit",
  scoreToStudent:"/homework/scoreToStudent"
};
//学生打卡接口，用作导出表格加载
export const clockInterface = {
  courseId: null,
  get tableList() {
    return "/courseQuestions/" + this.courseId + "/studentClock";
  },
  set tableList(courseId) {
    this.courseId = courseId;
  },
};
//教师上传作业
export function uploadHomework(formData) {
  return request({
    url: teacherHomeworkInterface.homeworkUpload,
    method: "post",
    data: formData,
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN",
    },
  });
}
//教师查看完成作业的学生
export function studentWhoFinished(courseHomeworkId) {
  return request({
    url: teacherHomeworkInterface.studentFinish(courseHomeworkId),
    method: "post",
  });
}
//教师查看没有完成作业的学生
export function studentWhoNotFinished(courseHomeworkId) {
  return request({
    url: teacherHomeworkInterface.studentFinish(courseHomeworkId),
    method: "get",
  });
}
//教师下载学生提交的作业
export function downloadHomeworkSubmit(courseSubmitVo){
  return request({
    url:teacherHomeworkInterface.studentSubmit,
    method:"post",
    data:courseSubmitVo,
    responseType:"blob"
  })
}
//教师给学生打分
export function scoreToStudent(courseHomeworkScore){
  return request({
    url:teacherHomeworkInterface.scoreToStudent,
    method:"put",
    data:courseHomeworkScore
  })
}
