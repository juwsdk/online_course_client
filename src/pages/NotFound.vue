<template >
  <div id="divBody">
    <div id="fontBody">
      404页面不存在
    </div>
  </div>
</template>
<script>
export default {
  name:'NotFound',
}
</script>
<style >
  #divBody{
    background-image: linear-gradient(135deg,#5b247a,#1bcedf);
    width: 100%;
    height: 100vh;
    position: relative;
  }
  #fontBody{
    position: absolute;
    width: 50%;
    height: 50vh;
    /* background-color: #1bcedf; */
    /* 以下样式设置居中 */
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    line-height: 50vh;
    font-size: 50px;
    color: white;
  }
</style>