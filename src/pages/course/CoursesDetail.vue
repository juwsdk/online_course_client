<template lang="">
  <DetailView>
    <template v-slot:pageHeader>
      <el-page-header @back="goBack" :content="'课程页面'+$route.params.id">
      </el-page-header>
    </template>
    <template v-slot:pageAside>
      <el-menu default-active="2" class="el-menu-vertical-demo" style="width:200px;">
        <el-menu-item>
          <span slot="title">1</span>
        </el-menu-item>
        <el-menu-item>
          <span slot="title">2</span>
        </el-menu-item>
        <el-menu-item>
          <span slot="title">3</span>
        </el-menu-item>
        <el-menu-item>
          <span slot="title">4</span>
        </el-menu-item>
      </el-menu>
    </template>
    
    <template v-slot:pageMain>
      <CourseVedio />
    </template>
  </DetailView>
</template>
<script>
  import DetailView from '@/layout/CourseDetail';
  import CourseVedio from '@/components/CourseVedio';
  export default {
    name: 'CoursesDetail',
    components: {
      DetailView,
      CourseVedio
    },
    methods: {
      goBack() {//跳转到详情页面
        this.$router.replace('/course/mycourse/courses');
      }
    },
  }
</script>
<style>

</style>