<template>
  <el-container direction="vertical" style="height: 100%;">
    <el-header height="45px">
      <slot name="pageHeader"></slot>

    </el-header>
    <el-container direction="horizontal" style="height:calc( 100vh - 180px );">
      <slot name="pageAside"></slot>
      <el-container direction="vertical">
        <el-main>
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
  .el-header {
    display: flex;
  }

  .el-main {
    height: 100%;
    background-color: rgb(247, 247, 248);
    padding-top: 0;
    padding-bottom: 0;
  }
</style>