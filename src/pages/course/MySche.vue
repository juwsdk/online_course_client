<template lang="">
  <CommentVeiw>
    <template v-slot:commentsHeader>
      <h1>个人计划</h1>
    </template>
    <template v-slot:commentsMain>
      <ul class="infinite-list" style="overflow:auto">
        <li v-for="(item,index) in scheduleList">
          <el-button class="file-card-delete-btn" type="text" icon="el-icon-delete" @click="handleRemove(item)"
            style="float: right;color:#e4baba;"></el-button>
          <div>
            <h3>开始时间:</h3><span>{{item.start.formattedDate}}||{{item.start.formattedTime}}</span>
          </div>
          <div>
            <h3>结束时间:</h3><span>{{item.end.formattedDate}}||{{item.end.formattedTime}}</span>
          </div>
          <div>
            <h3>内容:</h3>{{item.info}}
          </div>
        </li>
      </ul>
    </template>
    <template v-slot:commentsInput>
      <div id="timeBody">
        <el-date-picker type="datetimerange" is-range v-model="scheduleItem.time" range-separator="至"
          start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini" format="yyyy-MM-dd HH:mm"
          :default-time="['07:00:00', '07:00:00']">
        </el-date-picker>
        <div id="dateFormatNowStyle">
          {{dateFormatNow}}
        </div>
        <div>
          <el-button type="primary" size="small" style="float: right;height: 30px;margin: 7.5px;"
            @click="addSche">添加</el-button>
        </div>
      </div>
      <div>
        <el-input type="textarea" id="scheduleInput" resize="none" v-model="scheduleItem.info"></el-input>
      </div>
    </template>
  </CommentVeiw>

  

</template>
<script>
  import { dateFormatNow, datetimeFormat } from '@/utils/timeUtil';
  import CommentVeiw from '@/layout/comments';
  export default {
    name: 'MySche',
    data() {
      return {
        scheduleList: [],
        scheduleItem: {},
      }
    },
    components: {
      CommentVeiw //布局组件
    },
    methods: {
      addSche() {
        if (this.scheduleItem.time != null || typeof this.scheduleItem.time != 'undefined') {
          if (this.scheduleItem.info == '' || this.scheduleItem.info == null) {
            this.$message.warning('请输入内容');
            return;
          } else {
            const start = datetimeFormat(this.scheduleItem.time[0]);
            const end = datetimeFormat(this.scheduleItem.time[1]);
            this.$set(this.scheduleItem, 'start', start);
            this.$set(this.scheduleItem, 'end', end);
            console.log(this.scheduleItem);
            this.scheduleList.push(this.scheduleItem);
            //存入本地
            localStorage.setItem('scheduleList', JSON.stringify(this.scheduleList));
            // console.log(this.scheduleItem.time);
            this.scheduleItem = {};
            return;
          }
        } else
          this.$message.warning('请选择时间');
      },
      handleRemove(item) {
        console.log(item);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const scheduleList = this.scheduleList.filter(listItem => listItem !== item);//删除这个元素
          this.scheduleList = scheduleList;
          localStorage.removeItem('scheduleList');
          localStorage.setItem('scheduleList', JSON.stringify(this.scheduleList));//存入本地新的scheduleList
          // console.log(1111111111111111111);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    computed: {
      dateFormatNow() {
        return dateFormatNow();
      }
    },
    mounted() {
      //刚刚加载时，取出数据
      const list = localStorage.getItem('scheduleList');
      if (list != null && typeof list != 'undefined') {

        this.scheduleList = JSON.parse(list);
      }

    },
  }
</script>
<style scoped>
  

  #timeBody {
    height: 40px;
    padding-bottom: 5px;
    position: relative;
  }

  /* 日期样式 */
  #dateFormatNowStyle {
    float: left;
    padding-left: 10px;
    line-height: 40px;
    text-align: center;
    font-size: large;
    color: white;
  }

  /* 输入框样式 */
  ::v-deep #scheduleInput {
    height: 150px;
    background-color: rgba(255, 255, 255, .2);
    backdrop-filter: blur(10px);
    color: white;
    border-color: #7367f0;
  }


  .el-range-editor--mini.el-input__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  h1 {
    font-size: large;
    color: white;
    line-height: 60px;
    text-align: left;
  }

  ul {
    height: 100%;
    width: 100%;
  }

  li {
    background-color: #424f63;
    color: white;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
  }

  li>div {
    padding: 5px;
  }

  h3 {
    color: #18c429;
    font-size: medium;
  }
</style>