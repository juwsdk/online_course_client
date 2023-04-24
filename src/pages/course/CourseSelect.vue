<template>
  <div :style="isLoading" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 走马灯  v-show控制是否显示，在第一页则显示，否则不显示-->
    <el-carousel indicator-position="outside" v-show="isNotableShow" >
      <el-carousel-item v-for="notableitem in notableList" :key="notableitem.courseId" @click.native="pushShow(notableitem)">
        <h3>{{ notableitem.courseName }}</h3>
      </el-carousel-item>
    </el-carousel>

    <!-- 卡片列表 -->
    <CourseCards :courseInterface="courseInterface" @loadCourse="loadCourse" @styleChange="styleChange"
      :aPageSize="aPageSize">
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
  import axios from '@/api';
  import CourseCards from '@/components/CourseCards';
  import CourseCard from '@/components/CourseCard';
  import { courseSelectInterface } from '@/api/courseInterface';
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
        isNotableShow: true,
        aPageSize: 5,//给子传这个页面数据多少
        notableList: [],//走马灯的内容
        loading: true
      }
    },
    computed: {
    },
    methods: {
      //子传父,子页面发送axios请求将数据发送到这里
      loadCourse(list) {
        // this.number=pageSize;
        this.list = list;
        this.loading = false;
      },
      //子传父，chards页面根据当前是第几页来决定是否展示走马灯notable
      styleChange(isShow) {
        this.isNotableShow = isShow;
      },
      //加载请求走马灯的内容
      loadData() {
        axios.get("/course/courseTopList")
          .then(res => {
            console.log('走马灯数据');
            console.log(res)
            this.notableList = res.data;
            this.loading = false;
          })
          .catch(err => {
            console.error(err);
          })
      },
      pushShow(notableitem) {//走马灯点击加载详情页面
        this.$router.push({//通过push跳转页面
          name: 'course-select-detial',
          params: {
            teacherId: notableitem.teacherId,
            courseId: notableitem.courseId
          },
        });
      }
    },
    mounted() {
      this.loadData();//加载走马灯
    },
    computed: {
      //是否加载完成
      isLoading() {
        // console.log('1111111111');
        return this.loading ? { height: '88vh' } : { height: 'auto' };
      }
    }

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