import request from "@/api";
//加载请求表格数据
export function loadTableData(url,parameter){
  return request({
    url:url,
    method:'get',
    params:parameter,
  })
}
//增加表格数据
export function addData(url,parameter){
  return request({
    url:url,
    method:'post',
    data:parameter
  })
}

//修改表格数据
export function changeData(url,parameter){
  return request({
    url:url,
    method:'put',
    data:parameter
  })
}
//删除表格数据
export function deleteData(url,parameter){
  return request({
    url:url,
    method:'post',
    data:parameter
  })
}