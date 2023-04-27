<template>
  <div>
    <!-- 教师个人信息描述 -->
    <el-descriptions title="教师信息" :labelStyle="{ fontSize: '16px',color:'#434863' }"
      :contentStyle="{ fontSize: '14px' }">

      <el-descriptions-item label="教师名">{{teacherInfo.teacherName}}</el-descriptions-item>
      <el-descriptions-item label="教授课程数">{{courses.length}}</el-descriptions-item>
      <el-descriptions-item label="选课人数">{{studentCount}}</el-descriptions-item>
      <el-descriptions-item label="教授的课程">
        {{coursesNames}}
      </el-descriptions-item>
    </el-descriptions>

    <el-button type="success" size="mini" @click="addCourse">新增课程</el-button>
    <!-- 新增课程对话框 -->
    <CourseInfoDialog :dialogVisibleCourse="dialogVisibleCourse" @closeCourseDialoag="closeCourseDialoag"/>

    <div class="chartBodyStyle">
      <!-- echarts -->
      <v-chart class="pieChartStyle" autoresize :option="teacherChartOptions" />
      <!-- 查询选课学生的表格 -->
      <CourseTable class="pieChartStyle" :tableInterfce="aTableInterface" :tableInfo="tableInfo"
        :showAlters="showAlters" :parentPageSize="parentPageSize">
        <template v-slot:selectOneG>
          <el-option v-for="(searchvalue,searchlable,index) in tableInfo" :label="searchlable" :value="searchvalue"
            :key="index">
          </el-option>
        </template>
        <template v-slot:atablecol>
          <el-table-column v-for="(tableprop,tablelable,index) in tableInfo" :key="index" :label="tablelable"
            :prop="tableprop" sortable >
          </el-table-column>
        </template>
      </CourseTable>
    </div>

  </div>
</template>
<script>
  import CourseTable from '@/components/CourseTable';
  import { teacherFindStudetTable } from '@/api/teacherTableData';
  import axios from '@/api';
  import teacherMangeStudent from '@/api/teacherInterface';
  import CourseInfoDialog from '@/components/CourseInfoDialog';
  export default {
    name: 'TeacherIndex',
    components: {
      CourseTable,
      CourseInfoDialog
    },
    data() {
      return {
        tableInfo: teacherFindStudetTable,//表格的信息配置
        aTableInterface: teacherMangeStudent,//表格的访问接口
        teacherMangeStudent,//后端接口
        teacherId: this.$store.state.teacherId,
        teacherInfo: {},
        // courseform: {},//新增的课程信息放在这
        dialogVisibleCourse: false,//是否显示增加课程信息的对话框
        // dataImage: { dialogImageUrl: '', dialogVisible: false, fileItem: {} },//图片上传框
        studentCount: 0,//教授学生数
        courses: {},//教授的课程
        teacherCourses: [],//教授的课程
        showAlters: false,//告诉表格子组件不展示修改新增功能
        // dialogVisible: false,//是否显示dialog修改个人信息
        //展示教师教授课程选课人数的饼图
        teacherChartOptions: {
          title: { text: '选课人数统计' },
          legend: {},
          color: ['#91cc75', '#f36969'],
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          xAxis: [{ type: 'category', axisTick: { alignWithLabel: true } }],
          yAxis: [{ type: 'value' }],
          series: [{ type: 'bar', name: '选课人数' }],
          dataset: { source: [] }
        },
        parentPageSize: 5//要请求的页数范围
      }
    },
    computed: {
      //显示课程名字到页面
      coursesNames() {
        let names = '';
        if (this.courses != null && this.courses.length > 0)
          this.courses.forEach(courseOne => {
            names = names + courseOne.courseName + ' ';
          });
        return names;
      },

    },
    methods: {
      //#region 教师相关操作
      loadData() {
        //拿到教师信息
        axios.post(this.teacherMangeStudent.prefix + '/' + this.teacherMangeStudent.teacherOne)
          .then(res => {
            this.teacherInfo = res.data;//拿到教师的信息
          })
          .catch(err => {
            console.error(err);
          });
        //拿到教授课程数
        axios.get(this.teacherMangeStudent.prefix + '/' + this.teacherMangeStudent.countObj)
          .then(res => {
            console.log(res);
            this.studentCount = res.data;
            // console.log(this.teacherMangeStudent);
            // console.log(res)
          })
          .catch(err => {
            console.error(err);
            // console.log('2222222222');
            // console.log(this.teacherMangeStudent);
          });
        //拿到教授的课程
        axios.post(this.teacherMangeStudent.prefix + '/' + this.teacherMangeStudent.teacherList)
          .then(res => {
            console.log(res);
            this.courses = res.data;
            // console.log(res.data);
          })
          .catch(err => {
            console.error(err);
          })
      },

      //#endregion 教师相关操作
      //#region 图片处理策略
      //删除要修改的图片
      // handleImageRemove(file) {
      //   this.dataImage.fileItem = {};
      // },
      // //查看图片时
      // handleImagePreview(file) {
      //   this.dataImage.dialogImageUrl = file.url;
      //   this.dataImage.dialogVisible = true;
      // },
      // //当新加入图片时
      // handleImageChange(file) {
      //   this.dataImage.fileItem = file;
      // },

      //增加课程
      addCourse() {
        this.dialogVisibleCourse = true;
      },
      //关闭增加课程对话框
      closeCourseDialoag(value){
        this.dialogVisibleCourse=value;
      },
      //新增加一门课程确认按钮
      // submitInfoCourse() {
      //   let courseFile = new FormData();
      //   courseFile.append('teacherId', this.courseform.teacherId);
      //   courseFile.append('courseName', this.courseform.courseName);
      //   courseFile.append('courseInfo', this.courseform.courseInfo);
      //   courseFile.append('courseImage', this.dataImage.fileItem.name);
      //   courseFile.append('fileRaw', this.dataImage.fileItem.raw);
      //   axios.post('/teacher/courseInsert', courseFile)
      //     .then(res => {
      //       console.log(res);
      //       if (res.data == 1) {
      //         this.$message.success('添加成功!');
      //         this.dialogVisibleCourse = false;
      //         this.courseform = {};//将数据清空
      //         this.dataImage.fileItem = {};
      //       } else {
      //         this.$message.danger('上传失败!')
      //       }

      //     })
      //     .catch(err => {
      //       console.error(err);
      //       this.$message.warning('上传失败!')
      //     })
      // },
      //#endregion 图片处理策略
      //#region 统计表信息请求
      loadStatisticsData() {
        axios.post(this.teacherMangeStudent.prefix + '/' + this.teacherMangeStudent.countCourseStudent)
          .then(res => {
            //将数据加入到统计表中 ['语文', 3], ['数学', 4], ['C', 6], ['人工', 1], ['语s文', 3], ['数z学', 4], ['Cz', 6], ['人z工', 1]
            res.data.forEach(course => {
              this.teacherChartOptions.dataset.source.push([course.name, course.res]);
            });
          })
          .catch(err => {
            console.error(err);
          })
      }
      //#endregion 统计表信息请求

    },
    created() {
      // this.assembleUrl();
    },
    mounted() {
      this.loadData();
      this.loadStatisticsData();
    },
    destroyed() {

    },
  }
</script>
<style scoped>
  .descriptionStyle {
    font-size: 20px;
  }

  .chartBodyStyle {
    margin-top: 10px;
    height: calc(100vh - 270px);
    width: 100%;
    display: flex;
    overflow: hidden;
    /* background-image: linear-gradient(135deg,#5b247a,#1bcedf); */
  }

  .pieChartStyle {
    width: 50%;
    height: 100%;

  }
</style>