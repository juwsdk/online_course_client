<template>
  <el-collapse-item :title="homeworkItem.courseHomeworkName" :name="index">
    <template>
      <!-- 如果父页面是学生的组件的话 -->
      <template v-if="comptype == 'student'">
        <el-button class="floatButton" type="text" @click="seeScore"
          >查看得分</el-button
        >
        <el-button class="floatButton" type="text" @click="dialogVisible = true"
          >上传作业</el-button
        >
        <el-button class="floatButton" type="text" @click="dowloadItem"
          >下载附件</el-button
        >
      </template>

      <!-- 如果父页面是教师组件的话 -->
      <template v-if="comptype == 'teacher'">
        <el-button class="floatButton" type="text" @click="toViewIsFinish"
          >查看学生完成情况</el-button
        >

        <!--   <el-popconfirm title="确定删除这个作业？" confirmButtonText="确定" cancelButtonText="取消" @confirm="deleteHomework">
          <el-button class="floatButton" type="text" slot="reference" style="color:#f43336;">删除</el-button>
        </el-popconfirm> -->

        <!-- 抽屉筐，展示学生的作业 -->
        <el-drawer
          :title="homeworkItem.courseHomeworkName + '完成情况'"
          :visible.sync="drawer"
          direction="rtl"
          :before-close="handleClose"
        >
          <div>
            <span>提交人数: {{ studentSumbmitList.length }}</span>
            <span style="float: right; color: #3d5d2f">已提交</span>
          </div>
          <article class="drawBody">
            <el-link
              class="articleN"
              type="success"
              v-for="(item, aindex) in studentSumbmitList"
              :key="aindex"
              @click="studentWhofinishWork(item)"
              >{{ item.studentName }}</el-link
            >
          </article>
          <div>
            <span>未提交人数:{{ studentNotSubmitList.length }}</span>
            <span style="float: right; color: #f67d7d">未提交</span>
          </div>
          <article>
            <el-link
              class="articleN"
              :underline="false"
              type="danger"
              v-for="(item, index) in studentNotSubmitList"
              :key="index"
              >{{ item }}</el-link
            >
          </article>
        </el-drawer>
        <!-- 教师下载学生完成作业的对话框 -->
        <el-dialog
          ref="teacherDialog"
          :title="studentSumbmitItem.studentName + '提交的作业'"
          :visible.sync="dialogVisibleTeacher"
          width="420px"
          :before-close="handleDialogClose"
        >
          <div>
            <span>得分:</span>
            <el-input-number
              v-model="score"
              @change="handleChange"
              :min="0"
              :max="100"
            ></el-input-number>
          </div>
          <el-button type="text" size="default" @click="downloadStudentHomework"
            >下载附件</el-button
          >
          <span slot="footer">
            <el-button
              type="success"
              size="small"
              @click="scoreToStudent"
              style="float: left; margin-left: 100px"
              >评分</el-button
            >
            <el-button
              type="warning"
              size="small"
              @click="dialogVisibleTeacher = false"
              style="float: right; margin-right: 100px"
              >取消</el-button
            >
          </span>
        </el-dialog>
      </template>

      <!-- 用作扩展其他功能框 -->
      <template v-else>
        <slot name="otherComp"></slot>
      </template>
    </template>

    <!-- 主体框展示的内容 -->
    <article>
      <h3>布置时间: {{ homeworkItem.courseHomeworkDate }}</h3>
      <p class="contentHeader">作业描述:</p>
      <article class="contentArticle">
        {{ homeworkItem.courseHomeworkDescription }}
      </article>
    </article>

    <!-- 上传作业的对话框 -->
    <el-dialog
      title="学生作业"
      :visible.sync="dialogVisible"
      width="420px"
      :before-close="handleDialogClose"
    >
      <span>
        <h2 style="padding-bottom: 5px">
          {{ homeworkItem.courseHomeworkName }}作业上传
        </h2>
        <el-upload
          class="upload-demo"
          drag
          action="#"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :auto-upload="false"
          :file-list="fileList"
          :limit="1"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </span>
      <span slot="footer">
        <el-button
          type="success"
          size="small"
          @click="uploadItem"
          style="float: left; margin-left: 100px"
          >上传</el-button
        >
        <el-button
          type="warning"
          size="small"
          @click="handleDialogClose"
          style="margin-right: 100px"
          >取消</el-button
        >
      </span>
    </el-dialog>
  </el-collapse-item>
