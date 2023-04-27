<template>
  <div>
    <CourseTable :tableInterfce="aTableInterface" :tableInfo="tableInfo"
        :showOptions="showOptions">
        <template v-slot:selectOneG>
          <el-option v-for="(searchvalue,searchlable,index) in tableInfo" :label="searchlable" :value="searchvalue"
            :key="index">
          </el-option>
        </template>

        <template v-slot:atablecol>
          <el-table-column v-for="(tableprop,tablelable,index) in tableInfo" :key="index" :label="tablelable"
            :prop="tableprop" sortable />
          <!-- </el-table-column> -->
        </template>

      </CourseTable>
  </div>
</template>
<script>
  import axios from '@/api';
  import {clockInterface} from '@/api/questionInterface';
  import {teacherFindStudentClock} from '@/api/teacherTableData';
  import CourseTable from '@/components/CourseTable';
export default {
  name:'TStudentClockIn',//学生打卡
  components:{
    CourseTable
  },
  data() {
    return {
      aTableInterface:clockInterface,
      tableInfo:teacherFindStudentClock,
      showOptions:false,
      prefix:'',//存放前缀，用来拼接url
    }
  },
  methods: {
    assembleUrl(){
      this.prefix=this.aTableInterface.tableList;
      this.aTableInterface.tableList='/'+this.$route.params.courseId+this.aTableInterface.tableList;
    },

  },
  created() {
    this.assembleUrl();
  },
  destroyed() {
    // this.aTableInterface
  },
  // computed:{
  //   ATableInterface(){
  //     this.aTableInterface.tableList='/'+this.$route.params.courseId+this.aTableInterface.tableList;
  //     console.log(this.aTableInterface.tableList);
  //     return this.aTableInterface;
  //   }
  // }
}
</script>
<style lang="">
  
</style>