import request from "@/api";
import store from "@/store";

const courseResInterface = {
  upload: "/video/upload",
  get load(){
    return function (courseId){
      return "/video/"+courseId+"/showFileList"
    }
  },
  get deleteOne(){
    return "/video/"+store.getters.getTeacherId+"/fileDelete"
  },
  update:"/video/fileUpdate",
  get clearAll(){
    return function (courseId){
      return "/video/" + store.getters.getTeacherId + "/" + courseId + "/filesDelete"
    }
  }
};
//上传视频资源
export function uploadVideo(formData) {
  return request({
    url: courseResInterface.upload,
    method: "post",
    data: formData,
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN",
    },
  });
}
//加载视频资源的信息
export function loadVideo(courseId){
  return request({
    url:courseResInterface.load(courseId),
    method:"post",
  })
}
//删除视频资源
export function deleteVideo(courseRes){
  return request({
    url:courseResInterface.deleteOne,
    method:"delete",
    data:courseRes
  })
}
//修改视频资源
export function updateVideo(file){
  return request({
    url:courseResInterface.update,
    method:"put",
    data:file
  })
}
//清空上传的资源
export function clearAllVideo(courseId){
  return request({
    url:courseResInterface.clearAll(courseId),
    method:"delete",
  })
}