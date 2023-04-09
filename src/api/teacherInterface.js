import store from '@/store';
const teacherId='/'+store.state.teacherId;
const teacherMangeStudent={
  "prefix":"/teacher",
  "tableList":teacherId+"/studentList",
  "teacherList":teacherId+"/teacherList",
  "teacherOne":teacherId+"/teacherOne",
  "countObj":teacherId+ "/countStudent",
  "countCourseStudent":teacherId+"/countCourseStudent"
}
export default teacherMangeStudent;