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
  import {teacherTable} from '@/data/tableData';
  import {teacherInterface} from '@/data/tableInterface';
  export default {
    name: 'MTeacher',
    components:{
      CourseTable,
      CourseSearchBar
    },
    data() {
      return {
        tableInfo:teacherTable,
        aTableInterface:teacherInterface
      }
    },
    mounted() {
      console.log(this.tableInfo);
      console.log(this.aAableInterface);
    },
  }
</script>
<style lang="">

</style>