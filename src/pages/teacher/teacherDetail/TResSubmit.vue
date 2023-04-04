<template lang="">
  <div>
    <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :multiple="true"
      :on-success="uploadSuccess" :on-preview="handlePreview" :on-error="uploadError" :on-change="handleChange"
      :on-remove="handleRemove" :file-list="fileList" :show-file-list="false" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <el-button style="margin-left: 10px;" size="small" type="danger" @click="clearFileList">清空</el-button>
      <div slot="tip" class="el-upload__tip">只能上传mp4文件</div>
    </el-upload>
    <div class="fileContainer">
      <FileUploadCard v-for="(fileItem,index) in fileList" :key="index" :fileItem="fileItem" :aEposide="index+1"
        @update="handleUpdate(index, $event)" @remove="handleRemove(fileItem)" />
    </div>

  </div>
</template>
<script>
  import FileUploadCard from '@/components/FileUploadCard';
  export default {
    name: 'TResSubmit',
    components: {
      FileUploadCard
    },
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      //点击上传文件
      submitUpload() {
        // this.$refs.upload.submit();
        // console.log('22222222222');
        console.log(JSON.stringify(this.fileList));
      },
      //删除将要上传的文件
      handleRemove(file) {
        const fileList = this.fileList.filter(item => item !== file);
        this.fileList = fileList;
        // console.log(this.fileList);
      },
      //关闭了自带的文件查看，这里没有作用
      handlePreview(file) {
        console.log('这是handlePreview');
        console.log(file);
      },
      //上传成功的回调
      uploadSuccess() {

      },
      //上传失败的回调
      uploadError() {

      },
      //当文件数量改变时
      handleChange(file, fileList) {
        this.fileList = fileList;
      },
      //接收后动态绑定数据
      handleUpdate(index, data) {
        const { episode, alias } = data;
        this.$set(this.fileList[index], 'episode', episode);
        this.$set(this.fileList[index], 'alias', alias);
      },
      //清空要上传的文件
      clearFileList() {
        this.$confirm('此操作将取消上传所有文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fileList = [];
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    }
  }
</script>
<style scoped>
  .fileContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    /* align-items: center; */
  }
</style>