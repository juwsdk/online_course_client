<template>
  <el-container direction="vertical">
    <el-header v-show="showHeader">
      <slot name="commentsHeader"></slot>
    </el-header>
    <el-main>
      <!-- Main content -->
      <slot name="commentsMain"></slot>
    </el-main>
    <el-footer>
      <!-- Footer content -->
      <slot name="commentsInput"></slot>
    </el-footer>
  </el-container>
</template>
<script>
  export default {
    name: 'CommentVeiw',
    props:{showHeader:{type:Boolean,required:false,default:true}}
  }
</script>
<style scoped>
  .el-header {
    background-image: linear-gradient(135deg, #424f63, #454263);
    height: 60px;
  }

  .el-main {
    height: calc(100vh - 360px);
  }

  .el-footer {
    background-image: linear-gradient(135deg, #424f63, #454263);
    height: 200px !important;
  }
</style>