<template>
  <div>
    <CourseCards class="myCourseCards" :courseInterface="courseInterface" @loadCourse="loadCourse">
      <template v-slot:cards>
        <CourseCard v-for="listItem of list" :key="listItem.courseId" style="
        flex-basis: calc(25% - 10px);
        margin-right: 10px;
        align-items: center;
        " :courseInfo="listItem" 
        :routeName="routeName"/>
      </template>
    </CourseCards>
  </div>
</template>
<script>
  import CourseCards from '@/components/CourseCards';
  import CourseCard from '@/components/CourseCard';
  import {teacherCourseInterface} from "@/api/teacher/courseApi";
  export default {
    name: 'TCourseMange',
    components:{
      CourseCard,
      CourseCards
    },
    data() {
      return {
        routeName:'courseMangeD',
        courseInterface:teacherCourseInterface,//接口
        list:[],//存放课程信息
      }
    },
    methods: {
      loadCourse(list) {
        this.list = list;
      },
    },
  }
</script>
<style scoped>
.myCourseCards{
  padding-top: 10px;
  height: 90%;
  min-width: 400px;
  width: 1200px;
  margin: 0 auto;
}
</style>