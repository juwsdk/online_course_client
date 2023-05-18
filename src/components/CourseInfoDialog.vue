<template>
  <el-dialog title="课程" :visible.sync="dialogVisibleCourse" width="450px" :before-close="handleClose">
    <el-form ref="courseform" :model="courseform" label-width="80px">
      <el-form-item label="课程id" v-if="atype=='courseUpdate'">
        <el-input v-model="courseform.courseId" type="number" disabled></el-input>
      </el-form-item>
      <el-form-item label="教师id">
        <el-input v-model="courseform.teacherId=teacherId" type="number" disabled></el-input>
      </el-form-item>
      <el-form-item label="课程名">
        <el-input v-model="courseform.courseName"></el-input>
      </el-form-item>
      <el-form-item label="课程描述">
        <el-input v-model="courseform.courseInfo" type="textarea" autosize></el-input>
      </el-form-item>
      <el-form-item label="课程图片">
        <el-upload action="#" list-type="picture-card" :on-remove="handleImageRemove" :on-preview="handleImagePreview"
          :auto-upload="false" :limit="1" :on-change="handleImageChange" :file-list="dataImage.fileItem">
          <i class="el-icon-plus"></i>
        </el-upload>
<!--        <img :src="dataImage.imageUrl" v-if="dataImage.imageShow" style="object-fit: ">-->
        <el-dialog :visible.sync="dataImage.dialogVisible">
          <img width="100%" :src="dataImage.dialogImageUrl" class="el-upload-list__item-thumbnail" alt="">
        </el-dialog>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="success" size="small" @click="submitInfoCourse"
        style="float: left;margin-left: 100px;">提交</el-button>
      <el-button type="warning" size="small" @click="handleClose" style="margin-right: 100px;">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {addCourse, showCourse, showCourseImage, updateCourse} from "@/api/teacher/courseApi";
import {BlobToUrl} from "@/utils/fileUtil";
  export default {
    name: 'CourseInfoDialog',
    props: {
      atype: { type: String, required: false, default: 'courseInsert' },//这个对话框的类型，由父组件传递
      dialogVisibleCourse: { type: Boolean, required: true },//父组件按钮控制此组件显示
    },
    data() {
      return {
        courseform: {},//课程信息放在这
        dataImage: { dialogImageUrl: '', dialogVisible: false, fileItem: [] },//图片上传框 图片放大功能
        image:{imageUrl:'',imageShow:false},//如果事先上传了图片，则让图片回显
        teacherId: this.$store.state.teacherId,
      }
    },
    methods: {
      //#region 图片处理策略
      //删除要修改的图片
      handleImageRemove(file) {
        this.dataImage.fileItem = [];
      },
      //查看图片时
      handleImagePreview(file) {
        console.log("===================")
        this.dataImage.dialogImageUrl = file.url;
        this.dataImage.dialogVisible = true;
        console.log(file.raw);
      },
      //当新加入图片时
      handleImageChange(file) {
        if(this.dataImage.fileItem.length<1)
          this.dataImage.fileItem.push(file);
      },
      //#endregion 图片处理策略
      //新增加一门课程确认按钮
      submitInfoCourse() {
        //新增课程
        if (this.atype == 'courseInsert') {
          let courseFile = new FormData();
          courseFile.append('teacherId', this.courseform.teacherId);
          courseFile.append('courseName', this.courseform.courseName);
          courseFile.append('courseInfo', this.courseform.courseInfo);
          console.log(this.dataImage.fileItem.length>0)
          if(this.dataImage.fileItem.length>0){
            courseFile.append('courseImage', this.dataImage.fileItem[0].name);
            courseFile.append('fileRaw', this.dataImage.fileItem[0].raw);
          }
          addCourse(courseFile)
          //axios.post('/teacher/courseInsert', courseFile)
            .then(res => {
              console.log(res);
              if (res.data == 1) {
                this.$message.success('添加成功!');
                this.$emit('closeCourseDialoag', false);//让父组件关闭这个对话框
                this.courseform = {};//将数据清空
                this.dataImage.fileItem = [];
              } else {
                this.$message.danger('上传失败!');
              }
            })
            .catch(err => {
              console.error(err);
              this.$message.warning('上传失败!');
            })
        }//修改课程
        else if (this.atype == 'courseUpdate') {
          let courseFile = new FormData();
          courseFile.append('courseId', this.$route.params.courseId)
          courseFile.append('teacherId', this.courseform.teacherId);
          courseFile.append('courseName', this.courseform.courseName);
          courseFile.append('courseInfo', this.courseform.courseInfo);
          if (typeof this.dataImage.fileItem[0].raw != 'undefined' && this.dataImage.fileItem[0].raw != null){
            //上传了文件才修改
            courseFile.append('courseImage', this.dataImage.fileItem[0].name);
            courseFile.append('fileRaw', this.dataImage.fileItem[0].raw);
          }
          console.log(courseFile);
          // console.log('=================================');
          updateCourse(courseFile)
          //axios.post('/teacher/courseUpdate', courseFile)
            .then(res => {
              if (res.data == 1) {
                this.$message.success('修改成功!');
                this.dataImage.fileItem.pop();
                this.loadData();
              }else {
                this.$message.warning("网络原因，修改失败 ！");
              }
            }).catch(err => {
              console.log(err);
              this.$message.warning('修改失败!');
            });
        }
      },
      handleClose() {
        this.$emit('closeCourseDialoag', false);
      },
      loadData() {
        //页面是修改课程时，首先加载课程信息
        showCourse(this.$route.params.courseId)
        //axios.get('/teacher/' + this.$route.params.courseId + '/courseShow')
          .then(res => {
            console.log(res);
            this.courseform = res.data;
            if(this.courseform.courseImage!=null){
              //请求访问图片
              showCourseImage({
                teacherId:this.$route.params.teacherId,
                courseId:this.$route.params.courseId,
                courseImage:this.courseform.courseImage
              }).then(res=>{
                //将url设置为图片url并展示
                let blobFile=BlobToUrl(res);
                this.image.imageUrl=blobFile.url;
                this.image.imageShow=true;
                //设置为fileItem
                this.dataImage.fileItem.push(blobFile);
                // this.dataImage.imageUrl=blobFile.url;
                // this.dataImage.imageShow=true;
              }).catch(err=>{
                console.error(err);
              })
            }
          })
          .catch(err => {
            console.error(err);
            this.$message.warning('服务器异常!');
          });
      },
    },
    mounted() {
      if (this.atype == 'courseUpdate')
        this.loadData();
      console.log(this.atype);
    },

  }
</script>
<style>

</style>