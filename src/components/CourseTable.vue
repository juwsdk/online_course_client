<template>
  <div>

    <!-- 搜索框 传入自定义事件模糊搜索，子中的信息发给此表格作为数据接收，发送axios请求-->
    <CourseSearchBar @fuzzyQuery="fuzzyQuery">
      <template v-slot:selectOne>
        <slot name="selectOneG"></slot>
      </template>
    </CourseSearchBar>

    <!-- 功能按钮 -->
    <div style="margin: 10px;" v-if="showAlter">
      <el-row>
        <el-col :span="1" :offset="0">
          <el-button type="primary" size="mini" @click="handleAdd" :disabled="loading">新增</el-button>
        </el-col>
        <el-col :span="2" :offset="18">
          <el-button type="success" size="mini" @click="" :disabled="loading">导入</el-button>
        </el-col>
        <el-col :span="1" :offset="0">
          <el-button type="info" size="mini" @click="" :disabled="loading">导出</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <el-table v-loading="loading" element-loading-text="拼命加载中" :data="tableData" stripe :border="true" sortable
      style="width: 100%;" :style="contentStyle">
      <!-- 放置单元格 -->
      <slot name="atablecol"></slot>
        <!-- 功能操作区 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-if="showAlter">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        
    </el-table>

    <!-- 分页 -->
    <div style="margin:10px 0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 20, 25]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    
    <!-- dialog,点击弹出 -->
    <el-dialog title="新增/修改" :visible.sync="dialogVisible" width="600px">
      <el-form ref="form" :model="form" label-width="80px" adialogitem>
        <slot name="adialogitem">
        </slot>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>


    </el-dialog>
  </div>

</template>
<script>
  import axios from '@/api';
  import CourseSearchBar from '@/components/CourseSearchBar';
  export default {
    name: 'CourseTable',
    components: {
      CourseSearchBar
    },
    props: ['tableInterfce', 'form','showAlters'],//获取api接口
    data() {
      return {
        tableData: [],
        currentPage: 1,//控制分页
        total: 10,//文本总数
        pageSize: 10,
        loading: true,//是否还在加载
        dialogVisible: false,//弹窗状态
        fuzzyColumn:'',
        fuzzyValue:'',
        showAlter:true//是否展示修改等功能按钮
      }
    },

    methods: {
      handleCurrentChange(pageNum) {//控制分页
        this.currentPage = pageNum;
        console.log(this.currentPage);
        this.loadData();
      },
      handleSizeChange(pageSize) {//控制分页大小
        this.pageSize = pageSize;
        this.loadData();
      },
      handleEdit(index, row) {//编辑/修改操作
        // console.log(index,row);
        this.$emit("alertForm", row);//发给父组件更新表单
        this.dialogVisible = true;//打开修改框
      },
      loadData() {//请求加载数据
        axios.get(this.tableInterfce.prefix + this.tableInterfce.tableList, {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            fuzzyColumn:this.fuzzyColumn,
            fuzzyValue:this.fuzzyValue
          }
        })
          .then(res => {
            // console.log(this.fuzzyValue);
            console.log(res);
            this.total = res.data.total;
            this.tableData = res.data.list;
            this.loading = false;
            // console.log(this.tableData)
          })
          .catch(err => {
            console.error(err);
            this.loading = true;
            this.$message({//elementui错误提示
              showClose: true,
              message: '服务器连接失败!',
              type: 'error'
            });
          });
      },
      handleAdd() {//添加数据
        this.dialogVisible = true;
        this.$emit("clearForm")//清空表单
      },
      handleDelete(index, row) {//删除操作
        console.log(row);
      },
      onSubmit() {//提交表单，发送给表格组件提交
        console.log(this.form);
        axios.post(this.tableInterfce.prefix + this.tableInterfce.insertOne, this.form)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.error(err);
          })
      },
      fuzzyQuery(searchSelect, searchinput) {//模糊查询
        // console.log(searchinput + '|||' + searchSelect);
        this.fuzzyColumn=searchSelect;
        this.fuzzyValue=searchinput;
        // console.log(this.fuzzyColumn+"\\\\"+this.searchSelect);
        this.loadData();
      }
    },
    created() {
      this.loadData();
      //通过父组件传递的值看是否展示修改等功能区
      if(this.showAlters==false && typeof this.showAlters !='undefined')
        this.showAlter=false
      // console.log(this.showAlters);
      // console.log(this.form);
    },
    computed: {
     
      contentStyle() {//没有数据时用这个调表格样式
        return this.loading ? { height: '70vh' } : { height: 'auto' };
      }
    }
  }
</script>
<style scoped>
  .el-col {
    padding-right: 3px;
  }
</style>