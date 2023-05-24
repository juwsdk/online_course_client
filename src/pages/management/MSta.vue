<template>
  <div style="display: flex">
    <div style="width: 47%">
      <h1 style="font-size: 17px;padding-bottom: 3px">教师课程查询</h1>
      <el-button size="mini" style="float:left" @click="statistical('teacher')">统计教师课程</el-button>
      <CourseTable :tableInterfce="teacherTableInterface" :showOptions="false">
        <template v-slot:selectOneG>
          <el-option v-for="(searchvalue,searchlable,index) in teacherTableInfo" :label="searchlable"
                     :value="searchvalue"
                     :key="index"></el-option>
        </template>

        <template v-slot:atablecol>
          <el-table-column v-for="(tableprop,tablelable,index) in teacherTableInfo" :key="index"
                           :label="tablelable" :prop="tableprop" sortable/>
        </template>
      </CourseTable>
    </div>

    <div style="width: 47%;padding-left: 6%;">
      <h1 style="font-size: 17px;padding-bottom: 3px">学生课程查询</h1>
      <el-button size="mini" style="float:left" @click="statistical('student')">统计学生课程</el-button>
      <CourseTable :tableInterfce="studentTableInterface" :showOptions="false">
        <template v-slot:selectOneG>
          <el-option v-for="(searchvalue,searchlable,index) in studentTableInfo" :label="searchlable"
                     :value="searchvalue"
                     :key="index"></el-option>
        </template>

        <template v-slot:atablecol>
          <el-table-column v-for="(tableprop,tablelable,index) in studentTableInfo" :key="index"
                           :label="tablelable" :prop="tableprop" sortable/>
        </template>
      </CourseTable>

      <el-dialog title="统计信息" :visible.sync="dialogVisible" width="600px">
        <el-form ref="form" :model="form" label-width="80px" adialogitem>
          <el-form-item label="ID">
            <el-input v-model="form.userId" type="number"></el-input>
          </el-form-item>
          <el-form-item label="课程" v-show="showSta">
            <el-input v-model="form.course" type="textarea" autosize disabled></el-input>
          </el-form-item>
          <el-form-item label="课程数" v-show="showSta">
            <el-input v-model="form.courseCount" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import CourseTable from "@/components/CourseTable.vue";
import {staStudentInterface, staTeacherInterface} from "@/api/manage/tableInterface";
import {statisticalStudent, statisticalTeacher} from "@/api/manage/tableData";
import {staStudentByID, staTeacherByID} from "@/api/manage/staApi";

export default {
  name: "MSta",
  components: {CourseTable},
  data() {
    return {
      teacherTableInterface: staTeacherInterface,
      studentTableInterface: staStudentInterface,
      teacherTableInfo: statisticalTeacher,
      studentTableInfo: statisticalStudent,
      staMode: "",//统计的模式，表示是统计学生信息还是统计教师信息
      dialogVisible: false,//是否打开统计框
      form: {},//统计模式的表单
      showSta: false,//展示统计信息
    }
  },
  methods: {
    //统计信息
    statistical(mode) {
      this.staMode = mode;
      this.dialogVisible = true;
      this.showSta = false;
    },
    onSubmit() {//发送查询信息
      if (this.form.userId < 0) {
        this.$message.warning("请输入正确的数!");
        return;
      }
      //清空信息
      this.form.course = "";
      this.form.courseCount = null;

      if (this.staMode == "student") {
        staStudentByID(this.form.userId)
          .then(res => {
            if (res.data != null) {
              this.showSta = true;
              res.data.forEach(cour => {
                this.form.course += cour + " ";
              });
              this.form.courseCount = res.data.length;
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.warning("服务器连接失败");
          })
      } else if (this.staMode == "teacher") {
        staTeacherByID(this.form.userId)
          .then(res => {
            console.log(res);
            if (res.data != null) {
              this.showSta = true;
              res.data.forEach(cour => {
                this.form.course += cour + " ";
              });
              this.form.courseCount = res.data.length;
            }
          }).catch(err => {
          console.log(err);
          this.$message.warning("服务器连接失败")
        })
      }
    }
  }
}
</script>

<style scoped>

</style>