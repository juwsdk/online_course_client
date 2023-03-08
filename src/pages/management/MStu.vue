<template lang="">
  <div>
    <CourseSearchBar>
    </CourseSearchBar>
    <CourseTable :tableInterfce="aTableInterface">
      <template v-slot:atablecol>
        <el-table-column v-for="(tableprop,tablelable,index) in tableInfo" :key="index"  :label="tablelable" :prop="tableprop" sortable />
        </el-table-column>
      </template>
    </CourseTable>
  </div>
</template>
<script>
  import CourseTable from '@/components/CourseTable';
  import CourseSearchBar from '@/components/CourseSearchBar';
  import studentTable from '@/data/tableData';
  import studentInterface from '@/data/tableInterface';
  export default {
    name: 'MStu',
    components: {
      CourseTable,
      CourseSearchBar
    },
    data() {
      return {
        tableInfo:studentTable,//导入的表名
        aTableInterface:studentInterface,//请求接口
      }
    },
    methods: {

    },
    mounted() {
      console.log(this.tableInfo);
    },
  }
</script>
<style>

</style>