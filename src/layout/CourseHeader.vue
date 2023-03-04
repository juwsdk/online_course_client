<template lang="">
  <el-header class="myheader">
    <el-row>
      <el-col :span="4" class="item">网课管理系统<div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4" :push="16" class="item">
        <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      <div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </el-header>
</template>
<script>
export default {
  name:'CourseHeader'
}
</script>
<style scoped>
  .myheader{
    /* background-color:#eff6fc; */
    width: 100%;
    color: black;
    text-align: center;
    min-width: 400px;
    border-bottom: 1px solid lightgray;
  }
  .item{
    padding-top: 10px;
    padding-bottom: 5px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>