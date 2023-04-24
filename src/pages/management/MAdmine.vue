<template>
  <div>
    <!-- <CourseSearchBar>
      <el-option v-for="(searchvalue,searchlable,index) in tableInfo" :label="searchlable" :value="searchvalue"
        v-if="searchlable !='密码'" :key="index" slot="selectOne"></el-option>
    </CourseSearchBar> -->
    <CourseTable :tableInterfce="aTableInterface" :form="form" :tableInfo="tableInfo" :showDelete="false">
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

      <!-- 表格弹出新增/修改框信息 -->
      <template v-slot:adialogitem>
        <el-form-item label="管理员名">
          <el-input v-model="form.admName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.admPassword" type="password" show-password></el-input>
        </el-form-item>
      </template>
    </CourseTable>
  </div>
</template>
<script>
  import CourseTable from '@/components/CourseTable';
  import CourseSearchBar from '@/components/CourseSearchBar';
  import { admTable } from '@/api/tableData';
  import { admInterface } from '@/api/tableInterface';
  export default {
    name: 'MAdmine',
    components: {
      CourseTable,
      CourseSearchBar
    },
    data() {
      return {
        tableInfo: admTable,//导入的表名
        aTableInterface: admInterface,//请求接口
        form:{},
      }
    },
    methods: {
      //初始化表单
      clearForm() {
        this.showId = false;//为新增时，不显示id框
      },
    },
  }
</script>
<style lang="">

</style>