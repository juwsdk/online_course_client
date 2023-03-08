<template lang="">
  <div>
    <div style="text-align: center;">
      <video ref="video" :src="videoUrl" type="video/mp4" 
      controls
      width="80%"
      style="height: 80vh;
      border-radius: 5px;
      object-fit: fill
      "
       />
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
    data(){
      return{
        videoUrl:''
      }
    },
    mounted() {
      axios.get('/video/chunk', {
        responseType: 'blob'
      })
        .then(response => {
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
        });
    }, 
    methods: {
    },
  }
</script>
<style lang="">

</style>