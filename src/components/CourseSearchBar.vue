<template lang="">
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="searchinput" class="input-with-select">
      <el-select v-model="searchSelect" slot="prepend" placeholder="请选择"
      style="width: 110px">
      <!-- 传入选项 -->
        <slot name="selectOne"></slot>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
    </el-input>
  </div>
</template>
<script>
  export default {
    name: 'CourseSearchBar',
    data() {
      return {
        searchinput: '',//输入框
        searchSelect: '',//下拉框
      }
    },
    methods: {
      //查找信息，发送axios请求，更新表格
      searchInfo(){
        // console.log(this.searchinput+'||'+this.searchSelect);
        if(this.searchSelect.trim()=='')
          return;//都为空点击确认，什么也不做
        else if(this.searchinput.trim()=='')
          this.$emit('fuzzyQuery','','');//显示所有信息
        //发送给父组件查询的信息
        else this.$emit('fuzzyQuery',this.searchSelect,this.searchinput);
      }
    },
  }
</script>
<style scoped>
  div{
    /* width: 100%; */
    text-align: center;
  }
  .el-select .el-input {
    width: 130px;
    /* font-size: 13px; */
  }


  .el-input {
    width: 50%;
    /* margin: 0 auto; */
    /* padding-right: 10px; */
  }
</style>