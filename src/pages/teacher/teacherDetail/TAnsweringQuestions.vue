<template>
  <CommentVeiw :showHeader="false">
    <!-- 插槽，写入相应的数据 -->
    <template v-slot:commentsMain>
      <ul class="infinite-list" style="overflow:auto;height: 100%;">
        <CourseQuestionLi v-for="(item,index) in questionsList" :key="questionsList.courseQuestionId" :item="item"
          @answerQuestion="answerQuestion" :liIndex="index"/>
      </ul>
    </template>

    <!-- 底部输入框 -->
    <template v-slot:commentsInput>
      <div id="timeBody">
        <div class="dateFormatNowStyle">
          {{clockInDate}}
        </div>
        <div class="dateFormatNowStyle">
          回复:{{questionsObj.liIndex+1}}
        </div>
        <!--  <div class="dateFormatNowStyle">
          <el-button type="text" v-show="inputMode=='回复'" @click="changeInputMode">取消</el-button>
        </div> -->
        <div>
          <el-button type="primary" size="small" style="float: right;height: 30px;margin: 7.5px;"
            @click="sendQus">发送</el-button>
        </div>
      </div>
      <div>
        <el-input v-model="inputInfo" ref="answerInput" type="textarea" id="scheduleInput" resize="none"></el-input>
      </div>
    </template>

  </CommentVeiw>
</template>
<script>
  import CommentVeiw from '@/layout/comments';
  import CourseQuestionLi from '@/components/CourseQuestionLi';
  import { dateFormatNow } from '@/utils/timeUtil';
  import questionInterface from '@/api/questionInterface';
  import axios from '@/api/';
  export default {
    name: 'TAnsweringQuestions',//教师给学生答疑页面
    components: {
      CommentVeiw,
      CourseQuestionLi
    },
    data() {
      return {
        questionsList: [],//存放请求到的提问以及回答数据
        inputInfo: '',//输入框的内容
        questionsObj:{questionsId:null,liIndex:-100},//回复的问题的ID
      }
    },
    methods: {
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
      //发送对问题的回复
      sendQus() {
        if(this.questionsObj.questionsId==null || this.questionsObj.liIndex<0)
          this.$message.warning('请选择要回复的问题!');
        //封装数据
        const answer={
          courseId:this.$route.params.courseId,
          courseQuestionInfo:this.inputInfo,
          parentQuestionId:this.questionsObj.questionsId
        };
        if(this.questionsObj.questionsId==0){
          this.questionsObj.questionsId==null;//防止bug
          return;
        }
          
        axios.put(questionInterface.prefix + questionInterface.insertOne, answer)
          .then(res => {
            console.log(res);
            if (res.data == 1) {
              //将父id置为空并将输入框置为空
              this.$message.success('回复成功!');
              this.questionsObj.questionsId= null;
              this.questionsObj.liIndex=-100;
              this.inputInfo = '';
            }else
              this.$message.warning('服务器处理失败');
          })
          .catch(err => {
            console.error(err);
            this.$message.warning('输入有误!');
          })
      },
      //点击li的回复时会发送自定义事件传给这个函数
      answerQuestion(questionsId,liIndex) {
        this.questionsObj={questionsId,liIndex};//传递给设定的值，获取id
      },
    },
    mounted() {
      this.loadqestionList();
    },
    computed: {
      //获取当前时间并格式化
      clockInDate() {
        return dateFormatNow();
      }
    },
  }
</script>
<style scoped>
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