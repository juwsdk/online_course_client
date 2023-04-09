<template>
  <div id="loginBody">
    <div id="loginMain">
      <div class="block">
        <span class="demonstration">选择登录类型</span>
        <el-slider :show-tooltip="false" v-model="chooseModle" :step="10" :max="20" show-stops :marks="marks"
          @change="handleModleChange" class="el-slider">
        </el-slider>
      </div>

      <el-form ref="form" :model="form">
        <!-- 学生登录 -->
        <template v-if="chooseModle==0">
          <el-form-item label="学号">
            <el-input v-model="form.studentId"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.studentPassword" type="password"></el-input>
          </el-form-item>
        </template>
        <!-- 教师登录 -->
        <template v-if="chooseModle==10">
          <el-form-item label="教师号">
            <el-input v-model="form.teacherId"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.teacherPassword" type="password"></el-input>
          </el-form-item>
        </template>
        <!-- 管理员登录 -->
        <template v-if="chooseModle==20">
          <el-form-item label="管理员号">
            <el-input v-model="form.admId"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.admPassword" type="password"></el-input>
          </el-form-item>
        </template>

        <el-row>
          <el-col :span="5" :offset="2">
            <el-button type="success" @click="onSubmit">登录</el-button>
          </el-col>
          <el-col :span="5" :offset="10">
            <el-button type="primary" @click="toRegister">注册</el-button>
          </el-col>
        </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'Login',
    data() {
      return {
        form: {},
        chooseModle: 0,
        marks: { 0: '学生', 10: '教师', 20: 'admin' }
      }
    },
    methods: {
      onSubmit() {
        if (this.chooseModle == 0) {//是学生登录

        } else if (this.chooseModle == 10) {//是教师登录

        } else if (this.chooseModle == 20) {//是管理员登录

        } else {
          this.$message.$warning('非法用户!');
          return;
        }
        console.log('submit!');
        this.$router.push('/myindex');
      },
      toRegister() {
        this.$router.push('/register');
      },
      handleModleChange() {
        this.form = {};
      }
    },
    mounted() {
      console.log(this.chooseModle);
    },
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
</style>