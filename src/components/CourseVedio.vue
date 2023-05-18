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
import {BlobToUrl} from "@/utils/fileUtil";
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
          let blobFile=BlobToUrl(response);
          // let videoBlob = new Blob([response.data], { type: "video/mp4" });
          // this.videoUrl = URL.createObjectURL(videoBlob);
          this.videoUrl=blobFile.url;
          this.noRepeatedRequests();
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
  beforeDestroy() {
    window.URL.revokeObjectURL(this.videoUrl);
  }
};
</script>
<style></style>
