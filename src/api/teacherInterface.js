import store from "@/store";

const prefix = "/teacher";
const teacherMangeStudent = {
  prefix,
  get teacherId() {
    return "/" + store.state.teacherId;
  },
  get tableList() {
    return this.teacherId + "/studentList";
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
const teacherOneCourseMangeStudent = {
  prefix,
  get tableList() {
    return "/" + store.state.teacherId + "/studentList";
  },
  studentRemove: "/studentRemove", //删除学生
};
export default teacherMangeStudent;
export { teacherOneCourseMangeStudent };
