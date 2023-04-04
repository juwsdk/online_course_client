// 定义了对应的table表头及对应的字段
//前三个是管理员管理的表
const studentTable={
    "学号":"studentId",
    "姓名":"studentName",
    "性别":"studentGender",
    "密码":"studentPassword",
    "生日":"studentBirthday",
    "电话":"studentPhonenum",
    "邮箱":"studentEmail",
    "地址":"studentAddress"
};
const teacherTable={
  "教师号":"teacherId",
  "姓名":"teacherName",
  "性别":"teacherGender",
  "生日":"teacherBirthday",
  "电话":"teacherPhonenum",
  "邮箱":"teacherEmail",
  "地址":"teacherAddress"
};
const admTable={
  "管理员名称":"admName",
  "管理员密码":"admPassword",
  "管理员权限":"admAuthoritylevels"
};
//教师的课程表
const teacherCourseTable={
  "课程名":"courseName",
  "学生学号":"studentId",
  "学生名":"studentName",
}
export default studentTable;
export {studentTable,teacherTable,admTable,teacherCourseTable};