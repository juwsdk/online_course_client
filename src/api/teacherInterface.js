import store from '@/store';

const prefix="/teacher";
const teacherId='/'+store.state.teacherId;
const teacherMangeStudent={
  prefix,
  "tableList":teacherId+"/studentList",
  "teacherList":teacherId+"/teacherList",
  "teacherOne":teacherId+"/teacherOne",
  "countObj":teacherId+ "/countStudent",
  "countCourseStudent":teacherId+"/countCourseStudent",
  "studentRemove":"/studentRemove",//删除学生
};
const teacherOneCourseMangeStudent={
  prefix,
  "tableList":teacherId+"/studentList",
  "studentRemove":"/studentRemove",//删除学生
};
export default teacherMangeStudent;
export {teacherOneCourseMangeStudent};
