<template>
  <div id="mainBody">
    <v-chart class="countCourseStyle" autoresize :option="countChartOptions" />
    <div class="chartBodyStyle">
      <v-chart class="pieChartStyle" autoresize :option="countHomeWorkChartOptions" />
      <v-chart class="pieChartStyle" autoresize :option="countAskQuestionsChartOptions" />
    </div>
    <div class="chartBodyStyle">
      <v-chart style="width: 100%;height: 100%;" :option="weekClockOptins" />
    </div>
  </div>
</template>
<script>
  import {
    loadCountAskQuestionsChartData,
    loadCountChartOptionsData,
    loadCountHomeWorkChartData, loadWeekClockData
  } from "@/api/course/courseStaApi";

  export default {
    name: 'CourseSta',//课程统计页面
    data() {
      return {
        studentId: this.$store.getters.getStudentId,
        //统计学生选课数的统计表
        countChartOptions: {
          title: { text: '学生选课数统计' },
          legend: { data: ['课程数', '选课数'] },
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          xAxis: { type: 'value' },//x轴
          yAxis: { type: 'category', },//y轴
          series: [{ type: 'bar', name: '课程数' }, { type: 'bar', name: '选课数' }],// 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
          dataset: { source: [] }
        },
        //统计学生作业完成情况的饼图
        countHomeWorkChartOptions: {
          title: { text: '作业完成情况' },
          legend: {},
          color: ['#91cc75', '#f36969'],
          tooltip: { trigger: 'item' },
          series: [{ type: 'pie' }],
          dataset: { source: [] }/* { value: 335, name: '已完成' }, { value: 234, name: '未完成' } */
        },
        //统计学生提问情况
        countAskQuestionsChartOptions: {
          title: { text: '提问情况' },
          legend: {},/* data: ['提问', '其他提问']  */
          color: ['#73c0de', '#ffdc60'],
          tooltip: { trigger: 'item' },
          series: [{ type: 'pie' }],
          dataset: { source: [] }/* { value: 335, name: '提问' }, { value: 234, name: '其他提问' } */
        },
        //最近三周打卡情况
        weekClockOptins: {
          title: { text: '最近三周打卡情况' },
          color: ['#de33a5'],
          xAxis: { type: 'category' },
          tooltip: { trigger: 'item' },
          yAxis: { type: 'value' },
          series: [{ type: 'line' }],
          dataset: { source: [] }/* ['第一周', 7], ['第二周', 5], ['第三周', 6] */
        }
      };
    },
    methods: {
      // 请求加载数据学生选课数统计
      loadCountChartOptionsData() {
        loadCountChartOptionsData()
          .then(res => {
            //将得到的数据加入到统计图中
            this.countChartOptions.dataset.source.push(['课程数', res.data.countAll, res.data.studentCountAll])
          })
          .catch(err => {
            console.error(err);
          });
      },
      //请求加载学生学生作业完成情况的饼图
      loadCountAskQuestionsChartData() {
        loadCountAskQuestionsChartData()
          .then(res => {
            this.countHomeWorkChartOptions.dataset.source.push({ value: res.data.student, name: '已完成' });
            this.countHomeWorkChartOptions.dataset.source.push({ value: res.data.all - res.data.student, name: '未完成' });
          })
          .catch(err => {
            console.error(err);
          })
      },
      //请求加载学生提问情况的饼图
      loadCountHomeWorkChartData() {
        loadCountHomeWorkChartData()
          .then(res => {
            this.countAskQuestionsChartOptions.dataset.source.push({ value: res.data.student, name: '提问' });
            this.countAskQuestionsChartOptions.dataset.source.push({ value: res.data.all - res.data.student, name: '其他问题' });
          })
          .catch(err => {
            console.error(err);
          })
      },
      //请求最近三周打卡情况
      loadWeekClockData() {
        loadWeekClockData()
          .then(res => {
            this.weekClockOptins.dataset.source.push(['第一周',res.data.firstWeek]);
            this.weekClockOptins.dataset.source.push(['第二周',res.data.secondWeek]);
            this.weekClockOptins.dataset.source.push(['第三周',res.data.thirdWeek]);
            console.log(res);
          })
          .catch(err => {
            console.error(err);
          })
      }
    },
    mounted() {
      this.loadCountChartOptionsData();
      this.loadCountAskQuestionsChartData();
      this.loadCountHomeWorkChartData();
      this.loadWeekClockData();
    },
  }
</script>
<style scoped>
  #mainBody {
    display: flex;
    width: 100%;
    height: 100%;
    /* flex-direction: row; */
    flex-wrap: wrap;
  }

  #mainBody:first-child .countCourseStyle {
    width: 100%;
    height: 200px;
  }

  .pieChartStyle {
    width: 100%;
    /* padding: 2.5%; */
    height: 50%;
    /* background-color: antiquewhite; */
  }

  .chartBodyStyle {
    height: calc(100vh - 300px);
    width: 50%;
  }
</style>