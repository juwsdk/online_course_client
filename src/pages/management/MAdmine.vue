<template lang="">
  <div>
    <CourseSearchBar>
    </CourseSearchBar>
    <CourseTable :tableInterfce="aTableInterface">
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