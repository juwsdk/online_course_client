<template lang="">
  <DetailView>
    <template v-slot:pageHeader>
      <el-page-header @back="goBack" :content="'课程详情'+$route.params.id">
      </el-page-header>
    </template>

    <template v-slot:pageAside>
      <el-menu default-active="2" class="el-menu-vertical-demo" style="width:200px;">
        <el-menu-item>
          <span slot="title">学生管理</span>
        </el-menu-item>
        <el-menu-item>
          <span slot="title">上传资源</span>
        </el-menu-item>
        <el-menu-item>
          <span slot="title">作业布置</span>
        </el-menu-item>
        <el-menu-item>
          <span slot="title">作业修改</span>
        </el-menu-item>
        <el-menu-item>
          <span slot="title">学生打卡信息</span>
        </el-menu-item>
      </el-menu>
    </template>

    <template v-slot:pageMain>
      <router-view></router-view>
    </template>

  </DetailView>
</template>
<script>
  import DetailView from '@/layout/CourseDetail';
  export default {
    name: 'TCourseMangeDeta',
    components: {
      DetailView
    },
    methods: {
      goBack() {//跳转到详情页面
        this.$router.replace('/teacher/coursemanges/coursemange');
      }
    },
  }
</script>
<style scoped>

</style>