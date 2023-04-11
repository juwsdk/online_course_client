<template>
  <div>
    <el-row style="margin: 10px;">
      <el-col :span="3">
        <el-button type="danger" size="small" @click="clearAll">清空资源</el-button>
      </el-col>
    </el-row>

    <div class="fileContainer">
      <FileUploadCard v-for="(fileItem,index) in fileList" :key="index" :fileItem="fileItem"
        @remove="handleRemove(fileItem)" style="width: 280px;" :fileType="true" @change="handleChange">
        <template v-slot:fileCardFormItems>
          <el-form-item label="集数">
            <el-input v-model="fileItem.resBlues"></el-input>
          </el-form-item>
          <el-form-item label="播放时名称">
            <el-input v-model="fileItem.resVideoName"></el-input>
          </el-form-item>
        </template>
      </FileUploadCard>
    </div>
  </div>

</template>
<script>
  import axios from '@/api';
  import FileUploadCard from '@/components/FileUploadCard';
  export default {
    name: 'TResManage',
    components: {
      FileUploadCard
    },
    data() {
      return {
        fileList: []
      }
    },
    methods: {
      loadFileList() {
        axios.post("/video/" + this.$route.params.courseId + "/showFileList")
          .then(res => {
            console.log(res);
            this.fileList = res.data;
          })
          .catch(err => {
            console.error(err);
          })
      },
      handleRemove(file) {
        const fileList = this.fileList.filter(item => item !== file);
        this.fileList = fileList;
      },
      handleChange(file){
        //改变信息
      },
      clearAll() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    mounted() {
      this.loadFileList();
    },
  }
</script>
<style scoped>
  .fileContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    /* width: 300px; */
    /* align-items: center; */
  }
</style>