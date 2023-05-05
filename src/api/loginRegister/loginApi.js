import request from "@/api";

const loginInterface={
  login:"/dataCommit/login",
  register:"/dataCommit/register",
  logout:"/dataCommit/logout"
};
//登录
export function login(user){
  return request({
    url:loginInterface.login,
    method:'post',
    data:user
  })
}
//注册
export function register(type,user){
  return request({
    url:loginInterface.register+'/'+type,
    method:'post',
    data:user
  })
}
//登出
export function logOut(){
  return request({
    url:loginInterface.logout,
    method:'get'
  })
}