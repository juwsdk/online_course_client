<template>
  <el-container style="min-height:100vh;
      min-width: 400px;
      width: 100%;">
    <CourseSider />
    <el-container style="flex-direction: column;">
      <CourseHeader />
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
  }
</script>
<style>

</style>