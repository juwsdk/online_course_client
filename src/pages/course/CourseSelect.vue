<template lang="">
  <div>
    <!-- 走马灯 -->
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <CourseCards style="height: calc( 90vh - 450px);"/>
  </div>
</template>
<script>
  import CourseCards from '@/components/CourseCards';
  export default {
    name: 'CourseSelect',
    components: {
      CourseCards
    },
    data() {
      return {
        currentPage: 1,//控制分页
        total: 5,//文本总数
        pageSize: [5, 10, 20, 25],
        // myindex:20//假数据

      }
    },
    computed: {
      courseInfo() {
        this.courseInfo++;
      }
    },
    methods: {
      handleCurrentChange(pageNum) {
        this.pageNum = pageNum;
      },//控制分页
      handleSizeChange(pagesize) {
        this.total = pagesize * this.pageNum;
      },//控制分页大小
    },

  }
</script>
<style >
.el-carousel{
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