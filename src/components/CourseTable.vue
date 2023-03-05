<template>
  <div>
    <div style="margin: 10px;">
      <el-row >
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
      <el-table-column prop="date" label="日期" sortable>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
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
  import CourseVedio from './CourseVedio';
  export default {
    name: 'CourseTable',
    components: {

    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        currentPage: 1,//控制分页
        total: 10,//文本总数
      }
    },

    methods: {
      handleCurrentChange() {

      },//控制分页
      handleSizeChange() {

      }//控制分页大小
    },
  }
</script>
<style scoped>
.el-col{
  padding-right: 3px;
}
</style>