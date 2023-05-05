import store from "@/store";
import request from "@/api";
//教师课程接口,展示教师教授的课程
export const teacherCourseInterface = {
  prefix: "/teacher",
  get courseList() {
    // /teacher/{teacherId}/teacherList
    return this.prefix + "/" + store.getters.getTeacherId + "/teacherList";
  },
  //教师新增和更新课程信息
  get addCourse() {
    // /teacher/courseInsert
    return this.prefix + "/courseInsert";
  },
  get updateCourse() {
    // /teacher/courseUpdate
    return this.prefix + "/courseUpdate";
  },
  get showCourse() {
    return function (courseId) {
      // /teacher/{courseId}/courseShow
      return this.prefix + "/" + courseId + "/courseShow";
    };
  },
};
//教师新增一门课程
export function addCourse(courseFile) {
  return request({
    url: teacherCourseInterface.addCourse,
    method: "post",
    data: courseFile,
  });
}
//教师修改一门课程的信息
export function updateCourse(courseFile) {
  return request({
    url: teacherCourseInterface.updateCourse,
    method: "post",
    data: courseFile,
  });
}
//是修改课程时，首先展示课程的信息
export function showCourse(courseId) {
  return request({
    url: teacherCourseInterface.showCourse(courseId),
    method: "get",
  });
}
