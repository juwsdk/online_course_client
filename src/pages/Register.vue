<template lang="">
  <div id="loginBody">
    <div id="loginMain">
      <el-row :gutter="20">
        <el-switch style="display: block" v-model="chooseModle" active-color="#13ce66" inactive-color="#49ffff"
          @change="handleModleChange" active-text="学生" inactive-text="教师">
        </el-switch>
      </el-row>

      <el-form ref="form" :model="form">
        <!-- 学生 -->
        <template v-if="chooseModle">
          <el-form-item label="学生名">
            <el-input v-model="form.studentName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.studentPassword"></el-input>
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
            <el-input v-model="form.tstudentPhonenum" type="number"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.studentEmail" type="email"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.studentAddress"></el-input>
          </el-form-item>
          </el-form-item>
        </template>
        <!-- 教师 -->
        <template v-else>
          <el-form-item label="教师名">
            <el-input v-model="form.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.teacherPassword" type="number"></el-input>
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
        </template>
        <!-- 功能按钮 -->
        <el-row>
          <el-col :span="5" :offset="2">
            <el-button type="success" @click="onSubmit">注册</el-button>
          </el-col>
          <el-col :span="5" :offset="10">
            <el-button type="primary" @click="toLoginPage">登录</el-button>
          </el-col>
        </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Register',
    data() {
      return {
        form: {},
        chooseModle: true//true为学生，false为教师
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form);
        let url;
        if(this.chooseModle==true){//学生注册
          url='/student/studentInsert';
        }else{//教师注册
          url='/teacher/teacherInsert';
        }
        axios({
            method:'post',
            url: url,
            data: this.form
          }).then(res=>{
            if(res.data==1)
              this.$message.success('注册成功');
          }).catch(err=>{
            this.$message.warning('注册失败');
          })
      },
      handleModleChange() {
        // console.log('触发');
        this.form = {};
      },
      toLoginPage() {
        this.$router.push('/login');
      }
    }
  }
</script>
<style scoped>
  #loginBody {
    position: relative;
    width: 100vw;
    height: 100vh;
    /* background-color: #22272e; */
    background: linear-gradient(135deg, #2b5876, #4e4376);
  }

  #loginMain {
    position: absolute;
    padding: 30px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 450px;
    height: 50vh;
    background: linear-gradient(135deg, #ffcf71, #2376dd);
    border-radius: 5px;
    overflow-y: scroll;
  }

  ::v-deep .el-form-item__label,
  ::v-deep span[aria-hidden="true"],
  ::v-deep .el-radio__label {
    color: white;
    font-weight: bold;
  }

  ::v-deep span {
    font-weight: bold;
  }
</style>