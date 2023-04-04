<template lang="">
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
          :prop="tableprop" sortable />
        </el-table-column>
      </template>
    </CourseTable>
  </div>
</template>
<script>
  import CourseTable from '@/components/CourseTable';
  import CourseSearchBar from '@/components/CourseSearchBar';
  import teacherInterface from '@/api/teacherInterface';
  import teacherTableData from '@/api/teacherTableData';
  export default {
    name: 'TStudentManage',
    components: {
      CourseTable,
      CourseSearchBar,
    },
    data() {
      return {
        tableInfo: teacherTableData,//导入的表名
        aTableInterface: teacherInterface,//请求接口
        showAlters: false,//告诉表格子组件不展示修改新增功能
        prefix:'',//用来恢复前缀，避免多点击变长
      }
    },
    methods: {
      //拼接前缀
      assembleUrl() {
        this.prefix=this.aTableInterface.prefix;
        this.aTableInterface.prefix = this.aTableInterface.prefix + '/' + this.$route.params.teacherId + '/' + this.$route.params.courseId;
      }
    },
    created() {
      this.assembleUrl();
    },
    destroyed() {
      //还原prefix
      this.aTableInterface.prefix=this.prefix;
    },
  }
</script>
<style scoped>

</style>