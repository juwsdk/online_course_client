<template lang="">
  <div style="width: 224px;
  ">
    <el-skeleton style="width: 224px;margin: 0 auto;" :loading="loading" animated>
      <template slot="template">
        <el-skeleton-item variant="image" style="width: 224px; height: 238px;" />
        <div style="padding: 14px;">
          <el-skeleton-item variant="h3" style="width: 50%;" />
          <div
            style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;">
            <el-skeleton-item variant="text" style="margin-right: 16px;" />
            <el-skeleton-item variant="text" style="width: 30%;" />
          </div>
        </div>
      </template>
      <template>
        <el-card :body-style="{ padding: '0px', marginBottom: '1px' }" @click.native="pushShow">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image" />
          <div style="padding: 14px;">
            <span>{{courseInfo.courseName}}</span>
            <div class="bottom card-header">
              <span class="text">{{courseInfo.teacherName}}</span>
            </div>
          </div>
        </el-card>
      </template>
    </el-skeleton>
  </div>
</template>
<script>
  export default {
    name: 'CourseCard',
    props: ['courseImage', 'courseInfo','routeName'],
    data () {
      return {
        loading: false,
        currentDate: '2021-06-01'
      }
    },
    methods: {
      pushShow(){//点击加载详情页面
        // alert("111111111");
        // console.log(this.$router);
        this.$router.push({//通过push跳转页面
          name:this.routeName,
          params:{
            id:this.courseInfo.courseId
          }
        });
      }
    },
  }
</script>
<style scoped>
.image{
  width: 224px;
}
</style>