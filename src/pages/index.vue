<template lang="">
  <div>
    <!-- <CourseSearchBar/>
    <CourseTable /> -->
    <DescriptionsOfMyself @handleUpdate="handleUpdate" :info="form" :infoModel="formModel" />
    <!-- 修改教师信息对话框 -->
    <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="450px">

      <el-form v-if="formModel=='teacher'" ref="form" :model="form" label-width="80px">
        <el-form-item label="教师号">
          <el-input v-model="form.teacherId" disabled></el-input>
        </el-form-item>
        <el-form-item label="教师名">
          <el-input v-model="form.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.teacherPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <template>
            <el-radio v-model="form.teacherGender" label="男">男</el-radio>
            <el-radio v-model="form.teacherGender" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="form.teacherBirthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.teacherPhonenum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.teacherEmail" type="email"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.teacherAddress"></el-input>
        </el-form-item>
      </el-form>

      <!-- 修改学生信息 -->
      <el-form v-if="formModel=='student'" ref="form" :model="form" label-width="80px">
        <el-form-item label="学号">
          <el-input v-model="form.studentId" disabled></el-input>
        </el-form-item>
        <el-form-item label="学生名">
          <el-input v-model="form.studentName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.studentPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <template>
            <el-radio v-model="form.studentGender" label="男">男</el-radio>
            <el-radio v-model="form.studentGender" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="form.studentBirthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.studentPhonenum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.studentEmail" type="email"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.studentAddress"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button type="success" size="small" @click="submitInfo" style="float: left;margin-left: 100px;"
          v-if="formModel!='admin'">修改</el-button>
        <el-button type="warning" size="small" @click="handleDialogClose" style="margin-right: 100px;">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import axios from '@/api';
  import DescriptionsOfMyself from '@/components/DescriptionsOfMyself';
  import { mapGetters } from 'vuex';
  export default {
    name: 'MyIndex',
    components: {
      DescriptionsOfMyself
    },
    data() {
      return {
        dialogVisible: false,//是否显示dialog修改个人信息
        form: {},//修改的信息
        formModel: 'student',
      }
    },
    computed: {
      ...mapGetters({ getStudentId: 'getStudentId', getTeacherId: 'getTeacherId', getAdmiId: 'getAdmiId' })
    },
    methods: {
      //修改教师信息
      handleUpdate(infoObj) {
        // this.form = this.infoObj;
        this.dialogVisible = true;
      },
      //提交修改表单
      submitInfo() {
        let url;
        if (this.formModel == 'student') {
          url = '/student/studentUpdate';
        } else if (this.formModel == 'teacher') {
          url = '/teacher/studentUpdate';
        }
        axios.put(url, this.form)
          .then(res => {
            console.log(res);
            if (res.data == 1) {
              this.$message.success('修改成功!');
              this.dialogVisible = false;//关闭对话框
              this.loadData();//重新加载数据
            } else {
              this.$message.warning('修改失败!');
            }
          })
          .catch(err => {
            console.error(err);
            this.$message.warning('修改失败!');
          })
      },
      //取消，关闭对话框
      handleDialogClose() {
        this.dialogVisible = false;
      },
      loadData() {
        let url;
        if (this.formModel == 'student') {
          url = '/student/' + this.getStudentId;
        } else if (this.formModel == 'teacher') {
          url = '/teacher/' + this.getTeacherId + '/teacherOne';
        } else if (this.formModel == 'adm') {
          url = '/admin/' + this.getAdmiId + '/admOne';
        }
        console.log(this.getTeacherId);
        axios.post(url)
          .then(res => {
            console.log(res);
            this.form = res.data;
            console.log(this.form);
          })
          .catch(err => {
            console.error(err);
          });
      }
    },

    mounted() {
      this.loadData();
    },
  }
</script>
<style lang="">

</style>