<template lang="">
  <DetailView>
    <template v-slot:pageHeader>
      <el-page-header @back="goBack" :content="'课程详情'+$route.params.courseId">
      </el-page-header>
    </template>

    <template v-slot:pageAside>
      <el-menu default-active="2" class="el-menu-vertical-demo" style="width:200px;" @select="handleMenuItemClick">
        <el-menu-item index="tStudentManage" >
          <span slot="title">学生管理</span>
        </el-menu-item>
        <el-menu-item index="tResSubmit">
          <span slot="title">上传资源</span>
        </el-menu-item>
        <el-menu-item index="homeworkass">
          <span slot="title">作业布置</span>
        </el-menu-item>
        <el-menu-item index="homWAssCorrect">
          <span slot="title">作业修改</span>
        </el-menu-item>
        <el-menu-item index="tStudentClockIn">
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
    data() {
      return {
        path: "",//获取当前路径
      }
    },
    methods: {
      goBack() {//跳转到详情页面
        this.$router.replace('/teacher/coursemanges/coursemange');
      },
      handleMenuItemClick(index) {
        this.$router.replace({
          name:index
        }).catch(error => {
          if (error.name !== 'NavigationDuplicated') {
            throw error
          }
        })
      },

    },
    created() {
      
    },
  }
</script>
<style scoped>

</style>