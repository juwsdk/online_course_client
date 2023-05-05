<template>
  <div>
    <div style="text-align: center">
      <video
        ref="video"
        :src="videoUrl"
        type="video/mp4"
        controls
        width="80%"
        style="height: 80vh; border-radius: 5px; object-fit: fill"
      />
    </div>
  </div>
</template>
<script>
import {playVideo} from "@/api/course/playVedioApi";
export default {
  name: "CourseVedio",
  props: ["srcUrl"],
  data() {
    return {
      videoUrl: "",
    };
  },
  methods: {
    loadData() {
      playVideo(this.srcUrl)
      // axios
      //   .get("/video/getResource", {
      //     params: {
      //       srcUrl: this.srcUrl,
      //     },
      //     responseType: "blob",
      //   })
        .then((response) => {
          // console.log();
          let videoBlob = new Blob([response.data], { type: "video/mp4" });
          // console.log(videoBlob);
          this.videoUrl = URL.createObjectURL(videoBlob);
          // this.videoUrl=this.videoUrl.substr(this.videoUrl.lastIndexOf("/") + 1);
          console.log(this.videoUrl);
          this.noRepeatedRequests();
          // let player = videojs(this.$refs.video)
          // player.src(this.videoUrl)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //避免多次点击造成重复请求视频,间隔为0.5秒
    noRepeatedRequests() {
      //让父对象禁止点击事件
      this.$emit("intervalAccess");
      let timer = setTimeout(() => {
        //父对象恢复点击
        this.$emit("intervalAccess");
        clearTimeout(timer);
      }, 500);
    },
  },
  mounted() {},
  watch: {
    srcUrl() {
      this.loadData();
    },
  },
};
</script>
<style></style>
