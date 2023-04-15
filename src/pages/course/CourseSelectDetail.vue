<template lang="">
  <div>
    <el-container direction="vertical">
      <!--  -->
      <el-header height="" class="classHeader">
        <!-- 用于展示标题和回退页面 -->
        <el-page-header @back="goBack" :content="course.courseName">
        </el-page-header>
        <el-button type="primary" size="small" style="float: right;" @click="chooseCourse"
          :disabled="chooseDisable">选择</el-button>

      </el-header>

      <!--  -->
      <el-main height="" class="classMain">
        <div class="classShow">
          <!-- 放置图像 -->
          <div class="demo-image__error">
            <div class="block">
              <!-- <span class="demonstration">默认</span> -->
              <!-- <el-image></el-image> -->
              <img ref="itemImg" src="@/assets/book.jpg" alt="" style="height: 300px;">
              <!-- <el-image src="../assets/book.jpg" fit="fill" :lazy="true"></el-image> -->
              
            </div>
          </div>
        </div>
        <div id="courseInfo">
          <span>课程介绍:</span>
          <article>{{course.courseInfo}}</article>
        </div>
      </el-main>

    </el-container>

  </div>
</template>
<script>
  import { courseSelectInterface } from '@/api/courseInterface';
  import axios from '@/api';
  export default {
    name: 'CourseSelectDetail',
    data() {
      return {
        course: {},//从后端获得的路由信息
        courseSelectInterface,//接口
        chooseDisable: false,//是否禁用选课按钮
      }
    },
    methods: {
      //返回上一页
      goBack() {
        this.$router.replace('/course/courseselects/courseselect');
      },
      //加载数据
      loadData() {
        axios.get(this.courseSelectInterface.prefix + this.courseSelectInterface.courseDetail, {
          params: {
            courseId: this.$route.params.courseId
          }
        })
          .then(res => {
            this.course = res.data;
            this.loadImage();
          })
          .catch(err => {
            console.error(err);
          })
      },
      //选择课程
      chooseCourse() {
        //发送请求请求是否选择了此课程
        axios.get(this.courseSelectInterface.prefix + this.courseSelectInterface.courseChoose + '/' + this.$route.params.courseId + '/' + this.$store.getters.getStudentId)
          .then(res => {
            if (res.data == 1) {//说明已经选择
              this.$message.warning('你已经选过了！');
              this.chooseDisable = true;
            } else {//发送请求选课
              axios.put(this.courseSelectInterface.prefix + this.courseSelectInterface.courseChoose + '/' + this.$route.params.courseId + '/' + this.$store.getters.getStudentId)
                .then(res => {
                  if (res.data == 1) {
                    this.$message.success('成功选课!');
                    this.chooseCourse = true;
                  } else {
                    this.$message.warning('选课失败!');
                  }
                })
                .catch(err => {
                  console.error(err);
                })
            }
          })
          .catch(err => {
            console.error(err);
          });
      },
      //加载课程图片
      loadImage() {
        if (this.course.courseImage != null) {
          axios.get('/teacher/courseShow', {
            params: {
              courseId: this.course.courseId,
              teacherId: this.course.teacherId,
              courseImage: this.course.courseImage
            },
            responseType: 'blob'
          },
          ).then(res => {
            console.log(res);
            const imgUrl = URL.createObjectURL(res.data);
            this.$refs.itemImg.setAttribute('src', imgUrl);
          })
            .catch(err => {
              console.error(err);
            })
        }
      }
    },
    mounted() {
      this.loadData();
    },
  }
</script>
<style scoped>
  #courseInfo {
    font-size: large;
    height: calc(80vh - 300px);
  }

  #courseInfo>* {
    font-size: large;
  }

  .classHeader {
    background-color: azure;
    width: auto;
    /* background-color: antiquewhite; */
  }

  .classMain {
    padding: 0;
    background-color: azure;
  }

  .classShow {
    background-color: rgba(255, 255, 255, .5);
    height: 300px;
  }
</style>