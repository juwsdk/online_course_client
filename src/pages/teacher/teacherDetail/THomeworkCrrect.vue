<template lang="">
  <div>
    <el-collapse>
      <FileDownloadCard v-for="(homeworkItem,index) in homeworkList" :key="index" :index="index" :comptype="comptype"
        :homeworkItem="homeworkItem" />
    </el-collapse>
  </div>
</template>
<script>
  import FileDownloadCard from '@/components/FileDownloadCard';
  import homeworkInterface from '@/api/homeworkInterface';
  import axios from '@/api';
  export default {
    name: 'HomWAssCorrect',
    components: {
      FileDownloadCard
    },
    data() {
      return {
        comptype: 'teacher',//告诉fileDownloadCard组件这是教师类型的
        homeworkList:[],
        homeworkInterface,//有关作业的接口
      }
    },
    methods: {
      //获取布置的作业
      loadHomeworkData() {
        axios.post(this.homeworkInterface.prefix + '/' + this.$route.params.courseId + this.homeworkInterface.homeworkList)
          .then(res => {
            // console.log(res);
            this.homeworkList = res.data;
          })
          .catch(err => {
            console.error(err);
          })
      },
    },
    mounted() {
      this.loadHomeworkData();
    },
  }
</script>
<style lang="">

</style>