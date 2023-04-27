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
  get courseList(){
    return "/"+store.getters.getStudentId+"/courseList";
  },
  "courseDetail":"/courseList"
};
const teacherCourseInterface={
  "prefix":"/teacher",
  get courseList(){
    return "/"+store.getters.getTeacherId+"/teacherList";
  }
};
export default courseSelectInterface;
export {courseSelectInterface,courseInfoInterface,teacherCourseInterface}