import store from "@/store";
import request from "@/api";

const teacherMangeInterface = {
  get teacherId() {
    return "/teacher/" + store.state.teacherId;
  },

  get teacherList() {
    return this.teacherId + "/teacherList";
  },
  get teacherOne() {
    return this.teacherId + "/teacherOne";
  },
  get countObj() {
    return this.teacherId + "/countStudent";
  },
  get countCourseStudent() {
    return this.teacherId + "/countCourseStudent";
  },
  studentRemove: "/studentRemove", //删除学生

};

//拿到教师信息
export function loadTeacherData() {
  return request({
    url: teacherMangeInterface.teacherOne,
    method: "post",
  });
}
//拿到教师教授课程数
export function loadTeacherCoursesNum() {
  return request({
    url: teacherMangeInterface.countObj,
    method: "get",
  });
}
//拿到教授的课程
export function loadTeacherCourses() {
  return request({
    url: teacherMangeInterface.teacherList,
    method: "post",
  });
}
//统计教师教授课程
export function loadStaData() {
  //this.teacherMangeStudent.prefix + '/' + this.teacherMangeStudent.countCourseStudent
  return request({
    url: teacherMangeInterface.countCourseStudent,
    method: "post",
  });
}