</template>
<script>
import dateFormatNow from "@/utils/timeUtil";
import { handleA } from "@/utils/fileUtil";
import {
  downloadHomework,
  seeScore,
  uploadHomework,
} from "@/api/course/homeworkApi";
import {
  downloadHomeworkSubmit,
  scoreToStudent,
  studentWhoFinished,
  studentWhoNotFinished,
} from "@/api/teacher/homeworkApi";
export default {
  name: "FileDownloadCard",
  props: ["index", "homeworkItem", "comptype"],
  data() {
    return {
      dialogVisible: false, //控制学生上传文件对话框开关
      dialogVisibleTeacher: false, //控制教师下载对话框开关
      fileList: [],
      drawer: false, //控制抽屉开关
      score: 60, //给学生作业的评分
      studentSumbmitList: [], //所有学生上传的文件列表
      studentSumbmitItem: {}, //一个学生上传的文件
      studentNotSubmitList: [], //没有交作业的名字列表
    };
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    //#region 学生
    //学生下载作业
    dowloadItem() {
      console.log(this.dowloadSrc);
      downloadHomework({
        teacherId: this.$route.params.teacherId,
        courseId: this.homeworkItem.courseId,
        courseHomeworkRes: this.homeworkItem.courseHomeworkRes,
      })
        .then((res) => {
          // console.log('得到的回复是:');
          console.log(res);
          //生成A标签
          handleA(res);
        })
        .catch((err) => {
          this.$message.error("文件下载失败!");
          console.error(err);
        });
    },
    //上传作业
    uploadItem() {
      this.fileList.forEach((fileItem) => {
        //使用formdata封装数据
        let formData = new FormData();
        formData.append("courseHomeworkId", this.homeworkItem.courseHomeworkId);
        formData.append("studentId", this.$store.getters.getStudentId);
        formData.append("courseHomeworkSubmitDate", dateFormatNow());
        formData.append("courseHomeworkRes", fileItem.name);
        formData.append("teacherId", this.$route.params.teacherId);
        formData.append("courseId", this.$route.params.courseId);
        formData.append("fileRaw", fileItem.raw);
        //发送axios请求,上传数据
        uploadHomework(formData)
          .then((res) => {
            //提示成功，fileList中删除这个元素
            if (res.data == 1) {
              this.$message.success("上传成功");
              this.dialogVisible = false; //关闭对话框
              // 找到 fileItem 的索引
              const index = this.fileList.indexOf(fileItem);
              // 删除指定元素
              if (index > -1) {
                this.fileList.splice(index, 1);
              }
            } else this.$message.warning("上传失败！");
          })
          .catch(() => {
            this.$message.error(
              fileItem.name.trim().split(".")[0] + "上传失败"
            );
          });
      });
    },
    //关闭对话框
    handleDialogClose() {
      this.fileList = [];
      this.dialogVisible = false;
    },
    //查看得分
    seeScore() {
      seeScore(this.$store.getters.getStudentId)
        // axios.get('/homework/' + this.$store.getters.getStudentId + '/' + this.homeworkItem.courseHomeworkId + '/scoreShowToStudent')
        .then((res) => {
          console.log(res);
          if (typeof res.data == "number")
            this.$message.success("你的得分是:" + res.data + "分");
          else this.$message.warning("未批改!");
        })
        .catch((err) => {
          console.error(err);
          this.$message.warning("未批改!");
        });
    },
    //#endregion 学生

    //#region 教师
    //查看学生提交的作业,同时请求数据,打开抽屉
    toViewIsFinish() {
      this.drawer = true;
      //请求已经完成作业的学生信息
      studentWhoFinished(this.homeworkItem.courseHomeworkId)
        //axios.post('/homework/' + this.homeworkItem.courseHomeworkId + '/showHomework')
        .then((res) => {
          this.studentSumbmitList = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
      //请求没有完成作业的学生信息
      studentWhoNotFinished(this.homeworkItem.courseHomeworkId)
        //axios.get('/homework/' + this.homeworkItem.courseHomeworkId + '/showHomework')
        .then((res) => {
          console.log(res);
          this.studentNotSubmitList = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //删除这个作业
    deleteHomework() {
      // alert('触发');
    },
    //控制抽屉关闭
    handleClose() {
      this.drawer = false;
    },
    //显示下载学生提交的作业对话框
    studentWhofinishWork(item) {
      //让对话框显示
      this.dialogVisibleTeacher = true;
      this.studentSumbmitItem = item; //用作显示
    },
    //教师下载学生提交的作业
    downloadStudentHomework() {
      const courseSubmitVo = {
        teacherId: this.$route.params.teacherId,
        courseId: this.$route.params.courseId,
        courseHomeworkSubmitId: this.studentSumbmitItem.courseHomeworkSubmitId,
        studentId: this.studentSumbmitItem.studentId,
      };
      // console.log(courseSubmitVo);
      downloadHomeworkSubmit(courseSubmitVo)
        // axios({
        //   method: 'post',
        //   url: "/homework/downLoadStuSubmit",
        //   data: courseSubmitVo,
        //   responseType: 'blob'})
        .then((res) => {
          handleA(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //教师给学生作业打分
    scoreToStudent() {
      const courseHomeworkScore = {
        courseHomeworkSubmitId: this.studentSumbmitItem.courseHomeworkSubmitId,
        courseHomeworkScore: this.score,
      };
      scoreToStudent(courseHomeworkScore)
        // axios({
        //   method: 'put',
        //   url: '/homework/scoreToStudent',
        //   data: courseHomeworkScore})
        .then((res) => {
          console.log(res);
          if (res.data == 1) {
            this.$message.success("评分成功!");
            this.dialogVisibleTeacher = false; //关闭对话框
          } else {
            this.$message.warning("你已经打过分了!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //#endregion 教师
  },
  mounted() {},
};
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

.floatButton {
  float: right;
  padding: 5px;
}

.el-drawer__body > * {
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
