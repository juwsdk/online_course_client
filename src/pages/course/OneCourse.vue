<template lang="">
  <div>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    
    <div style="display: flex;">
      <el-main style="height: 80vh; background-color: antiquewhite;flex-grow: 4;">
        <span>这是具体的课程{{$route.params.id}}</span>
        <!-- 展示具体课程 -->
        <router-view />
      </el-main>

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
    </div>

  </div>
</template>
<script>
  export default {
    name: 'OneCourse',
    methods: {
      goBack() {//跳转到详情页面
        this.$router.replace('/course/mycourse/courses');
      }
    },
  }
</script>
<style lang="">

</style>