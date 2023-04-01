<template lang="">
    <div style="height: calc( 100vh - 100px);">
      <CourseCards class="myCourseCards">
        <template v-slot:cards>
          <CourseCard v-for="index of 8" :key="index" style="
          flex-basis: calc(25% - 10px);
          margin-right: 10px;
          align-items: center;
          " :courseInfo="index" 
          :routeName="routeName" @loadCourse="loadCourse"/>
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
  export default {
    name: 'Courses',
    components: {
      CourseCards,
      CourseCard
    },
    data() {
      return {
        routeName:'CoursesDetail',
        courseInterface:'',
        list:[],//获取信息用于卡片展示
      }
      
    },
  
  }
</script>
<style scoped>
.myCourseCards{
  height: 100%;
  overflow: scroll;
}
</style>