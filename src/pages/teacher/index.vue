<template lang="">
  <div>
    <el-descriptions title="教师信息"  :labelStyle="{ fontSize: '16px',color:'#434863' }" :contentStyle="{ fontSize: '14px' }" >
      <template slot="extra">
        <el-button type="primary" size="small">修改</el-button>
      </template>
      <el-descriptions-item label="教师名">kooriookami</el-descriptions-item>
      <el-descriptions-item label="教授课程数"></el-descriptions-item>
      <el-descriptions-item label="选课人数">苏州市</el-descriptions-item>
      <el-descriptions-item label="教授的课程">课程</el-descriptions-item>
    </el-descriptions>
    <el-button type="success" size="mini" @click="addCourse">新增课程</el-button>
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
  import { teacherFindStudetTable } from '@/api/teacherTableData';
  import teacherMangeStudent from '@/api/teacherInterface';
  export default {
    name: 'TeacherIndex',
    components: {
      CourseTable,
    },
    data() {
      return {
        tableInfo: teacherFindStudetTable,
        aTableInterface: teacherMangeStudent,
        teacherId: '',
        showAlters: false,//告诉表格子组件不展示修改新增功能
      }
    },
    methods: {
      //拼接前缀
      assembleUrl() {
        console.log(this.aTableInterface);
        // console.log('=============================');
        this.teacherId = this.aTableInterface.tableList;
        console.log(this.teacherId);
        this.aTableInterface.tableList = '/6120101' + this.aTableInterface.tableList;
      },
      //请求教师信息
      loadData(){
        axios.get("",params)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err); 
        })
      },
      addCourse(){
        //增加课程
      }
    },
    created() {
      this.assembleUrl()
    },
    destroyed() {
      this.aTableInterface.tableList = this.teacherId;
    },
  }
</script>
<style scoped>
  .descriptionStyle{
    font-size: 20px;
  }
</style>