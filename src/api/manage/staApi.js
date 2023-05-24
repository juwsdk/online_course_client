import request from "@/api";

const staInterface = {
  get teacherSta() {
    return function (teacherId) {
      return "/admin/" + teacherId + "/staTeacher";
    };
  },
  get studentSta() {
    return function (studentId) {
      return "/admin/" + studentId + "/staStudent";
    };
  },
};

export function staTeacherByID(teacherId) {
  return request({
    url: staInterface.teacherSta(teacherId),
    method: "get",
  });
}

export function staStudentByID(studentId) {
  return request({
    url: staInterface.studentSta(studentId),
    method: "get",
  });
}
