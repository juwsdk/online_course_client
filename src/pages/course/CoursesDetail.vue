<template lang="">
  <DetailView>
    <template v-slot:pageHeader>
      <el-page-header @back="goBack" :content="'课程页面'+$route.params.courseId">
      </el-page-header>
      <el-tabs v-model="tabsObj.activeTab" @tab-click="handleClick">
        <el-tab-pane label="课程学习" :name="tabsObj.tabsPage[0]"></el-tab-pane>
        <el-tab-pane label="课程作业" :name="tabsObj.tabsPage[1]"></el-tab-pane>
        <el-tab-pane label="打卡与答疑" :name="tabsObj.tabsPage[2]"></el-tab-pane>
      </el-tabs>
    </template>
    <!-- 展示侧边栏选择视频集数 -->
    <template v-slot:pageAside>
      <el-aside width="200px" style="height: 100%;
      overflow-x: hidden;
      overflow-y: auto;" v-show="tabsObj.activeTab=='courseLearn'">
        <el-menu class="el-menu-vertical-demo" style="width:200px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;">
          <el-menu-item v-for="courseRoute in courseRoutes" :key="courseRoute.courseResId"
            @click="showVedio(courseRoute.resFileName)" :disabled="isNotClickCourse">
            <span slot="title">{{courseRoute.resVideoName}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
    </template>

    <template v-slot:pageMain>
      <!-- 是课程学习时就展示这个页面 -->
      <template v-if="tabsObj.activeTab=='courseLearn'">
        <CourseVedio :srcUrl="srcUrl" @intervalAccess="intervalAccess" />
      </template>
      <!-- 是课程作业时就展示这个页面 -->
      <template v-if="tabsObj.activeTab=='courseHomework'">
        <el-collapse @change="handleChange">
          <FileDownloadCard v-for="(homeworkItem,index) in homeworkList" :key="index" :index="index"
            :comptype="comptype" :homeworkItem="homeworkItem"
            :srcPrefix="homeworkInterface.prefix+homeworkInterface.downLoad" />
        </el-collapse>
      </template>
      <!-- 是打卡记录时就是这个页面 -->
      <template v-if="tabsObj.activeTab=='courseClockAnsweringQuestions'">
        <el-row :gutter="20">
          <el-button class="clockInStyle" size="small" type="success" @click="clockInButton">打卡</el-button>
          <div id="clockTime">{{clockInDate}}</div>
        </el-row>
      </template>
    </template>
  </DetailView>
</template>
<script>
  import DetailView from '@/layout/coursedetail';
  import CourseVedio from '@/components/CourseVedio';
  import { courseInfoInterface } from '@/api/courseInterface';
  import homeworkInterface from '@/api/homeworkInterface';
  import FileDownloadCard from '@/components/FileDownloadCard';
  import axios from '@/api';
  import dateFormatNow from '../../utils/timeUtil.js';
  export default {
    name: 'CoursesDetail',
    components: {
      DetailView,
      CourseVedio,
      FileDownloadCard
    },
    data() {
      return {
        courseInfoInterface,//课程接口信息
        homeworkInterface,//作业接口信息
        courseRoutes: [], //课程集数目录
        homeworkList: [],//课程作业集合
        srcUrl: '',//传递给子组件文件url
        resFileName: '',//当前播放的视频
        isNotClickCourse: false,//是否可以切换课程，放置多次快速点击多次发送请求
        tabsObj: {
          tabsPage: ['courseLearn', 'courseHomework', 'courseClockAnsweringQuestions'],
          activeTab: 'courseLearn',///进入页面时课程页面高亮
        },
        comptype: 'student',//用来表示这是展示学生的下载组件
      }
    },
    methods: {
      //跳转到详情页面
      goBack() {
        this.$router.replace('/course/mycourse/courses');
      },
      //加载数据,课程的课程名路由表
      loadData() {
        axios.post(courseInfoInterface.prefix + courseInfoInterface.courseDetail + '/' + this.$route.params.courseId)
          .then(res => {
            // console.log(res);
            this.courseRoutes = res.data;
            this.showVedio(res.data[0].resFileName);
          })
          .catch(err => {
            console.error(err);
          })
      },
      //加载作业数据
      loadHomeworkData() {
        axios.post(this.homeworkInterface.prefix + '/' + this.$route.params.courseId + this.homeworkInterface.homeworkList)
          .then(res => {
            // console.log(res);
            this.homeworkList = res.data;
          })
          .catch(err => {
            console.error(err);
          })
      },
      //点击路由展示相应的视频组件
      showVedio(filename) {
        console.log(filename);
        this.srcUrl = '/' + this.$route.params.teacherId + '/' + this.$route.params.courseId + '/res/' + filename.trim();
        this.resFileName = filename.split('.')[0];
      },
      //打卡
      clockInButton() {
        console.log(this.resFileName);
      },
      //防止多次点击重复请求数据
      intervalAccess() {
        this.isNotClickCourse = !this.isNotClickCourse;
      },
      //标签页点击切换
      handleClick(tab) {
        // console.log(tab.name);
        //如果是学习界面
        if (tab.name === this.tabsObj.tabsPage[0]) {
          this.tabsObj.showType = true;
        }
        //如果是作业界面
        else if (tab.name === this.tabsObj.tabsPage[1]) {
          this.tabsObj.showType = false;
        }
      },
      handleChange() { }
    },
    computed: {
      //获取当前时间并格式化
      clockInDate() {
        return dateFormatNow();
      }
    },

    mounted() {
      this.loadData();
      this.loadHomeworkData();
    },
  }
</script>
<style scoped>
  .el-page-header {
    /* background-color: antiquewhite; */
    width: auto;
    /* height: 100%; */
    padding-right: 20px;
    /* float: left; */
  }

  /* ::v-deep 同/deep/强制修改带有scoped的css属性 */
  ::v-deep .el-page-header__title {
    font-size: 14px;
    text-align: center;
    font-weight: 500;
    height: 45px;
    line-height: 45px;
  }

  ::v-deep .el-page-header__content {
    height: 45px;
    line-height: 45px;
  }
  /* 时间展示的样式 */
  #clockTime{
    float: right;
    background-color: #67c23a;
    color:white;
  }
</style>