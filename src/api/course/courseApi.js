import request from "@/api";
import store from "@/store";
//课程选择
export const courseSelectList = {
  courseList: "/course/courseList",
  courseDetail: "/course/courseSelectDetail",
  get courseChoose() {
    return function (courseId) {
      return (
        "/course/courseChoose/" + courseId + "/" + store.getters.getStudentId
      );
    };
  },
  courseCarousel:"/course/courseTopList"
};
//课程
export const courseInfoList = {
  get courseList() {
    return "/course/" + store.getters.getStudentId + "/courseList";
  },
  get courseDetail() {
    return function (courseId) {
      return "/course/courseList/" + courseId;
    };
  },
};
const imageUrl = "/teacher/courseShow";
//加载课程列表
export function courseList(url, parameter) {
  return request({
    url: url,
    method: "get",
    params: parameter,
  });
}
//加载课程中遗漏的五个数据
export function courseListMore(url) {
  return request({
    url: url,
    method: "get",
    params: {
      pageNum: 2,
      pageSize: 5,
    },
  });
}
//加载课程走马灯
export function courseCarousel() {
  return request({
    url: courseSelectList.courseCarousel,
    method: "get",
  });
}
//请求加载课程图片
export function loadCourseImage(course) {
  return request({
    url: imageUrl,
    method: "get",
    params: course,
    responseType: "blob",
  });
}
//加载视频的url
export function loadCourseVedio(courseId) {
  return request({
    url: courseInfoList.courseDetail(courseId),
    method: "post",
  });
}
//加载课程选择详情
export function loadCourseSelectDetail(courseId) {
  return request({
    url: courseSelectList.courseDetail,
    method: "get",
    params: {courseId},
  });
}
//选择一门课程:查询是否选择了这门课程
export function isChooseCourse(courseId) {
  return request({
    url:courseSelectList.courseChoose(courseId),
    method:"get",
  })
}
//选择一门课程：没有选这门课，则将这门课选上
export function chooseCourse(courseId){
  return request({
    url:courseSelectList.courseChoose(courseId),
    method:"put"
  })
}