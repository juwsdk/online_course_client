<template>
  <div>
    <div id="sklonbody">
      <slot name="cards"></slot>
    </div>
    <el-row style="margin:10px 0">
      <el-col :span="12" :offset="8">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="pageSize" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import CourseCard from './CourseCard';
  export default {
    name: 'CourseCards',
    components: {
      CourseCard,
    },
    data() {
      return {
        currentPage: 1,//控制分页
        total: 4,//文本总数
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
    }
  }
</script>
<style>
  #sklonbody {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    height: auto;
    min-width: 400px;
  }
   /* justify-content: space-between; *//* padding: 10px; */
</style>