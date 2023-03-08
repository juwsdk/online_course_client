<template>
  <div>
    <div style="margin: 10px;">
      <el-row>
        <el-col :span="1" :offset="0">
          <el-button type="primary" size="mini" @click="">新增</el-button>
        </el-col>
        <el-col :span="2" :offset="18">
          <el-button type="success" size="mini" @click="">导入</el-button>
        </el-col>
        <el-col :span="1" :offset="0">
          <el-button type="info" size="mini" @click="">导出</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" stripe :border="true" sortable style="width: 100%;">
      <!-- 放置单元格 -->
      <slot name="atablecol"></slot>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin:10px 0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 20, 25]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>

</template>
<script>
  import axios from '@/api';
  export default {
    name: 'CourseTable',
    components: {

    },
    props: ['tableInterfce'],//获取api接口
    data() {
      return {
        tableData: [],
        currentPage: 1,//控制分页
        total: 10,//文本总数
        pageSize: 10,
      }
    },

    methods: {
      handleCurrentChange(pageNum) {
        this.currentPage = pageNum;
        console.log(this.currentPage);
        this.loadData();
      },//控制分页
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadData();
      },//控制分页大小
      loadData() {
        axios.get(this.tableInterfce.prefix + this.tableInterfce.tableList, {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
        })
          .then(res => {
            // console.log(this.currentPage);
            this.total = res.data.total;
            this.tableData = res.data.list;
            // console.log(this.tableData)
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    created() {
      this.loadData();
    },
  }
</script>
<style scoped>
  .el-col {
    padding-right: 3px;
  }
</style>