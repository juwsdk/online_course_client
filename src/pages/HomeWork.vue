<!-- <template lang="">
  <div>
    <CourseVedio/>
  </div>
</template>
<script>
  import CourseVedio from '@/components/CourseVedio';
export default {
  name:'HomeWork',
  components:{
    CourseVedio
  }
}
</script>
<style lang="">
  
</style> -->
<template>
  <div>
    <el-upload
      class="upload-demo"
      action="/api/upload"
      :show-file-list="true"
      :on-remove="handleFileRemove"
      multiple
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      <div slot="file-list" class="file-list">
        <div v-for="(file, index) in fileList" :key="file.uid" class="file-item">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ fileSize(file.size) }}</span>
          <i class="el-icon-delete" @click="handleDelete(index)"></i>
        </div>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [], // 上传文件列表
    };
  },
  methods: {
    handleFileRemove(file, fileList) {
      // 文件从上传列表中删除时触发
      console.log("File removed: ", file);
    },
    handleDelete(index) {
      // 删除上传文件
      this.fileList.splice(index, 1);
    },
    fileSize(size) {
      // 格式化文件大小
      if (size < 1024) {
        return size + "B";
      } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + "KB";
      } else {
        return (size / (1024 * 1024)).toFixed(2) + "MB";
      }
    },
  },
};
</script>
<style>

</style>