<template lang="">
  <div>
    <el-input v-model="searchinput" placeholder="请输入内容"></el-input>
    <el-button type="success" size="default" @click="">查询</el-button>
  </div>
</template>
<script>
export default {
  name:'CourseSearchBar',
  data() {
      return {
        searchinput: ''
      }
    },
}
</script>
<style scoped>
  div{
    display: flex;
    justify-content: center;
    /* align-items: center; */
  }
  .el-input{
    width: 40%;
    padding-right: 10px;
  }
</style>