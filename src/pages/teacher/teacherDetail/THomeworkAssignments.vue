<template>
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
                    <el-input v-model="fileItem.courseHomeworkName"></el-input>
                  </el-form-item>
                  <el-form-item label="布置日期">
                    <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                      v-model="fileItem.courseHomeworkDate">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="信息">
                    <el-input type="textarea" v-model="fileItem.courseHomeworkDescription"></el-input>
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
        <el-button size="small" type="danger" @click="handleClear">清空</el-button>
      </el-col>
    </el-row>


  </div>
</template>
<script>
  import FileUploadCard from '@/components/FileUploadCard';
  import dateFormatNow from '@/utils/timeUtil';
  import axios from '@/api';
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
          const index = fileList.indexOf(file);
          this.$set(file, 'courseHomeworkName', file.name.trim().split('.')[0]);
          this.$set(file, 'courseHomeworkDate', dateFormatNow());
          // this.$set(file, 'alias', file.name.trim().split('.')[0]);
          this.fileList = fileList;
        }
      },
      handleSubmit() {//上传作业        
        if (this.fileList.length == 0) {
          this.$message.warning('不能上传空文件');
          return;
        }
        this.$confirm('确定上传吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fileList.forEach(fileItem => {
            //使用formdata封装数据
            let formData = new FormData();
            formData.append('courseId', this.$route.params.courseId);
            formData.append('teacherId', this.$route.params.teacherId);
            formData.append('courseHomeworkRes', fileItem.name);
            formData.append('courseHomeworkName', fileItem.courseHomeworkName);
            formData.append('courseHomeworkDate', fileItem.courseHomeworkDate);
            formData.append('fileRaw', fileItem.raw);
            formData.append('courseHomeworkDescription', fileItem.courseHomeworkDescription);
            console.log(JSON.stringify(formData));
            //发送axios请求,上传数据
            axios.post("/homework/homeWorkUpload", formData, {
              headers: {
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN'
              }
            })
              .then(res => {
                //提示成功，fileList中删除这个元素
                this.$message.success(res.data);
                // 找到 fileItem 的索引
                const index = this.fileList.indexOf(fileItem);
                // 删除指定元素
                if (index > -1) {
                  this.fileList.splice(index, 1);
                }
              })
              .catch(err => {
                this.$message.error(fileItem.name.trim().split('.')[0] + '上传失败');
              });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上传'
          });
        });
      },
      handleCancel(file) {
        this.$refs.upload.remove(file); // 移除文件
      },
      handleRemove(file) {
        const fileList = this.fileList.filter(item => item !== file);
        this.fileList = fileList;
      },
      handleClear() {
        this.$confirm('是否清空所有?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fileList = [];
        }).catch(err => {
          this.$message.warning('已清空');
        });
      }
    },
  }
</script>
<style scoped>
  .el-input .el-form-item .el-row {
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