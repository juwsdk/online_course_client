//课程访问的后端接口
import store from '@/store';
const prefix="/course";

const courseSelectInterface={
  prefix,
  "courseList":"/courseList",
  "courseDetail":"/courseSelectDetail",
  "courseChoose":"/courseChoose"
};
const courseInfoInterface={
  prefix,
  "courseList":"/"+store.getters.getStudentId+"/courseList",
  "courseDetail":"/courseList"
};
const teacherCourseInterface={
  "prefix":"/teacher",
  "courseList":"/"+store.getters.getTeacherId+"/teacherList"
};
export default courseSelectInterface;
export {courseSelectInterface,courseInfoInterface,teacherCourseInterface}