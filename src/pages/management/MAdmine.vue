<template lang="">
  <div>
    <!-- <CourseSearchBar>
      <el-option v-for="(searchvalue,searchlable,index) in tableInfo" :label="searchlable" :value="searchvalue"
        v-if="searchlable !='密码'" :key="index" slot="selectOne"></el-option>
    </CourseSearchBar> -->
    <CourseTable :tableInterfce="aTableInterface" :tableInfo="tableInfo">
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
  import {admTable} from '@/data/tableData';
  import {admInterface} from '@/data/tableInterface';
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
      }
    }
  }
</script>
<style lang="">

</style>