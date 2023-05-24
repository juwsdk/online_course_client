<template>
  <div>
    <el-row style="margin: 10px">
      <el-col :span="3">
        <el-button type="danger" size="small" @click="clearAll"
          >清空资源</el-button
        >
      </el-col>
      <el-col :span="3" :offset="3">
        <el-button type="primary" size="small" @click="changeCorseInfo"
          >修改信息</el-button
        >
      </el-col>
      <el-col :span="3" :offset="3">
        <el-button type="success" size="small" @click="dialogVisibleCourse=true">修改课程信息</el-button>
      </el-col>
      <el-col :span="3" :offset="3">
        <el-button type="danger" size="small" @click="deleteCourse">删除课程</el-button>
      </el-col>
      <!-- 更新课程信息课程对话框 -->
      <CourseInfoDialog
        :atype="atype"
        :dialogVisibleCourse="dialogVisibleCourse"
        @closeCourseDialoag="closeCourseDialoag"
      />
    </el-row>

    <div class="fileContainer">
      <!-- 文件上传组件 -->
      <FileUploadCard
        v-for="(fileItem, index) in fileList"
        :key="index"
        :fileItem="fileItem"
        style="width: 280px; height: auto"
        @remove="handleRemove(fileItem)"
        :fileType="true"
        @change="handleChange"
      >
        <template v-slot:fileCardFormItems>
          <el-form-item label="集数">
            <el-input v-model="fileItem.resBlues"></el-input>
          </el-form-item>
          <el-form-item label="播放时名称">
            <el-input v-model="fileItem.resVideoName"></el-input>
          </el-form-item>
          <el-form-item label="版权信息">
            <el-input v-model="fileItem.copyright"></el-input>
          </el-form-item>
        </template>
      </FileUploadCard>
    </div>
  </div>
</template>
<script>
// import axios from "@/api";
import FileUploadCard from "@/components/FileUploadCard";
import CourseInfoDialog from "@/components/CourseInfoDialog";
import {clearAllVideo, deleteVideo, loadVideo, updateVideo} from "@/api/teacher/CourseResApi";
import {MessageConfirmBox} from "@/utils/dialogUtil";
import {deleteCourse} from "@/api/teacher/courseApi";
export default {
  name: "TResManage",
  components: {
    FileUploadCard,
    CourseInfoDialog,
    // atype: "courseUpdate",
  },
  data() {
    return {
      fileList: [], //文件列表
      dialogVisibleCourse: false, //是否显示修改课程信息的对话框
      atype: "courseUpdate",
    };
  },
  methods: {
    //加载已经上传到服务器的资源
    loadFileList() {
      loadVideo(this.$route.params.courseId)
      // axios
      //   .post("/video/" + this.$route.params.courseId + "/showFileList")
        .then((res) => {
          console.log(res);
          this.fileList = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleRemove(file) {
      const courseRes = { ...file };
      //发送请求后端删除文件,成功后前端删除文件
      //提示是否要删除
      MessageConfirmBox(this,"此操作将永久删除，是否删除？")
      // this.$confirm("此操作将永久删除, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
        .then(() => {
          deleteVideo(courseRes)
          //   url: "/video/" + this.$route.params.teacherId + "/fileDelete",
            .then((res) => {
              console.log(res);
              if (res.data == 1) {
                //删除成功
                const fileList = this.fileList.filter((item) => item !== file);
                this.fileList = fileList;
                this.$message.success("已经成功删除!");
              }
            })
            .catch((err) => {
              console.error(err);
              this.$message.error("删除失败!");
            });
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("删除失败!");
        });
      console.log(file);
    },
    //修改资源信息
    handleChange(file) {
      updateVideo(file)
      // axios({
      //   method: "put",
      //   url: "/video/fileUpdate",
      //   data: file,
      // })
        .then((res) => {
          if (res.data == 1) this.$message.success("修改成功!");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //清空上传的文件
    clearAll() {
      MessageConfirmBox(this,"此操作将永久删除所有文件，是否继续?")
        .then(() => {
          clearAllVideo(this.$route.params.courseId)
            .then((res) => {
              console.log(res);
              if (res.data == this.fileList.length) {
                //删除成功
                this.fileList = []; //清空fileList
                this.$message.success("已经成功删除!");
                this.loadFileList();//重新加载
              }
            })
            .catch((err) => {
              console.error(err);
              this.$message.error("删除失败!");
            });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //修改课程信息相关操作
    //修改课程信息
    changeCorseInfo() {
      this.dialogVisibleCourse = true;
    },
    //关闭增加课程对话框
    closeCourseDialoag(value) {
      this.dialogVisibleCourse = value;
    },
    //删除课程
    deleteCourse(){
      MessageConfirmBox(this,"此操作将删除整个课程，且不可逆，是否继续?")
        .then(()=>{
          deleteCourse(this.$route.params.courseId)
            .then(()=>{
              this.$message.success("删除成功!");
              this.$router.push("/teacher/coursemanges");
            }).catch(error=>{
              console.log(error);
              this.$message.warning("删除失败!");
          })

        })
        .catch(error=>{
          this.$message.error("删除失败!");
          console.error(error);
        })
    }

  },
  mounted() {
    this.loadFileList();
  },
};
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