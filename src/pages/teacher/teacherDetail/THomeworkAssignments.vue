<template lang="">
  <div>
    <el-upload class="upload-demo" drag :action="uploadUrl" multiple :file-list="fileList" :on-change="handleFileChange"
      ref="upload" :on-remove="handleRemove" :auto-upload="false" :show-file-list="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">请上传作业</div>
    </el-upload>

    <div class="fileContainer">
      <FileUploadCard v-for="(fileItem,index) in fileList" :key="index" :fileItem="fileItem"
        @remove="handleRemove(fileItem)" style="width: 100%;">
        <template v-slot:fileCardFormItems>
          <el-container direction="vertical">
            <el-container direction="horizontal">
              <el-aside width="200px">
                <el-image style="width: 200px; height: 200px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </el-aside>
              <el-container direction="vertical" style="padding: 0;">
                <el-main height="200px">
                  <el-form-item label="作业名称">
                    <el-input v-model="fileItem.homeWorkName=fileItem.name.trim().split('.')[0]"></el-input>
                  </el-form-item>
                  <el-form-item label="布置日期">
                    <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                    v-model="fileItem.homeWorkDate=''">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="信息">
                    <el-input type="textarea" v-model="fileItem.homeWorkInfo=''"></el-input>
                  </el-form-item>
                </el-main>
              </el-container>
            </el-container>
          </el-container>

        </template>
      </FileUploadCard>
    </div>
    <el-row>
      <el-col :span="2">
        <el-button type="primary" size="small" @click="handleSubmit">上传</el-button>
      </el-col>
      <el-col :span="3">
        <el-button size="small" type="danger">清空</el-button>
      </el-col>
    </el-row>


  </div>
</template>
<script>
  import FileUploadCard from '@/components/FileUploadCard';
  export default {
    name: 'HomWAss',
    components: {
      FileUploadCard
    },
    data() {
      return {
        fileList: [],
        uploadUrl: '',//文件上传后端接口
      }
    },
    methods: {
      handleFileChange(file, fileList) {
        // 判断是否存在同名文件
        const isDuplicate = fileList.some(item => item.name === file.name && item !== file);
        if (isDuplicate) {
          // 重复文件，移除当前文件
          const index = fileList.indexOf(file);
          //使用数组方法移除这个文件
          fileList.splice(index, 1);
          this.$message.warning('已存在同名文件，重复文件已被移除');
        } else {
          // 新文件，添加到已上传文件列表
          this.fileList = fileList;
        }
      },
      handleSubmit() {
        console.log(this.fileList);
        // this.$refs.upload.submit(); // 手动触发上传操作
      },
      handleCancel(file) {
        this.$refs.upload.remove(file); // 移除文件
      },
      handleRemove(file) {
        const fileList = this.fileList.filter(item => item !== file);
        this.fileList = fileList;
      }
    },
  }
</script>
<style scoped>
  .el-input .el-form-item .el-row{
    min-width: 400px;
  }
  .el-main {
    padding-top: 0;
    padding-bottom: 0;
    min-width: 300px;
  }

  .el-input {
    width: calc(80% - 40px);
  }

  .el-form-item {
    font-size: 5px;
  }
</style>