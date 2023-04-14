<template lang="">
  <el-header class="myheader">
    <el-row>
      <el-col :span="1" :offset="0">
        <i v-if="!isCollapse" class="el-icon-s-fold myCollapse" @click="changeMenu"></i>
        <i v-if="isCollapse" class="el-icon-s-unfold myCollapse" @click="changeMenu"></i>
      </el-col>
      <el-col :span="4" class="item">网课管理系统<div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4" :push="15" class="item">
        <el-dropdown>
          <span class="el-dropdown-link">
            用户:{{getId}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logOut">登出</el-dropdown-item>
            
          </el-dropdown-menu>
        </el-dropdown>
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </el-header>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'CourseHeader',
    props:['isCollapse'],
    methods: {
      ...mapActions({setIsAuth:'setIsAuth'}),
      //切换按钮
      changeMenu(){
        this.$emit('changeShow');//子传父
      },
      logOut(){
        this.$confirm('你确定要登出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('dataCommit/logout')
          .then(res => {
            console.log(res);
            if(res.code=1002){
              this.$message.success(res.message);
              this.setIsAuth(false);//取消授权
              this.$router.push('/login');//前往登录页面
            }
          })
          .catch(err => {
            console.error(err); 
          })
        }).catch(() => {
          this.$message.info('已取消操作!');
        });
      }
    },
    computed:{
      ...mapGetters({getId:'getId'})
    }
  }
</script>
<style scoped>
  .myheader {
    height: 100px;
    /* background-color:#eff6fc; */
    width: 100%;
    color: black;
    text-align: center;
    min-width: 400px;
    border-bottom: 1px solid lightgray;
    padding-left: 0;
    height: 60px;

  }
  .myCollapse{
    line-height: 60px;
    text-align: center;
  }

  .el-row {
    display: flex;
    height: 100%;
    /* justify-items: center; */
    align-items: center;
  }

  .el-row :first-child {
    height: 100%;
    /* overflow: hidden; */
    cursor: pointer;
  }

  .el-icon-s-fold,
  .el-icon-s-unfold {
    /* height: 100%; */
    width: 100%;
    font-size: 40px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>