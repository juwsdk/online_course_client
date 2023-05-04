<template>
  <div>
    <!-- <CourseSearchBar>
      <el-option v-for="(searchvalue,searchlable,index) in tableInfo" :label="searchlable" :value="searchvalue"
        v-if="searchlable !='密码'" :key="index" slot="selectOne"></el-option>
    </CourseSearchBar> -->
    <CourseTable :tableInterfce="aTableInterface" :form="form" @clearForm="clearForm" @alertForm="alertForm">

      <template v-slot:selectOneG>
        <el-option v-for="(searchvalue,searchlable,index) in tableInfo" :label="searchlable" :value="searchvalue"
        v-if="searchlable !='密码'" :key="index"></el-option>
      </template>

      <template v-slot:atablecol>
        <el-table-column v-for="(tableprop,tablelable,index) in tableInfo" :key="index" :label="tablelable"
          :prop="tableprop" sortable />
        </el-table-column>
      </template>

      <template v-slot:adialogitem>
        <el-form-item label="姓名">
          <el-input v-model="form.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.teacherPassword"></el-input>
        </el-form-item>
        <el-form-item label="性別">
          <el-radio v-model="form.teacherGender" label="男">男</el-radio>
          <el-radio v-model="form.teacherGender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker value-format="yyyy-M-d" v-model="form.teacherBirthday" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话">
          <el-input type="number" v-model="form.teacherPhonenum"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="email" v-model="form.teacherEmail"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="form.teacherAddress"></el-input>
        </el-form-item>
      </template>
      
    </CourseTable>
  </div>
</template>
<script>
  import CourseTable from '@/components/CourseTable';
  import CourseSearchBar from '@/components/CourseSearchBar';
  import { teacherTable } from '@/api/manage/tableData';
  import { teacherInterface } from '@/api/manage/tableInterface';
  export default {
    name: 'MTeacher',
    components: {
      CourseTable,
      CourseSearchBar
    },
    data() {
      return {
        tableInfo: teacherTable,
        aTableInterface: teacherInterface,
        form: {
          teacherName: '',
          teacherGender: '男',
          teacherPassword: '000000',
          teacherBirthday: '',
          teacherPhonenum: '',
          teacherEmail: '',
          teacherAddress: ''
        }
      }
    },
    methods: {
      clearForm() {
        this.form = {
          teacherName: '',
          teacherGender: '男',
          teacherPassword: '000000',
          teacherBirthday: '',
          teacherPhonenum: '',
          teacherEmail: '',
          teacherAddress: ''
        }
      },
      //修改表单
      alertForm(row) {
        this.form = JSON.parse(JSON.stringify(row));
        this.showId = true;//点击编辑按钮时，显示id框
      }
    },
    mounted() {
      // console.log(this.tableInfo);
      // console.log(this.aAableInterface);
    },
  }
</script>
<style lang="">

</style>