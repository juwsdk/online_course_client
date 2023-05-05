<template>
  <div>
    <!-- 放置卡片的插槽 -->
    <div id="sklonbody">
      <slot name="cards"></slot>
    </div>

    <!-- 放置分页组件 -->
    <el-row style="margin: 10px 0">
      <el-col :span="12" :offset="8">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size.sync="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { courseList, courseListMore } from "@/api/course/courseApi";
export default {
  name: "CourseCards",
  components: {},
  props: {
    courseInterface: { type: Object, required: true },
    aPageSize: { type: Number, required: false, default: 10 },
  },
  data() {
    return {
      currentPage: 1, //控制分页
      total: 4, //文本总数
      pageSize: this.aPageSize,
      courseData: [], //课程数据
      totalPage: 0, //总页数
    };
  },
  computed: {},
  methods: {
    //控制分页
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
      //当前不是第一页则后面的通知父组件改变样式
      if (
        this.$parent.$options.name == "CourseSelect" &&
        this.currentPage != 1
      ) {
        this.$emit("styleChange", false, 10);
        this.pageSize = 10;
      } else {
        this.$emit("styleChange", true, 5);
        this.pageSize = 5;
      }
      this.loadData();
    },

    //请求数据,分页展示
    loadData() {
      console.log(this.totalPage);
      courseList(
        this.courseInterface.courseList,
        {
          pageNum: /* pageNum */ this.currentPage,
          pageSize: this.pageSize,
        }
      )
        .then((res) => {
          this.total = res.data.total;
          this.courseData = res.data.list;
          console.log(res.data.list);
          this.$emit("loadCourse", this.courseData);
          this.totalPage = Math.ceil(this.total / this.pageSize);
          //如果是courseSelect父页面，那么6-10因为切换没有访问到，加入到最后的一个页面中展示
          if (
            this.totalPage == this.currentPage &&
            this.$parent.$options.name == "CourseSelect"
          ) {
            //请求6-10的数据
            courseListMore( this.courseInterface.courseList)
              .then((res) => {
                this.courseData.push(...res.data.list);
                // console.log("=====================");
                // console.log(this.courseData);
                this.$emit("loadCourse", this.courseData); //把请求到的信息发送给父组件
              })
              .catch((err) => {
                console.error(err);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style>
#sklonbody {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  height: auto;
  min-width: 400px;
}
</style>
