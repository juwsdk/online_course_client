<template lang="">
  <div>
    <!-- 走马灯 -->
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <CourseCards >
      <template v-slot:cards>
        <CourseCard v-for="index of 5" :key="index" style="
      flex-basis: calc(20% - 10px);
      margin-right: 10px;
      align-items: center;
      " :courseInfo="index" :routeName="routeName" />
      </template>
    </CourseCards>
  </div>
</template>
<script>
  import CourseCards from '@/components/CourseCards';
  import CourseCard from '@/components/CourseCard';
  export default {
    name: 'CourseSelect',
    components: {
      CourseCards,
      CourseCard
    },
    data() {
      return {
        routeName: 'course-select-detial'
      }
    },
    computed: {
    },
    methods: {

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