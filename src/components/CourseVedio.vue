<template lang="">
  <div>
    <div style="text-align: center;">
      <video ref="video" :src="videoUrl" type="video/mp4" controls width="80%" style="height: 80vh;
      border-radius: 5px;
      object-fit: fill
      " />
      <!-- <el-button type="primary" size="default" @click="playVideo">播放</el-button> -->
      <!-- class="video-js vjs-default-skin vjs-big-play-centered"  -->
    </div>
  </div>
</template>
<script>
  // import videojs from 'video.js'
  // import 'video.js/dist/video-js.css'
  import axios from '@/api'
  export default {
    name: 'CourseVedio',
    props: ['srcUrl'],
    data() {
      return {
        videoUrl: ''
      }
    },
    methods: {
      loadData() {
        axios.get('/video/getResource', {
          params: {
            srcUrl: this.srcUrl
          },
          responseType: 'blob'
        })
          .then(response => {
            // console.log();
            let videoBlob = new Blob([response.data], { type: 'video/mp4' })
            // console.log(videoBlob);
            this.videoUrl = URL.createObjectURL(videoBlob);
            // this.videoUrl=this.videoUrl.substr(this.videoUrl.lastIndexOf("/") + 1);
            console.log(this.videoUrl);
            // let player = videojs(this.$refs.video)
            // player.src(this.videoUrl)
          })
          .catch(error => {
            console.log(error);
            // console.log('1111111111111' + this.srcUrl);
          });
      }
    },
    mounted() {
      this.loadData()
    },
    watch: {
      srcUrl() {
        this.loadData()
      },
    },

  }
</script>
<style lang="">

</style>