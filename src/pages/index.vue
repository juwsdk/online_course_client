<template lang="">
  <div>
    <!-- <CourseSearchBar/>
    <CourseTable /> -->
    <DescriptionsOfMyself @handleUpdate="handleUpdate"/>
     <!-- 修改教师信息对话框 -->
     <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="450px">
      <!-- <el-form ref="form" :model="form" label-width="80px">
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
      </el-form> -->
      <span slot="footer">
        <el-button type="success" size="small" @click="submitInfo"
          style="float: left;margin-left: 100px;">修改</el-button>
        <el-button type="warning" size="small" @click="handleDialogClose"
          style="margin-right: 100px;">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  // import CourseTable from '@/components/CourseTable';
  // import CourseSearchBar from '@/components/CourseSearchBar';
  import DescriptionsOfMyself from '@/components/DescriptionsOfMyself';
  export default {
    name: 'MyIndex',
    components: {
      // CourseTable,
      // CourseSearchBar
      DescriptionsOfMyself
    },
    data() {
      return {
        dialogVisible: false,//是否显示dialog修改个人信息
        form: {},//修改的信息
      }
    },
    methods: {
       //修改教师信息
       handleUpdate(infoObj) {
        this.form = this.infoObj;
        this.dialogVisible = true;
      },
      //提交教师修改表单
      submitInfo() {

      },
       //取消，关闭对话框
       handleDialogClose() {
        this.dialogVisible = false;
      },
    },
  }
</script>
<style lang="">

</style>