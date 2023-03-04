<template lang="">
  <el-header class="myheader">
    <el-row>
      <el-col :span="1" :offset="0">
        <i v-if="!isCollapse" class="el-icon-s-fold" @click="changeMenu"></i>
        <i v-if="isCollapse" class="el-icon-s-unfold" @click="changeMenu"></i>
      </el-col>
      <el-col :span="4" class="item">网课管理系统<div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4" :push="15" class="item">
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
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </el-header>
</template>
<script>
  export default {
    name: 'CourseHeader',
    props:['isCollapse'],
    methods: {
      //切换按钮
      changeMenu(){
        this.$emit('changeShow');//子传父
      }
    },
  }
</script>
<style scoped>
  .myheader {
    height: 100px;
    /* background-color:#eff6fc; */
    width: 100%;
    color: black;
    text-align: center;
    min-width: 400px;
    border-bottom: 1px solid lightgray;
    padding-left: 0;

  }

  .el-row {
    display: flex;
    height: 100%;
    /* justify-items: center; */
    align-items: center;
  }

  .el-row :first-child {
    height: 100%;
    /* overflow: hidden; */
    cursor: pointer;
  }

  .el-icon-s-fold,
  .el-icon-s-unfold {
    /* height: 100%; */
    width: 100%;
    font-size: 40px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>