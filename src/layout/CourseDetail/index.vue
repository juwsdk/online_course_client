<template>
  <el-container direction="vertical">
    <el-header height="">
      <slot name="pageHeader"></slot>
      
    </el-header>
    <el-container direction="horizontal">
      <el-aside width="200px">
        <slot name="pageAside"></slot>
      </el-aside>
      <el-container direction="vertical">
        <el-main style="height:calc( 100vh - 130px );background-color: antiquewhite;">
          <slot name="pageMain"></slot>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name:'DetailView',
}
</script>
<style>
  
</style>