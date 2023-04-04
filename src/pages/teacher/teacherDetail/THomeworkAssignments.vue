<template lang="">
  <div>
    这是作业布置
    <el-upload class="upload-demo" drag action="uploadUrl" multiple :file-list="fileList" :on-change="handleFileChange"
      ref="upload" :auto-upload="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-button type="primary" @click="handleSubmit">上传</el-button>
  </div>
</template>
<script>
  export default {
    name: 'HomWAss',
    data() {
      return {
        fileList: [],
      }
    },
    methods: {
      handleFileChange(file, fileList) {
        this.fileList = fileList; // 更新文件列表
      },
      handleSubmit() {
        this.$refs.upload.submit(); // 手动触发上传操作
      },
      handleCancel(file) {
        this.$refs.upload.remove(file); // 移除文件
      },
    },
  }
</script>
<style lang="">

</style>