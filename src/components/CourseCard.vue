<template>
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
          <img ref="itemImg"
            src="../assets/book.jpg"
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
  import axios from '@/api';
  export default {
    name: 'CourseCard',
    props: ['courseImage', 'courseInfo', 'routeName'],
    data() {
      return {
        loading: true,
        currentDate: '2021-06-01'
      }
    },
    methods: {
      pushShow() {//点击加载详情页面
        this.$router.push({//通过push跳转页面
          name: this.routeName,
          params: {
            teacherId: this.courseInfo.teacherId,
            courseId: this.courseInfo.courseId
          },
        });
      },
      loadImage() {
        if (this.courseInfo.courseImage != null) {
          axios.get('/teacher/courseShow', {
            params: {
              courseId: this.courseInfo.courseId,
              teacherId: this.courseInfo.teacherId,
              courseImage: this.courseInfo.courseImage
            },
            responseType: 'blob'
          },
          ).then(res => {
            // console.log(res);
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
      if (this.courseInfo != null)
        this.loading = false;
      this.loadImage();
    },

  }
</script>
<style scoped>
  .image {
    width: 224px;
    height: 224px;
  object-fit: fill;
  }
</style>