<template>
  <el-card class="file-card">
    <div>
      <span>{{fileItem.resVideoName}}</span>
      <el-button class="file-card-delete-btn" type="text" icon="el-icon-delete" @click="handleRemove"
        style="color:#f67d7d"></el-button>
      <el-button v-if="fileType" class="el-icon-edit-btn" type="text" icon="el-icon-edit" style="float: right;"
        @click="handleChange"></el-button>
      <div class="file-card-body">
        <el-form>
          <!-- 插槽，放入内容体 -->
          <slot name="fileCardFormItems"></slot>
        </el-form>
      </div>
    </div>
  </el-card>

</template>
<script>
import {MessageConfirmBox} from "@/utils/dialogUtil";

export default {
  name: 'FileUploadCard',//自定义文件下载框
  props: {
    fileItem: {
      type: Object,
      required: true
    },
    fileType: {//false有修改,true没有
      type: Boolean,
      required: false,
      default: false
    }
    },
    data() {
      return {
      }
    },
    methods: {
      //更新input输入框时，将fileList的属性也更新
      // update(){
      //   this.$emit('update',{ episode: this.episode, alias: this.alias })
      // },
      //删除这个卡片，即不上传
      handleRemove() {
        this.$emit('remove', this.fileItem);
      },
      //点击修改
      handleChange() {
        console.log(this.fileItem)
        MessageConfirmBox(this, "你确定修改这个文件的信息吗?")
          .then(() => {
            this.$emit('change', this.fileItem);
          }).catch(() => {
          this.$message.info('已取消修改');
        });

      }
    },
    mounted() {
      //创建这个对象时，就发送给父组件输入框中内容，防止没有选择时是undefined
      // this.update();
    }
  }
</script>
<style scoped>
  .file-card {
    margin-bottom: 5px;
    min-width: 280px;
    /* flex-basis: calc(25% - 10px); */
    margin-right: 10px;
    height: 280px;
  }
</style>