<template>
  <div id="loginBody">
    <div id="loginMain">
      <el-row :gutter="20">
        <el-switch style="display: block" v-model="chooseModle" active-color="#13ce66" inactive-color="#49ffff"
          @change="handleModleChange" active-text="学生" inactive-text="教师">
        </el-switch>
      </el-row>

      <el-form ref="form" :model="form" :rules="rules">
        <!-- 学生 -->
        <template v-if="chooseModle">
          <el-form-item label="学生名" prop="userName">
            <el-input v-model="form.studentName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPassword">
            <el-input v-model="form.studentPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="userGender">
            <template>
              <el-radio v-model="form.studentGender" label="男">男</el-radio>
              <el-radio v-model="form.studentGender" label="女">女</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="生日" prop="userBirthday">
            <el-date-picker v-model="form.studentBirthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="电话号码" prop="userPhonenum">
            <el-input v-model="form.studentPhonenum" type="number"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail">
            <el-input v-model="form.studentEmail" type="email"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="userAddress">
            <el-input v-model="form.studentAddress"></el-input>
          </el-form-item>
        </template>
        <!-- 教师 -->
        <template v-else>
          <el-form-item label="教师名" prop="userName">
            <el-input v-model="form.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPassword">
            <el-input v-model="form.teacherPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="userGender">
            <template>
              <el-radio v-model="form.teacherGender" label="男">男</el-radio>
              <el-radio v-model="form.teacherGender" label="女">女</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="生日" prop="userBirthday">
            <el-date-picker v-model="form.teacherBirthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="电话号码" prop="userPhonenum">
            <el-input v-model="form.teacherPhonenum" type="number"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail">
            <el-input v-model="form.teacherEmail" type="email"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="userAddress">
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

      </el-form>
    </div>

  </div>
</template>
<script>
import {register} from "@/api/loginRegister/loginApi";
import {registerValidation} from "@/utils/validation";
  export default {
    name: 'Register',//注册页面
    data() {
      return {
        form: {},
        rules: registerValidation,
        chooseModle: true,//true为学生，false为教师
      }
    },

    methods: {
      onSubmit() {
        //校验
        this.$refs.form.validate((valid) => {
          if (!valid) {
            this.$message.warning("请按要求输入内容!");
            return false;
          } else {
            this.sendToRegister();
          }
        })

      },
      sendToRegister() {
        console.log(this.form);
        let type;
        if (this.chooseModle == true) {//学生注册
          type = 'student';
          this.$set(this.form, "studentFirstlogin", 0);//如果是学生自己创建的账号，则第一次登录设置为 0 表示非第一次登录
        } else {//教师注册
          type = 'teacher';
        }
        register(type, this.form).then(res => {
          console.log(res);
          if (res.data === 0) {
            this.$message.error('注册失败');
          } else {
            this.$notify({
              title: '提示',
              message: '注册成功,你的编号是:' + res.data,
              duration: 0
            });
            this.form={};//清空表单
          }
        }).catch(err => {
          console.log(err);
          this.$message.warning('注册失败');
        })
      },
      handleModleChange() {
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