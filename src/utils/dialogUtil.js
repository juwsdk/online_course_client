
export function MessageConfirmBox(vm,noticeInfo){
  return vm.$confirm(noticeInfo, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
}