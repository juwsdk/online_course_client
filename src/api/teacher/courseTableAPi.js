import store from "@/store";
/*
与表格有关的教师管理接口
*/
//教师管理所有学生的接口
export const courseTableList = {
  get teacherId() {
    return "/teacher/" + store.state.teacherId;
  },
  get tableList() {
    return this.teacherId + "/studentList";
  },
};
//教师管理单独一门课程的学生接口
export const oneCourseTableList = {
  get teacherId() {
    return store.state.teacherId;
  },
  courseId: null,
  get tableList() {
    return "/teacher/" + this.courseId + "/" + this.teacherId + "/studentList";
  },
  set tableList(courseId) {
    this.courseId = courseId;
  },
  get deleteOne(){
    // /teacher/{courseId}/studentRemove 教师删除自己课程的学生
    return "/teacher/"+this.courseId+"/studentRemove";
  }

};
