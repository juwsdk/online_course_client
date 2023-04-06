<template lang="">
  <el-collapse-item :title="homeworkItem.courseHomeworkName" :name="index">
    <template>

      <!-- 如果父页面是学生的组件的话 -->
      <template v-if="comptype=='student'">
        <el-button type="text" @click="seeScore">查看得分</el-button>
        <el-button type="text" @click="dialogVisible=true;">上传作业</el-button>
        <el-button type="text" @click="dowloadItem">下载附件</el-button>
      </template>
      <!-- 如果父页面是教师组件的话 -->
      <template v-if="comptype=='teacher'">
        <el-button type="text" @click="toViewIsFinish">查看学生完成情况</el-button>
        <el-popconfirm title="确定删除这个作业？" confirmButtonText="确定" cancelButtonText="取消" @confirm="deleteHomework">
          <el-button type="text" slot="reference" style="color:#f43336;">删除</el-button>
        </el-popconfirm>
        <el-drawer :title="homeworkItem.courseHomeworkName+'完成情况'" :visible.sync="drawer" direction="rtl"
          :before-close="handleClose">
          <div>
            <span>提交人数: 10/20</span>
            <span style="float: right;color: #3d5d2f;">已提交</span>
          </div>
          <article class="drawBody">
            <el-link class="articleN" type="success" v-for="(item,aindex) in 10" :key="aindex">成功链接</el-link>
          </article>
          <div>
            <span>未提交人数:10</span>
            <span style="float: right;color: #f67d7d;">未提交</span>
          </div>
          <article>
            <el-link class="articleN" :underline="false" type="danger">危险链接</el-link>
          </article>
        </el-drawer>
      </template>
      <!-- 用作扩展其他功能框 -->
      <template v-else>
        <slot name="otherComp"></slot>
      </template>
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
        <el-button type="success" size="small" @click="uploadItem"
          style="float: left;margin-left: 100px;">上传</el-button>
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
    props: ['index', 'homeworkItem', 'srcPrefix', 'comptype'],
    data() {
      return {
        // dowloadSrc: '',
        dialogVisible: false,
        fileList: [],
        drawer: false,//控制抽屉开关
      }
    },
    computed: {
      dowloadSrc() {
        return this.srcPrefix + '/' + this.$route.params.teacherId + '/' + this.homeworkItem.courseId + '/' + this.homeworkItem.courseHomeworkRes;
      }
    },
    methods: {

      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      handleChange(file, fileList) {
        this.fileList = fileList
      },
      //学生
      //下载作业
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
      //上传作业
      uploadItem() {

      },
      //关闭对话框
      handleDialogClose() {
        this.fileList = [];
        this.dialogVisible = false;
      },
      //查看得分
      seeScore() {
        this.$message.warning('未批改!');
      },
      //教师
      //查看学生提交的作业
      toViewIsFinish() {
        this.drawer = true;
      },
      //删除这个作业
      deleteHomework() {
        // alert('触发');
      },
      //控制抽屉关闭
      handleClose() {
        this.drawer = false;
      }
    },
    mounted() {
      // console.log(this.comptype);
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
    background-image: linear-gradient(to right, #424f63, #454263);
    /* background-color: rgba(8, 29, 239,.7); */
    border-radius: 5px 5px 0 0;
    color: white;
  }

  .el-button {
    float: right;
    padding: 5px;
  }

  .el-drawer__body>* {
    font-size: 14px;
  }

  .drawBody {
    width: 100%;
    height: auto;
    /* display: flex; */
  }

  .articleN {
    display: inline-block;
    margin: 10px;
  }
</style>