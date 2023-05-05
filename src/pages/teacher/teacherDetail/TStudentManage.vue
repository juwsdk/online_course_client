<template>
  <div>
    <!-- 这是学生管理页面 -->
    <CourseTable :tableInterfce="aTableInterface" :tableInfo="tableInfo" :showAlters="showAlters">
      <template v-slot:selectOneG>
        <el-option v-for="(searchvalue,searchlable,index) in tableInfo" :label="searchlable" :value="searchvalue"
          :key="index">
        </el-option>
      </template>
      <template v-slot:atablecol>
        <el-table-column v-for="(tableprop,tablelable,index) in tableInfo" :key="index" :label="tablelable"
          :prop="tableprop" sortable >
        </el-table-column>
      </template>
    </CourseTable>
  </div>
</template>
<script>
  import CourseTable from '@/components/CourseTable';
  import {oneCourseTableList} from '@/api/teacher/courseTableAPi';
  import {studentTable} from '@/api/teacher/teacherTableData';
  export default {
    name: 'TStudentManage',//学生管理
    components: {
      CourseTable,
    },
    data() {
      return {
        tableInfo: studentTable,//导入的表名
        aTableInterface: oneCourseTableList,//请求接口
        showAlters: false,//告诉表格子组件不展示修改新增功能
      }
    },
    methods: {
      //拼接前缀
      assembleUrl(){
        oneCourseTableList.tableList=this.$route.params.courseId;
      }
    },
    created() {
      this.assembleUrl();
    },
  }
</script>
<style scoped>

</style>