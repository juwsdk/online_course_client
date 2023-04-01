<template lang="">
  <div>
    <!-- 走马灯  v-if控制是否显示，在第一页则显示，否则不显示-->
    <el-carousel indicator-position="outside" v-if="isNotableShow">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <!-- 卡片列表 -->
    <CourseCards :courseInterface="courseInterface"  @loadCourse="loadCourse" @styleChange="styleChange">
      <!-- 通过插槽放入具体的卡片 -->
      <template v-slot:cards>
        <CourseCard v-for="(listItem of list" :key="listItem.courseId" style="
      flex-basis: calc(20% - 10px);
      margin-right: 10px;
      align-items: center;
      " :courseInfo="listItem" :routeName="routeName" />
      </template>

    </CourseCards>

  </div>
</template>
<script>
  import CourseCards from '@/components/CourseCards';
  import CourseCard from '@/components/CourseCard';
  import { courseSelectInterface } from '@/data/courseInterface';
  export default {
    name: 'CourseSelect',
    components: {
      CourseCards,
      CourseCard
    },
    data() {
      return {
        routeName: 'course-select-detial',
        courseInterface: courseSelectInterface,
        // number:5,
        list: [],//存放课程信息，课程信息是courseCards通过axios请求获取的
        isNotableShow:true,
      }
    },
    computed: {
    },
    methods: {
      //子传父,子页面发送axios请求将数据发送到这里
      loadCourse(list) {
        // this.number=pageSize;
        this.list = list;
      },
      //子传父，chards页面根据当前是第几页来决定是否展示走马灯notable
      styleChange(isShow){
        this.isNotableShow=isShow;
      },
    },

  }
</script>
<style>
  .el-carousel {
    text-align: center;
    margin: 0 auto;
    width: 80%;
    /* height: 300px; */
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>