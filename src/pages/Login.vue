<template>
  <div id="loginBody">
    <div id="loginMain">
      <div class="block">
        <span class="demonstration">选择登录类型</span>
        <el-slider
          :show-tooltip="false"
          v-model="chooseModle"
          :step="10"
          :max="20"
          show-stops
          :marks="marks"
          @change="handleModleChange"
          class="el-slider"
        >
        </el-slider>
      </div>

      <el-form ref="form" :rules="rules" :model="form">
        <!-- 学生登录 -->
        <template v-if="chooseModle == 0">
          <el-form-item label="学号" prop="userId">
            <el-input v-model="form.userId" type="number"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </template>
        <!-- 教师登录 -->
        <template v-if="chooseModle == 10">
          <el-form-item label="教师号" prop="userId">
            <el-input v-model="form.userId" type="number"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </template>
        <!-- 管理员登录 -->
        <template v-if="chooseModle == 20">
          <el-form-item label="管理员号" prop="userId">
            <el-input v-model="form.userId" type="number"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </template>

        <el-row>
          <el-col :span="5" :offset="2">
            <el-button type="success" @click="onSubmit('form')">登录</el-button>
          </el-col>
          <el-col :span="5" :offset="10">
            <el-button type="primary" @click="toRegister">注册</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "@/api";
import { userValidation } from "@/utils/validation";
export default {
  name: "Login", //登录界面
  data() {
    return {
      form: {},
      rules: userValidation,
      chooseModle: 0,
      marks: { 0: "学生", 10: "教师", 20: "admin" },
    };
  },
  computed: {
    ...mapGetters({ getLoginType: "getLoginType" }),
  },
  methods: {
    //通过生成acitions中的方法来操作 id
    ...mapActions({
      saveId: "setId",
      setLoginType: "setLoginType",
      setIsAuth: "setIsAuth",
      setAdmType:"setAdmType"
    }),
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message.warning("请输入内容!");
          return false;
        } else {
          this.sendToLogin();
        }
      });
    },
    sendToLogin() {
      //判断登录类型
      if (this.chooseModle == 0) {
        //是学生登录
        this.setLoginType("student");
      } else if (this.chooseModle == 10) {
        //是教师登录
        this.setLoginType("teacher");
      } else if (this.chooseModle == 20) {
        //是管理员登录
        this.setLoginType("admin");
      } else {
        this.$message.$warning("非法用户!");
        return;
      }
      //发送请求登录
      const user = {
        ...this.form,
        loginType: this.getLoginType,
      };
      axios({
        method: "post",
        url: "/dataCommit/login",
        data: user,
      })
        .then((res) => {
          console.log(res);
          if (res.code == 1000) {
            //设置为授权状态
            console.log(res);
            if(this.getLoginType=='admin')
              this.setAdmType(res.data);
            this.$message.success("登录成功");
            this.setIsAuth(true);
            this.saveId(this.form.userId);
            this.$router.push("/myindex");
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("登陆失败!");
        });
    },
    toRegister() {
      this.$router.push("/register");
    },
    handleModleChange() {
      // this.form = {};
    },
  },
  mounted() {
    console.log(this.chooseModle);
  },
};
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
  width: 470px;
  height: 300px;
  background: linear-gradient(135deg, #ffcf71, #2376dd);
  border-radius: 5px;
  /* backdrop-filter: blur(20px); */
}

/* 修改el-slider样式 */
::v-deep .el-slider__bar {
  background-image: linear-gradient(to right, blue, cyan);
}

::v-deep .el-slider__runway {
  background-image: linear-gradient(to left, #42e695, #3bb2b8);
}

::v-deep .el-slider__marks-text,
::v-deep .el-form-item__label,
.demonstration {
  color: white;
  font-weight: bold;
}
</style>
