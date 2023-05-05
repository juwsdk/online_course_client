<template>
  <div>
    <CourseTable
      :tableInterfce="aTableInterface"
      :tableInfo="tableInfo"
      :showOptions="showOptions"
    >
      <template v-slot:selectOneG>
        <el-option
          v-for="(searchvalue, searchlable, index) in tableInfo"
          :label="searchlable"
          :value="searchvalue"
          :key="index"
        >
        </el-option>
      </template>

      <template v-slot:atablecol>
        <el-table-column
          v-for="(tableprop, tablelable, index) in tableInfo"
          :key="index"
          :label="tablelable"
          :prop="tableprop"
          sortable
        />
      </template>
    </CourseTable>
  </div>
</template>
<script>
import { teacherFindStudentClock } from "@/api/teacher/teacherTableData";
import CourseTable from "@/components/CourseTable";
import { clockInterface } from "@/api/teacher/homeworkApi";
export default {
  name: "TStudentClockIn", //学生打卡
  components: {
    CourseTable,
  },
  data() {
    return {
      aTableInterface: clockInterface,
      tableInfo: teacherFindStudentClock,
      showOptions: false,
    };
  },
  methods: {
    assembleUrl() {
      clockInterface.tableList = this.$route.params.courseId;
    },
  },
  created() {
    this.assembleUrl();
  },
  destroyed() {},
};
</script>
<style></style>
