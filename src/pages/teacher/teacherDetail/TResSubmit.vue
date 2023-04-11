<template lang="">
  <div>
    <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :multiple="true"
      :on-preview="handlePreview" :on-change="handleChange" :on-remove="handleRemove" :file-list="fileList"
      :show-file-list="false" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <el-button style="margin-left: 10px;" size="small" type="danger" @click="clearFileList">清空</el-button>
      <div slot="tip" class="el-upload__tip">只能上传mp4文件</div>
    </el-upload>
    <div class="fileContainer">
      <FileUploadCard v-for="(fileItem,index) in fileList" :key="index" :fileItem="fileItem"
        @remove="handleRemove(fileItem)" style="width: 280px;">
        <template v-slot:fileCardFormItems>
          <el-form-item label="集数">
            <el-input v-model="fileItem.episode"></el-input>
          </el-form-item>
          <el-form-item label="播放时名称">
            <el-input v-model="fileItem.alias"></el-input>
          </el-form-item>
        </template>
      </FileUploadCard>
    </div>

  </div>
</template>
<script>
  import FileUploadCard from '@/components/FileUploadCard';
  import axios from '@/api';
  export default {
    name: 'TResSubmit',
    components: {
      FileUploadCard
    },
    data() {
      return {
        fileList: [],
        // i: 0//用来记录change执行了多少次,优化代码
      };
    },
    methods: {
      //点击上传文件
      submitUpload() {
        //如果没有数据，取消上传
        if (this.fileList.length == 0) {
          this.$message.warning('不能上传空文件');
          return;
        }
        this.fileList.forEach(fileItem => {
          // console.log('这个文件为');
          // console.log(fileItem);
          //使用formdata封装数据
          let formData = new FormData();
          formData.append('resFileName', fileItem.name);
          formData.append('fileRaw', fileItem.raw);
          formData.append('resBlues', fileItem.episode);
          formData.append('resVideoName', fileItem.alias);
          //发送axios请求,上传数据
          axios.post("/video/upload", formData, {
            headers: {
              'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN'
            }
          })
            .then(res => {
              // console.log(res);
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
        // this.$refs.upload.submit();
      },
      //删除将要上传的文件
      handleRemove(file) {
        const fileList = this.fileList.filter(item => item !== file);
        this.fileList = fileList;
      },
      //关闭了自带的文件查看，这里没有作用
      handlePreview(file) {
      },
      //当文件数量改变时
      handleChange(file, fileList) {
        // console.log('触发');
        // this.fileList = fileList;
        // 判断是否存在同名文件
        if(fileList.length==0){
          this.fileList=[];
          return;
        }
          
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
          this.$set(file,'resVideoName',file.name);
          this.$set(file, 'episode', index + 1);
          this.$set(file, 'alias', file.name.trim().split('.')[0]);
          this.fileList.push(file);
        }
      },
      //接收后动态绑定数据
      // handleUpdate(index, data) {
      //   const { episode, alias } = data;
      //   // console.log(data);
      //   //如果没有输入alias这个输入框导致未定义，则把它设置为空串
      //   if (typeof alias == 'undefined')
      //     alias = '';
      //   this.$set(this.fileList[index], 'episode', episode);
      //   this.$set(this.fileList[index], 'alias', alias);
      //   // console.log('绑定事件触发了');
      // },
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
      },
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

  .upload-demo {
    min-width: 300px;
  }
</style>