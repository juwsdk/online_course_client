<template lang="">
  <DetailView>
    <template v-slot:pageHeader>
      <el-page-header @back="goBack" :content="'课程页面'+$route.params.courseId">
      </el-page-header>
    </template>
    <template v-slot:pageAside>
      <el-menu class="el-menu-vertical-demo" style="width:200px;
       height: 100%;
       overflow-x: hidden;
       overflow-y: scroll;">
        <el-menu-item v-for="courseRoute in courseRoutes" :key="courseRoute.courseResId"
        @click="showVedio(courseRoute.resFileName)">
          <span slot="title">{{courseRoute.resVideoName}}</span>
        </el-menu-item>
      </el-menu>
    </template>

    <template v-slot:pageMain>
      <CourseVedio :srcUrl="srcUrl"/>
    </template>
  </DetailView>
</template>
<script>
  import DetailView from '@/layout/CourseDetail';
  import CourseVedio from '@/components/CourseVedio';
  import { courseInfoInterface } from '@/api/courseInterface';
  import axios from '@/api';
  export default {
    name: 'CoursesDetail',
    components: {
      DetailView,
      CourseVedio
    },
    data() {
      return {
        courseInfoInterface,//课程接口信息
        courseRoutes: [], //课程集数目录
        srcUrl:'',//传递给子组件文件url
      }
    },
    methods: {
      //跳转到详情页面
      goBack() {
        this.$router.replace('/course/mycourse/courses');
      },
      //加载数据
      loadData() {
        axios.post(courseInfoInterface.prefix + courseInfoInterface.courseDetail + '/' + this.$route.params.courseId)
          .then(res => {
            // console.log(res);
            this.courseRoutes = res.data;
            this.showVedio(res.data[0].resFileName);
            console.log('22222222222222');
            console.log(1111111111+this.srcUrl);
          })
          .catch(err => {
            console.error(err);
          })
      },
      //点击路由展示相应的视频组件
      showVedio(filename){
        console.log(filename);
        this.srcUrl='/'+this.$route.params.teacherId+'/'+ this.$route.params.courseId+'/res/'+ filename.trim();
      }
    },
    
    mounted() {
      this.loadData();
    },
  }
</script>
<style scoped>
</style>