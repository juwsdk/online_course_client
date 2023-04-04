<template lang="">
  <div>
    <!-- <CourseSearchBar>
      通过具名插槽传入下拉框信息
      <el-option v-for="(searchvalue,searchlable,index) in tableInfo" :label="searchlable" :value="searchvalue"
        v-if="searchlable !='密码'" :key="index" slot="selectOne"></el-option>
    </CourseSearchBar> -->
    <CourseTable :tableInterfce="aTableInterface" :form="form" @clearForm="clearForm" @alertForm="alertForm">
      <!-- 搜索项下拉框信息 具有三层的两个slot插槽传递结构-->
      <template v-slot:selectOneG>
        <el-option v-for="(searchvalue,searchlable,index) in tableInfo" :label="searchlable" :value="searchvalue"
          v-if="searchlable !='密码'" :key="index"></el-option>
      </template>

      <!-- 表头及单元格信息 -->
      <template v-slot:atablecol>
        <el-table-column v-for="(tableprop,tablelable,index) in tableInfo" :key="index" v-if="tablelable != '密码'"
          :label="tablelable" :prop="tableprop" sortable />
        </el-table-column>
      </template>

      <!-- 表格弹出新增/修改框信息 -->
      <template v-slot:adialogitem>
        <el-form-item label="学号" v-show="showId">
          <el-input v-model="form.studentId" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.studentName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.studentPassword"></el-input>
        </el-form-item>
        <el-form-item label="性別">
          <el-radio v-model="form.studentGender" label="男">男</el-radio>
          <el-radio v-model="form.studentGender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker value-format="yyyy-MM-dd" v-model="form.studentBirthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话">
          <el-input type="number" v-model="form.studentPhonenum"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="email" v-model="form.studentEmail"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="form.studentAddress"></el-input>
        </el-form-item>

      </template>

    </CourseTable>
  </div>
</template>
<script>
  import CourseTable from '@/components/CourseTable';
  import CourseSearchBar from '@/components/CourseSearchBar';
  import studentTable from '@/api/tableData';
  import studentInterface from '@/api/tableInterface';
  export default {
    name: 'MStu',
    components: {
      CourseTable,
      CourseSearchBar
    },
    data() {
      return {
        tableInfo: studentTable,//导入的表名
        aTableInterface: studentInterface,//请求接口
        showId: false,//是否显示表单的学号
        form: {//表单初始化信息
          studentGender: '男',
          studentPassword: '000000',
        }
      }
    },
    methods: {
      clearForm() {//初始化表单
        this.form = {
          studentGender: '男',
          studentPassword: '000000',
        };
        this.showId = false;
      },
      alertForm(row) {//修改表单
        this.form = JSON.parse(JSON.stringify(row));
        this.showId = true;
      }
    },
    mounted() {
      // console.log(this.tableInfo);
    },
  }
</script>
<style>

</style>