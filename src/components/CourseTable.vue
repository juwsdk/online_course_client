<template>
  <div>
    <!-- 搜索框 传入自定义事件模糊搜索，子中的信息发给此表格作为数据接收，发送axios请求-->
    <CourseSearchBar @fuzzyQuery="fuzzyQuery">
      <template v-slot:selectOne>
        <slot name="selectOneG"></slot>
      </template>
    </CourseSearchBar>

    <!-- 功能按钮 -->
    <div style="margin: 10px" v-if="showAlters && showOptions">
      <el-row>
        <el-col :span="1" :offset="0">
          <el-button
            type="primary"
            size="mini"
            @click="handleAdd"
            :disabled="loading"
            >新增</el-button
          >
        </el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="tableData"
      stripe
      :border="true"
      sortable
      style="width: 100%"
      :style="contentStyle"
    >
      <!-- 放置单元格 -->
      <slot name="atablecol"></slot>
      <!-- 功能操作区 -->
      <el-table-column label="操作" v-if="showOptions && showDelete">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            v-if="showAlters"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="margin: 10px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 25]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- dialog,点击弹出 -->
    <el-dialog title="新增/修改" :visible.sync="dialogVisible" width="600px">
      <el-form ref="form" :model="form" label-width="80px" adialogitem>
        <slot name="adialogitem"> </slot>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import CourseSearchBar from "@/components/CourseSearchBar";
import {
  addData,
  changeData,
  deleteData,
  loadTableData,
} from "@/api/manage/courseTableApi";
import { MessageConfirmBox } from "@/utils/dialogUtil";
export default {
  name: "CourseTable",
  components: {
    CourseSearchBar,
  },
  props: {
    //获取api接口
    tableInterfce: { type: Object, required: true },
    form: { type: Object, required: false },
    showAlters: { type: Boolean, required: false, default: true },
    showOptions: { type: Boolean, required: false, default: true },
    parentPageSize: { type: Number, required: false, default: 10 },
    showDelete: { type: Boolean, required: false, default: true },
  },
  data() {
    return {
      tableData: [], //table数据
      currentPage: 1, //控制分页
      total: 10, //文本总数
      pageSize: 10,
      loading: true, //是否还在加载
      dialogVisible: false, //弹窗状态
      dialogType: true, //弹窗执行任务,true为新增,false为修改
      fuzzyColumn: "",
      fuzzyValue: "",
      showAlter: true, //是否展示修改等功能按钮
      timerId: null, //设置一个定时器，没有接收到数据则过10s再次请求
    };
  },
  watch: {
    //监视属性
    loading() {
      if (this.loading == false) clearInterval(this.timerId); //关闭这个定时器
    },
  },
  computed: {
    //计算属性
    //通过父组件传递的值看是否展示修改等功能区
    contentStyle() {
      //没有数据时用这个调表格样式
      return this.loading ? { height: "70vh" } : { height: "auto" };
    },
  },

  methods: {
    //控制分页
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
      console.log(this.currentPage);
      this.loadData();
    },
    //控制分页大小
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadData();
    },
    //编辑/修改操作
    handleEdit(index, row) {
      this.$emit("alertForm", row); //发给父组件更新表单
      this.dialogVisible = true; //打开修改框
      this.dialogType = false; //模式为修改
    },
    //请求加载数据
    loadData() {
      loadTableData(this.tableInterfce.tableList, {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        fuzzyColumn: this.fuzzyColumn,
        fuzzyValue: this.fuzzyValue,
      })
        .then((res) => {
          console.log(res);
          this.total = res.data.total; //拿到表格数据总数
          this.tableData = res.data.list; //拿到表格中的数据
          this.loading = false; //关闭表格转圈状态
        })
        .catch((err) => {
          console.error(err);
          this.loading = true;
          this.$message.error("服务器连接失败!");
        });
    },
    handleAdd() {
      //添加数据
      this.dialogVisible = true;
      this.dialogType = true; //这个为true表示弹窗模式为新增
      this.$emit("clearForm"); //清空表单
    },
    handleDelete(index, row) {
      //删除操作
      const obj = row;
      MessageConfirmBox(this, "此操作将永久删除，是否继续?")
        .then(() => {
          deleteData(this.tableInterfce.deleteOne, obj)
            .then((res) => {
              console.log(res);
              if (res.data == 1 || res.data == null) {
                this.$message.success("已经成功删除!");
                this.loadData();
              } else this.$message.warning("删除失败!");
            })
            .catch((err) => {
              console.error(err);
              this.$message.error("删除失败!");
            });
        })
        .catch((err) => {
          console.log(err);
          this.$message.warning("删除失败!");
        });
    },
    onSubmit() {
      //提交表单，发送给表格组件提交
      console.log(this.form);
      //状态为真，表示是新增操作
      if (this.dialogType) {
        addData(this.tableInterfce.insertOne, this.form)
          .then((res) => {
            console.log(res);
            if (res.data == 1) {
              this.$message.success("添加成功");
              this.dialogVisible = false; //关闭弹窗
              this.loadData(); //重新加载数据
            } else this.$message.warning("添加失败!");
          })
          .catch((err) => {
            console.error(err);
            this.$message.error("添加失败!");
          });
      } else {
        //状态为假，表示是修改操作
        changeData(this.tableData.updateOne, this.form)
          .then((res) => {
            console.log("===============");
            console.log(res.data);
            if (res.data == 1) {
              this.$message.success("修改成功");
              this.dialogVisible = false; //关闭弹窗
              this.loadData(); //重新加载数据
            } else this.$message.warning("修改失败");
          })
          .catch((err) => {
            console.error(err);
            this.$message.error("修改失败!");
          });
      }
    },
    //模糊查询
    fuzzyQuery(searchSelect, searchinput) {
      this.fuzzyColumn = searchSelect;
      this.fuzzyValue = searchinput;
      this.loadData();
    },
  },
  created() {
    this.loadData();
    if (this.loading == true)
      this.timerId = setInterval(() => {
        this.loadData();
      }, 100000); //没有请求到数据,则开启定时器
  },
  beforeDestroy() {
    clearInterval(this.timerId); //关闭定时器
  },
};
</script>
<style scoped>
.el-col {
  padding-right: 3px;
}
</style>
