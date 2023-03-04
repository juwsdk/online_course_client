<template>
  <el-container style="min-height:100vh;
      min-width: 400px;
      width: 100%;"
      >
    <CourseSider :isCollapse="isCollapse" />
    <el-container style="flex-direction: column;" >
      <CourseHeader @changeShow="changeShow" :isCollapse="isCollapse" />
      <el-main>
        <!-- 页面展示区域 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import CourseSider from './CourseSider';
  import CourseHeader from './CourseHeader';
  export default {
    name: 'CourseLayout',
    components: {
      CourseSider,
      CourseHeader
    },
    data(){
      return{
        isCollapse:false
      }
    },
    methods: {
      changeShow(){
        this.isCollapse=!this.isCollapse
      }
    },

  }
</script>
<style>
</style>