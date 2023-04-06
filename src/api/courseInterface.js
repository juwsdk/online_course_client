//课程访问的后端接口
const courseSelectInterface={
  "prefix":"/course",
  "courseList":"/courseList",
  "courseDetail":"/courseSelectDetail"
};
const courseInfoInterface={
  "prefix":"/course",
  "courseList":"/31201900/courseList",
  "courseDetail":"/courseList"
};
const teacherCourseInterface={
  "prefix":"/teacher",
  "courseList":"/6120101/teacherList"
};
export default courseSelectInterface;
export {courseSelectInterface,courseInfoInterface,teacherCourseInterface}