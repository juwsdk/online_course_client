<template lang="">
  <el-aside class="myside" style="
  font-size: 10px;
  color:white;
  background-color: #424f63;
  width: 200px;
  /* overflow-x: hidden; */
  /* border-right: 1px solid lightgray; */
  ">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false" circle>展开</el-radio-button>
      <el-radio-button :label="true" circle>收起</el-radio-button>
    </el-radio-group> -->
    <!-- <el-button   type="success" @click="handle" style="height: 5vh; border-radius: 0; width: auto;"></el-button> -->
    <el-menu 
    :collapse="isCollapse"
     router text-color="#FFF" background-color="#424f63"   style="/*width: 150px;*/"  default-active="1-4-1"
      class="elMenuVertical"
      >
      <el-menu-item index="/myindex">
        <i class="el-icon-s-home"></i>
        <span slot="title">我的主页</span>
      </el-menu-item>
      <!-- 课程 -->
      <el-submenu index="#">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">课程管理</span>
        </template>
        <el-menu-item index="/course/courses">
          <i class="el-icon-monitor"></i>
          <span slot="title">我的课程</span>
        </el-menu-item>
        <el-menu-item index="/course/courseselect">
          <i class="el-icon-reading"></i>
          <span slot="title">公共选课</span>
        </el-menu-item>
        <el-menu-item index="/course/coursesta">
          <i class="el-icon-s-data"></i>
          <span slot="title">打卡/统计</span>
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="/homework">
        <i class="el-icon-notebook-1"></i>
        <span>作业</span>
      </el-menu-item>

      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>管理</span>
        </template>
        <el-menu-item >
          <i class="el-icon-bank-card"></i>
          <span>Op管理</span>
        </el-menu-item>
        <el-menu-item >
          <i class="el-icon-s-custom"></i>
          <span>教师管理</span>
        </el-menu-item>
        <el-menu-item >
          <i class="el-icon-s-check"></i>
          <span>学生管理</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="6">
        <i class="el-icon-s-data"></i>
          <span slot="title">查询/统计</span>
      </el-menu-item>
      
    </el-menu>
  </el-aside>
</template>
<script>
  export default {
    name: 'CourseSider',
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handle(){
        this.isCollapse=!this.isCollapse;
      },
    },
    computed: {

    }
  }
</script>
<style scoped>
  .elMenuVertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>