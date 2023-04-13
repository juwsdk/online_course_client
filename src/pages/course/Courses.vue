<template lang="">
  <div style="height: calc( 100vh - 100px);" v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <CourseCards class="myCourseCards" :courseInterface="courseInterface" @loadCourse="loadCourse"
      :apageSize="apageSize">
      <template v-slot:cards>
        <CourseCard v-for="listItem of list" :key="listItem.courseId" style="
          flex-basis: calc(25% - 10px);
          margin-right: 10px;
          align-items: center;
          " :courseInfo="listItem" :routeName="routeName" />
      </template>
    </CourseCards>

    <!-- <CourseCard v-for="index of total" :key="index" style="
        flex-basis: calc(25% - 10px);
        margin-right: 10px;
        align-items: center;
        " :courseInfo="index" />
    </div>
    <el-row style="margin:10px 0">
      <el-col :span="12" :offset="8">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="pageSize" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
  import CourseCards from '@/components/CourseCards';
  import CourseCard from '@/components/CourseCard';
  import { courseInfoInterface } from '@/api/courseInterface';
  export default {
    name: 'Courses',
    components: {
      CourseCards,
      CourseCard
    },
    data() {
      return {
        routeName: 'CoursesDetail',
        courseInterface: courseInfoInterface,
        list: [],//获取信息用于卡片展示
        apageSize: 10,
        loading:true,//是否收到了数据，没收到则转圈
      }

    },
    methods: {
      loadCourse(list) {
        this.list = list;
        if(list!=null)
          this.loading=false;
        // console.log(list);
      },
    },

  }
</script>
<style scoped>
  .myCourseCards {
    height: 100%;
    overflow: auto;
  }
</style>