<template>
  <div>
    <!-- 放置卡片的插槽 -->
    <div id="sklonbody">
      <slot name="cards"></slot>
    </div>

    <!-- 放置分页组件 -->
    <el-row style="margin:10px 0">
      <el-col :span="12" :offset="8">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size.sync="pageSize"
          layout="total, prev, pager, next, jumper" :total="total">
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
    props: { courseInterface: { type: Object, required: true }, aPageSize: { type: Number, required: false, default: 10 } },
    data() {
      return {
        currentPage: 1,//控制分页
        total: 4,//文本总数
        pageSize: this.aPageSize,
        courseData: [],//课程数据
        totalPage: 0,//总页数
        // myindex:20//假数据
      }
    },
    computed: {
    },
    methods: {
      //控制分页
      handleCurrentChange(pageNum) {
        this.currentPage = pageNum;
        console.log('==================');
        console.log(this.pageSize);
        console.log(this.total);
        this.totalPage = Math.ceil(this.total / this.pageSize);
        //当前不是第一页则后面的通知父组件改变样式
        if (this.$parent.$options.name == 'CourseSelect' && this.currentPage !== 1) {
          this.$emit('styleChange', false);
          this.pageSize = 10;
        }
        else {
          this.$emit('styleChange', true);
          this.pageSize = 5;
        }
        // this.handleSizeChange(this.pageSize);

        this.loadData();
      },

      //请求数据,分页展示
      loadData() {
        console.log(this.totalPage);
        axios.get(this.courseInterface.prefix + this.courseInterface.courseList, {
          params: {
            pageNum: /* pageNum */this.currentPage,
            pageSize: this.pageSize,
          }
        })
          .then(res => {
            // console.log(res);
            this.total = res.data.total;
            this.courseData = res.data.list;
            console.log(res.data.list);
            this.$emit('loadCourse', this.courseData);
            //如果是courseSelect父页面，那么6-10因为切换没有访问到，加入到最后的一个页面中展示
            if (this.totalPage == this.currentPage && this.$parent.$options.name == 'CourseSelect') {
              //请求6-10的数据
              axios.get(this.courseInterface.prefix + this.courseInterface.courseList, {
                params: {
                  pageNum: 2,
                  pageSize: 5,
                }
              })
                .then(res => {
                  // console.log(res);
                  // const newData = res.data.list.filter(item => !this.courseData.some(course => course.courseId === item.courseId));
                  this.courseData.push(...res.data.list);
                  console.log('=====================');
                  console.log(this.courseData);
                  // console.log(res.data.list);
                  this.$emit('loadCourse', this.courseData);
                })
                .catch(err => {
                  console.error(err);
                })
            }
          })
          .catch(err => {
            console.error(err);
          });

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