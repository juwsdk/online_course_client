<template lang="">
  <div>
    <el-container direction="vertical">
      <!--  -->
      <el-header height="" style="background-color: antiquewhite;">
        <!-- 用于展示标题和回退页面 -->
        <el-page-header @back="goBack" :content="course.courseName">
        </el-page-header>
      </el-header>

      <!--  -->
      <el-main height="" style="background-color: aquamarine;padding: 0;">
        <div style="background-color: aqua;height: 300px;">
          <!-- 放置图像 -->
          <div class="demo-image__error">
            <div class="block">
              <span class="demonstration">默认</span>
              <!-- <el-image></el-image> -->
            </div>
          </div>
        </div>
        <div id="courseInfo">
          <span>课程介绍:</span>
          <article>{{course.courseInfo}}</article>
        </div>
      </el-main>
      
    </el-container>

  </div>
</template>
<script>
  import { courseSelectInterface } from '@/data/courseInterface';
  import axios from '@/api';
  export default {
    name: 'CourseSelectDetail',
    data() {
      return {
        course: [],//从后端获得的路由信息
        courseSelectInterface//接口
      }
    },
    methods: {
      //返回上一页
      goBack() {
        this.$router.replace('/course/courseselects/courseselect');
      },
      //加载数据
      loadData() {
        axios.get(this.courseSelectInterface.prefix + this.courseSelectInterface.courseDetail, {
          params: {
            courseId: this.$route.params.id
          }
        })
          .then(res => {
            this.course = res.data;
            console.log(this.$route.params.id);
          })
          .catch(err => {
            console.error(err);
          })
      }
    },
    mounted() {
      this.loadData();
    },
  }
</script>
<style scoped>
  #courseInfo {
    font-size: large;
    height: calc(80vh - 300px);
  }

  #courseInfo>* {
    font-size: large;
  }
</style>