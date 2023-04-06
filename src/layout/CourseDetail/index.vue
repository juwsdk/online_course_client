<template>
  <el-container direction="vertical" style="height: 100%;">
    <el-header height="45px">
      <slot name="pageHeader"></slot>

    </el-header>
    <el-container direction="horizontal" style="height:calc( 100vh - 180px );">
      <!-- <el-aside width="200px" style="height: 100%;
      overflow-x: hidden;
      overflow-y: auto;"> -->
        <slot name="pageAside"></slot>
      <!-- </el-aside> -->
      <el-container direction="vertical">
        <el-main style="height: 100%;background-color: rgba(247, 247, 248);">
          <slot name="pageMain"></slot>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    name: 'DetailView',
  }
</script>
<style scoped>
  .el-header{
    display: flex;
  }
</style>