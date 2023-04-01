<template>
  <div>
    <!-- 放置卡片的插槽 -->
    <div id="sklonbody">
      <slot name="cards"></slot>
    </div>

    <!-- 放置分页组件 -->
    <el-row style="margin:10px 0">
      <el-col :span="12" :offset="8">
        <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size.sync="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import CourseCard from './CourseCard';
  import axios from '@/api';
  export default {
    name: 'CourseCards',
    components: {
      CourseCard,
    },
    props: ['courseInterface', 'aPageSize'],
    data() {
      return {
        currentPage: 1,//控制分页
        total: 4,//文本总数
        pageSize: 5,
        courseData: [],//课程数据
        // myindex:20//假数据
      }
    },
    computed: {
    },
    methods: {
      //控制分页
      handleCurrentChange(pageNum) {
        this.currentPage = pageNum;
        //当前不是第一页则后面的通知父组件改变样式
        if (this.$parent.$options.name=='CourseSelect' && this.currentPage > 1) {
          this.$emit('styleChange', false);
          this.pageSize=10;
        }
        else {
          this.$emit('styleChange', true);
          this.pageSize=5;
        }
        // this.handleSizeChange(this.pageSize);
        this.loadData();
      },

      //请求数据,分页展示
      loadData() {
        axios.get(this.courseInterface.prefix + this.courseInterface.courseList, {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
          }
        })
          .then(res => {
            // console.log(res);
            this.total = res.data.total;
            this.courseData = res.data.list;
            this.$emit('loadCourse', this.courseData);
          })
          .catch(err => {
            console.error(err);
          })
      },
    },
    mounted() {
      this.loadData();
    },
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

  /* justify-content: space-between; */
  /* padding: 10px; */
</style>