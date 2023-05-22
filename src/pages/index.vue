<template>
  <div id="mainBody">
    <!--个人信息描述-->
    <DescriptionsOfMyself @handleUpdate="handleUpdate" :info="form" :infoModel="formModel" />
    <!--系统信息-->
    <article>
      <h1>本系统是公共学习平台，提供学生网课学习的一个平台。</h1>
      公共学习平台是指一个面向公众、开放式的在线学习平台，
      旨在提供各种类型、各种领域的学习资源，为个人提供学习、培训和教育的机会。公共学习平台通常具有以下特点：
      <p>
        开放性：公共学习平台是一个开放的平台，任何人都可以通过互联网访问和使用。这使得学习平台可以汇集来自不同地区、不同背景、不同领域的学习者和教育者，促进知识的共享和传播。
      </p>
      <p>
        多样性：公共学习平台提供各种类型、各种领域的学习资源，包括课程、测试题等。这些资源可以满足不同学习者的需求，包括自学、远程教育、职业培训等。
      </p>
      <p>
        互动性：公共学习平台通常具有互动性，可以通过在线讨论、问答、协作等方式促进学习者之间的交流和合作。这使得学习变得更加有趣、有挑战性和具有社交性。
      </p>
      <p>
        可定制性：公共学习平台通常具有可定制性，可以根据不同用户的需求和要求进行个性化设置。例如，可以根据学习者的学习进度和兴趣推荐相关的学习资源，或者根据教育者的教学风格和目标设计个性化的课程和学习方案。
      </p>
    </article>
    <!-- 修改教师信息对话框 -->
    <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="450px">
      <el-form v-if="formModel == 'teacher'" ref="form" :model="form" label-width="80px">
        <el-form-item label="教师号">
          <el-input v-model="form.teacherId" disabled></el-input>
        </el-form-item>
        <el-form-item label="教师名">
          <el-input v-model="form.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.teacherPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <template>
            <el-radio v-model="form.teacherGender" label="男">男</el-radio>
            <el-radio v-model="form.teacherGender" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="form.teacherBirthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.teacherPhonenum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.teacherEmail" type="email"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.teacherAddress"></el-input>
        </el-form-item>
      </el-form>

      <!-- 修改学生信息 -->
      <el-form v-if="formModel == 'student'" ref="form" :model="form" label-width="80px">
        <el-form-item label="学号">
          <el-input v-model="form.studentId" disabled></el-input>
        </el-form-item>
        <el-form-item label="学生名">
          <el-input v-model="form.studentName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.studentPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.studentGender" label="男">男</el-radio>
          <el-radio v-model="form.studentGender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="form.studentBirthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.studentPhonenum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.studentEmail" type="email"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.studentAddress"></el-input>
        </el-form-item>
      </el-form>

      <!-- 修改管理员信息 -->
      <el-form v-if="formModel == 'admin'" ref="form" :model="form" label-width="80px">
        <el-form-item label="管理员号">
          <el-input v-model="form.admId" disabled></el-input>
        </el-form-item>
        <el-form-item label="管理员名">
          <el-input v-model="form.admName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.admPassword" type="password" show-password></el-input>
        </el-form-item>
      </el-form>


      <span slot="footer">
        <el-button type="success" size="small" @click="submitInfo"
          style="float: left; margin-left: 100px">修改</el-button>
        <el-button type="warning" size="small" @click="handleDialogClose" style="margin-right: 100px">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import axios from "@/api";
  import DescriptionsOfMyself from "@/components/DescriptionsOfMyself";
  import { mapGetters } from "vuex";
  export default {
    name: "MyIndex",
    components: {
      DescriptionsOfMyself,
    },
    data() {
      return {
        dialogVisible: false, //是否显示dialog修改个人信息
        form: {}, //修改的信息
        formModel: this.$store.getters.getLoginType,
      };
    },
    computed: {
      ...mapGetters({
        getStudentId: "getStudentId",
        getTeacherId: "getTeacherId",
        getAdmiId: "getAdmiId",
        getLoginType: "getLoginType",
      }),
    },
    methods: {
      //修改教师信息
      handleUpdate(infoObj) {
        // this.form = this.infoObj;
        this.dialogVisible = true;
      },
      //提交修改表单
      submitInfo() {
        let url;
        if (this.formModel == "student") {
          url = "/student/studentUpdate";
        } else if (this.formModel == "teacher") {
          url = "/teacher/teacherUpdate";
        } else if (this.formModel == "admin") {
          url = "/admin/admUpdate";
        }
        axios
          .put(url, this.form)
          .then((res) => {
            console.log(res);
            if (res.data == 1) {
              this.$message.success("修改成功!");
              this.dialogVisible = false; //关闭对话框
              this.loadData(); //重新加载数据
            } else {
              this.$message.warning("修改失败!");
            }
          })
          .catch((err) => {
            console.error(err);
            this.$message.warning("修改失败!");
          });
      },
      //取消，关闭对话框
      handleDialogClose() {
        this.dialogVisible = false;
      },
      loadData() {
        let url;
        if (this.formModel == "student") {
          url = "/student/" + this.getStudentId;
        } else if (this.formModel == "teacher") {
          url = "/teacher/" + this.getTeacherId + "/teacherOne";
        } else if (this.formModel == "admin") {
          url = "/admin/" + this.getAdmiId + "/admOne";
        }
        // console.log(this.getTeacherId);
        axios
          .post(url)
          .then((res) => {
            console.log(res);
            this.form = res.data;
            console.log(this.form);
          })
          .catch((err) => {
            console.error(err);
          });
      },
    },

    mounted() {
      this.loadData();
    },
  };
</script>
<style scoped>
  #mainBody {
    position: relative;
    height: calc( 100vh - 100px );
  }

  article {
    position: absolute;
    bottom: 0;
    top: auto;
    height: 100px;
  }
</style>