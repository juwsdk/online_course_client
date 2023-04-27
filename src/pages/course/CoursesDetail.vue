<template>
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
        <el-menu class="el-menu-vertical-demo" style="">
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

        <CommentVeiw :showHeader="false">
          <!-- 插槽，写入相应的数据 -->
          <template v-slot:commentsMain>
            <ul class="infinite-list" style="overflow:auto;height: 100%;">
              <CourseQuestionLi v-for="(item,index) in questionsList" :key="questionsList.courseQuestionId" :item="item"
                @answerQuestion="answerQuestion" />
            </ul>
          </template>

          <!-- 底部输入框 -->
          <template v-slot:commentsInput>
            <div id="timeBody">
              <div class="dateFormatNowStyle">
                {{clockInDate}}
              </div>
              <div class="dateFormatNowStyle">
                模式:{{inputMode}}
              </div>
              <div class="dateFormatNowStyle">
                <el-button type="text" v-show="inputMode=='回复'" @click="changeInputMode">取消</el-button>
              </div>
              <div>
                <el-button type="primary" size="small" style="float: right;height: 30px;margin: 7.5px;"
                  @click="sendQus">发送</el-button>
                <el-button type="success" size="small" style="float: right;height: 30px;margin: 7.5px;"
                  @click="clockIn" :disabled="clockInDisabled">打卡</el-button>
              </div>
            </div>
            <div>
              <el-input v-model="inputInfo" ref="answerInput" type="textarea" id="scheduleInput"
                resize="none"></el-input>
            </div>
          </template>
          
        </CommentVeiw>

      </template>
    </template>
  </DetailView>
</template>
<script>
  import DetailView from '@/layout/coursedetail';
  import CommentVeiw from '@/layout/comments';
  import CourseVedio from '@/components/CourseVedio';
  import { courseInfoInterface } from '@/api/courseInterface';
  import homeworkInterface from '@/api/homeworkInterface';
  import FileDownloadCard from '@/components/FileDownloadCard';
  import axios from '@/api';
  import { dateFormatNow } from '@/utils/timeUtil';
  import questionInterface from '@/api/questionInterface';
  import CourseQuestionLi from '@/components/CourseQuestionLi';
  export default {
    name: 'CoursesDetail',//课程详情页面
    components: {
      DetailView,
      CommentVeiw,
      CourseVedio,
      FileDownloadCard,
      CourseQuestionLi
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
          loadedData: [true, false, false]//是否请求了数据
        },
        comptype: 'student',//用来表示这是展示学生的下载组件
        questionsList: [],//存放请求到的提问以及回答数据
        inputMode: '提问',//输入框的模式，有提问和回复
        courseQuestionId: null,//回复评论的id
        inputInfo: '',//输入框中内容
        clockInDisabled:false,//打卡按钮禁用状态
      }
    },
    methods: {
      //跳转到详情页面
      goBack() {
        this.$router.replace('/course/mycourse/courses');
      },
      //#region 数据请求
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
      //加载提问列表
      loadqestionList() {
        axios.post(questionInterface.prefix + '/' + this.$route.params.courseId + questionInterface.tableList)
          .then(res => {
            console.log(res);
            this.questionsList = res.data;
          })
          .catch(err => {
            console.error(err);
          });
      },
      //#endregion 数据请求
      //加载数据,课程的课程名路由表

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
          if (this.tabsObj.loadedData[1] == false) {//防止多次点击重复请求数据
            this.loadHomeworkData();//请求作业数据
            this.tabsObj.loadedData[1] = true;
          }
        } else {//是提问界面

        }
      },
      handleChange() { },
      //#region 评论相关
      //回复评论
      answerQuestion(courseQuestionId) {
        console.log('要回复的id是');
        console.log(courseQuestionId);
        //输入框获得焦点,并设置模式为回复谁
        this.$refs.answerInput.focus();
        this.inputMode = '回复';
        this.courseQuestionId = courseQuestionId;
      },

      changeInputMode() {//评论框失去焦点时将模式设置为提问,并且父id置为空
        this.inputMode = '提问';
        this.courseQuestionId = null;
      },
      sendQus() {// 提问/回复问题
        const answer = {//定义一个类发送
          courseId: this.$route.params.courseId,//路由中获取
          studentId: this.$store.getters.getTeacherId,//vuex中获取
          courseQuestionInfo: this.inputInfo,//主要内容
          parentQuestionId: this.courseQuestionId//父id
        };
        axios.put(questionInterface.prefix + questionInterface.insertOne, answer)
          .then(res => {
            console.log(res);
            if (res.data == 1) {
              //将父id置为空并将输入框置为空
              this.courseQuestionId = null;
              this.inputInfo = '';
              this.inputMode = '提问';
            }else
              this.$message.warning('服务器处理失败');
          })
          .catch(err => {
            console.error(err);
            this.$message.warning('输入有误!');
          })
      },
      //#endregion 评论相关
      clockIn() {//打卡的函数
        const courseAttendance={
          studentId:this.$store.getters.getStudentId,
          courseId:this.$route.params.courseId,
          courseAttDate:this.clockInDate
        }
        axios.put(questionInterface.prefix + questionInterface.clock,courseAttendance)
        .then(res => {
          console.log(res);
          if(res.data==0)
            this.$message.warning('网络原因打卡失败!');
          else if(res.data==1){
            this.$message.success('打卡成功');
            this.clockInDisabled=true;
          }else{
            this.$message.warning('今天已经打过卡了哦!');
            this.clockInDisabled=true;
          }
        })
        .catch(err => {
          console.error(err); 
        });
      }
    },
    computed: {
      //获取当前时间并格式化
      clockInDate() {
        return dateFormatNow();
      }
    },

    mounted() {
      this.loadData();
      this.loadqestionList();
    },
  }
</script>
<style scoped>
  ::v-deep .el-menu-vertical-demo {
    width: 200px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

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
  #clockTime {
    float: right;
    background-color: #67c23a;
    color: white;
  }

  #timeBody {
    height: 40px;
    padding-bottom: 5px;
    position: relative;
  }

  /* 日期样式 */
  .dateFormatNowStyle {
    float: left;
    padding-left: 10px;
    line-height: 40px;
    text-align: center;
    font-size: large;
    color: white;
  }

  /* 输入框样式 */
  ::v-deep #scheduleInput {
    height: 150px;
    background-color: rgba(255, 255, 255, .2);
    backdrop-filter: blur(10px);
    color: white;
    border-color: #7367f0;
  }
</style>