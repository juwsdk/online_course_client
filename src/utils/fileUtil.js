export const handleA=(res)=>{
  // 拿到响应头
  const contentType = res.headers['content-type'];
  //获取文件名
  const contentDispositionHeader = res.headers['content-disposition'];
  const encodedFileName = contentDispositionHeader.split('filename*=UTF-8\'\'')[1];
  const fileName = decodeURI(encodedFileName);
  // 生成Blob对象然后创建URL
  const url = window.URL.createObjectURL(new Blob([res.data], { type: contentType }));
  // 创建 a 标签，设置下载链接和文件名
  const link = document.createElement('a');
  link.href = url;
  //下载
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  // 下载完成后释放URL
  window.URL.revokeObjectURL(url);
}