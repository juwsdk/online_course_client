<template lang="">
  <el-card class="file-card">
    <div>
      <span>{{fileItem.name}}</span>
      <el-button class="file-card-delete-btn" type="text" icon="el-icon-delete"
        @click="handleRemove"></el-button>
      <div class="file-card-body">
        <el-form>
          <el-form-item label="集数">
            <el-input v-model="episode" @input="update"></el-input>
          </el-form-item>
          <el-form-item label="播放时名称">
            <el-input v-model="alias" @input="update"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- card body -->
  </el-card>

</template>
<script>
  export default {
    name: 'FileUploadCard',
    props: {
      fileItem: {
        type: Object,
        required: true
      },
      aEposide:{
        type:Number,
        required:true
      }
    },
    data(){
      return{
        episode:this.aEposide,
        alias:''
      }
    },
    methods: {
      update(){
        this.$emit('update',{ episode: this.episode, alias: this.alias })
      },
      //删除这个卡片，即不上传
      handleRemove(){
        this.$emit('remove',this.fileItem);
      }
    },
    created() {
    },
  }
</script>
<style scoped>
  .file-card {
    margin-bottom: 5px;
    width: 280px;
    min-width: 280px;
    /* flex-basis: calc(25% - 10px); */
    margin-right: 10px;
    height: 280px;
  }
</style>