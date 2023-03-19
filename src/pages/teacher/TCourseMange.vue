<template lang="">
  <div>
    <p ><el-button type="primary" size="mini">新增课程</el-button></p>
    
    <CourseCards class="myCourseCards">
      <template v-slot:cards>
        <CourseCard v-for="index of 8" :key="index" style="
        flex-basis: calc(25% - 10px);
        margin-right: 10px;
        align-items: center;
        " :courseInfo="index" 
        :routeName="routeName"/>
      </template>
    </CourseCards>
  </div>
</template>
<script>
  import CourseCards from '@/components/CourseCards';
  import CourseCard from '@/components/CourseCard';
  export default {
    name: 'TCourseMange',
    components:{
      CourseCard,
      CourseCards
    },
    data() {
      return {
        routeName:'courseMangeD',
      }
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