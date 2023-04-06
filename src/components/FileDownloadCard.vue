<template lang="">
  <el-collapse-item :title="homeworkItem.courseHomeworkName" :name="index">
    <template>
      <el-button style="float: right; padding: 5px;" type="text" @click="seeScore" >查看得分</el-button>
      <el-button style="float: right; padding: 5px" type="text" @click="dialogVisible=true;">上传作业</el-button>
      <el-button style="float: right; padding: 5px" type="text" @click="dowloadItem">下载附件</el-button>
      
    </template>
    <el-dialog title="提交作业" :visible.sync="dialogVisible" width="420px" :before-close="handleDialogClose">
      <span>
        <h2 style="padding-bottom: 5px;">{{homeworkItem.courseHomeworkName}}作业上传</h2>
        <el-upload class="upload-demo" drag action="#" :on-remove="handleRemove" :on-change="handleChange"
          :auto-upload="false" :file-list="fileList" :limit="1">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </span>
      <span slot="footer">
        <el-button type="success" size="small" @click="uploadItem" style="float: left;margin-left: 100px;">上传</el-button>
        <el-button type="warning" size="small" @click="handleDialogClose" style="margin-right: 100px;">取消</el-button>
      </span>
    </el-dialog>


    <article>
      <h3>布置时间: {{homeworkItem.courseHomeworkDate}}</h3>
      <p class="contentHeader">作业描述:</p>
      <article class="contentArticle">
        {{homeworkItem.courseHomeworkDescription}}
      </article>
      </el-input>
    </article>
  </el-collapse-item>

</template>
<script>
  import axios from '@/api';
  export default {
    name: 'FileDownloadCard',
    props: ['index', 'homeworkItem', 'srcPrefix'],
    data() {
      return {
        // dowloadSrc: '',
        dialogVisible: false,
        fileList: []
      }
    },
    computed: {
      dowloadSrc() {
        return this.srcPrefix + '/' + this.$route.params.teacherId + '/' + this.homeworkItem.courseId + '/' + this.homeworkItem.courseHomeworkRes;
      }
    },
    methods: {
      dowloadItem() {
        console.log(this.dowloadSrc);
        axios({
          method: 'post',
          url: this.dowloadSrc,
          responseType: 'blob'
        })
          .then(res => {
            console.log('得到的回复是:');
            console.log(res);
            //生成A标签
            // 拿到相应头
            const contentType = res.type;
            const fileName = this.homeworkItem.courseHomeworkRes;
            // 生成Blob对象然后创建URL
            const url = window.URL.createObjectURL(new Blob([res.data], { type: contentType }));
            // 创建 a 标签，设置下载链接和文件名
            const link = document.createElement('a');
            link.href = url;
            //下载
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            // 下载完成后释放URL
            window.URL.revokeObjectURL(url);
          })
          .catch(err => {
            this.$message.error('文件下载失败!');
            console.error(err);
          });
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      handleChange(file, fileList) {
        this.fileList = fileList
      },
      //上传作业
      uploadItem() {

      },
      //关闭对话框
      handleDialogClose(){
        this.fileList=[];
        this.dialogVisible=false;
      },
      //查看得分
      seeScore(){
        this.$message.warning('未批改!');
      }
    },

  }
</script>
<style scoped>
  * {
    font-size: 18px;
    padding-left: 10px;
    padding-right: 10px;
  }

   ::v-deep .el-collapse-item__header {
    font-size: 18px;
    color: #0051a6;
  }

  .contentArticle {
    background-color: #f5f7fa;
    font-size: 14px;
  }

  .el-collapse-item__content {
    padding: 10px !important;
  }

  .contentHeader {
    background-image:  linear-gradient(to right, #424f63, #454263);
    /* background-color: rgba(8, 29, 239,.7); */
    border-radius: 5px 5px 0 0;
    color: white;
  }
</style>