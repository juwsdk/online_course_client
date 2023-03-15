<template>
  <div id="loginBody">
    <div id="loginMain">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>注册</el-button>
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
        form: {}
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        this.$router.push('/myindex');
      }
    }
  }
</script>
<style>
#loginBody{
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #22272e;
}
#loginMain{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 40%;
  height: 300px;
  background-color: rgba(240,240,240,.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>