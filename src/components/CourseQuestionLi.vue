<template>
  <li class="questionsLi" :style="changeStyleIfHavingAnswer">
    <article>
      <h1>提问学生学号:{{item.studentId}}</h1>
      <h3>提问内容:</h3>
      <div>
        {{item.courseQuestionInfo}}
      </div>
    </article>

    <el-button type="text" size="small" id="expandButtonT" @click="answerThis" style="font-weight: bold;">回复</el-button>
    <el-button ref="showButton" type="text" size="small" id="expandButtonB" @click="showAnswer" style="font-weight: bold;">展开</el-button>

    <template v-if="havingAnswer">
      <article id="qustionAnswer" v-for="answerItem in questionAnswerList" :key="answerItem.courseQuestionId">
        <h1 v-show="answerItem.studentId!=null">回复者:{{answerItem.studentId}}</h1>
        <h1 v-show="answerItem.studentId==null">教师回复:</h1>
        <div>
          {{answerItem.courseQuestionInfo}}
        </div>
      </article>
    </template>

  </li>
</template>
<script>
  import {showAnswer} from "@/api/question/questionApi";
  export default {
    name: 'CourseQuestionLi',
    props: { item: { type: Object, required: true },liIndex:{type:Number,required:false} },
    data() {
      return {
        questionAnswerList: [],
        havingAnswer: false
      }
    },
    methods: {
      //展开回复框逻辑
      showAnswer() {
        //发送请求查看有没有子评论,有则发送给父组件进行展示
        if (this.$refs.showButton.$el.innerText == '展开') {
          showAnswer(this.item.courseQuestionId)
          //axios.post(questionInterface.prefix + '/' + this.item.courseQuestionId + questionInterface.tableChild)
            .then(res => {
              // console.log('子评论');
              // console.log(res);
              if (res.data.length > 0) {//说明有子评论,则加载到列表中
                this.havingAnswer = true;
                this.questionAnswerList = res.data;
              }
            })
            .catch(err => {
              console.error(err);
            });
          this.$refs.showButton.$el.innerText = '收起';
        } else {
          this.havingAnswer = false;
          this.$refs.showButton.$el.innerText = '展开';
        }

      },
      //回复这个评论
      answerThis() {
        //发送给父组件父组件处理
        this.$emit('answerQuestion', this.item.courseQuestionId,this.liIndex);
      },

    },
    computed: {
      changeStyleIfHavingAnswer() {
        return this.havingAnswer ? { height: this.questionAnswerList.length * 60 + 100 + 'px' } : { height: '100px' };
      }
    }
  }
</script>
<style scoped>
  /* 提问栏样式设计 */
  .questionsLi {
    background-image: linear-gradient(to bottom, #424f63, #454263);
    border-radius: 10px;
    height: 100px;
    overflow: auto;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
    color: white;
  }

  #expandButtonB {
    position: absolute;
    top: 85px;
    right: 15px;
  }

  #expandButtonT {
    position: absolute;
    top: 0;
    right: 15px;
    color: #67c23a;
  }

  #qustionAnswer {}
</style>