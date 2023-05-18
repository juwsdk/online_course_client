import request from "@/api";
import store from "@/store";

const courseHomeworkInterface = {
  get homeworkList() {
    return function (courseId) {
      return "/homework/" + courseId + "/getHomework";
    };
  },
  download: "/homework/downLoad",
  get uploadBefore() {
    return function (courseHomeworkId) {
      return (
        "/homework/" +
        store.getters.getStudentId +
        "/" +
        courseHomeworkId +
        "/homeWorkFinishedUpload"
      );
    };
  },
  upload: "/homework/homeWorkFinishedUpload",
  get score() {
    return function (courseHomeworkId) {
      return (
        "/homework/" +
        store.getters.getStudentId +
        "/" +
        courseHomeworkId +
        "/scoreShowToStudent"
      );
    };
  },
};
//加载作业列表
export function loadHomework(courseId) {
  return request({
    url: courseHomeworkInterface.homeworkList(courseId),
    method: "post",
  });
}
//下载作业
export function downloadHomework(parameter) {
  return request({
    url: courseHomeworkInterface.download,
    method: "get",
    params: parameter,
    responseType: "blob",
  });
}
//上传作业前查询之前是否上传了作业
export function uploadHomeworkBefore(courseHomeworkId) {
  return request({
    url: courseHomeworkInterface.uploadBefore(courseHomeworkId),
    method: "post",
  });
}

//上传作业
export function uploadHomework(formData) {
  return request({
    url: courseHomeworkInterface.upload,
    method: "post",
    data: formData,
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN",
    },
  });
}

//修改再上传作业
export function updateHomework(formData) {
  return request({
    url: courseHomeworkInterface.upload,
    method: "put",
    data: formData,
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN",
    },
  });
}
//查看得分
export function seeScore(courseId) {
  return request({
    url: courseHomeworkInterface.score(courseId),
    method: "get",
  });
}
