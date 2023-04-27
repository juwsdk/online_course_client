<template>
  <el-descriptions class="margin-top" title="个人信息描述" :column="2" border>
    <template slot="extra">
      <el-button v-if="infoModel!='adm'" type="primary" size="small" @click="infoUpdate">修改</el-button>
    </template>
    <!-- 学生展示这个 -->
    <template v-if="infoModel=='student'">
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          <span>学号</span>
        </template>
        <span>{{info.studentId}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          <span>用户名</span>
        </template>
        <span>{{info.studentName}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          <span>密码</span>
        </template>
        <span> ****************</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          <span>手机号</span>
        </template>
        <span>{{info.studentPhonenum}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          <span>邮箱</span>
        </template>
        <span>{{info.studentEmail}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          <span>居住地</span>
        </template>
        <span>{{info.studentAddress}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          <span>性别</span>
        </template>
        <el-tag size="small">{{info.studentGender}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          <span>生日</span>
        </template>
        <span>{{info.studentBirthday}}</span>
      </el-descriptions-item>

    </template>

    <!-- 教师展示这个 -->
    <template v-if="infoModel=='teacher'">
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          <span>教师号</span>
        </template>
        <span>{{info.teacherId}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          <span>用户名</span>
        </template>
        <span>{{info.teacherName}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          <span>密码</span>
        </template>
        <span> ****************</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          <span>手机号</span>
        </template>
        <span>{{info.teacherPhonenum}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          <span>邮箱</span>
        </template>
        <span>{{info.teacherEmail}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          <span>居住地</span>
        </template>
        <span>{{info.teacherAddress}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          <span>性别</span>
        </template>
        <el-tag size="small">{{info.teacherGender}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          <span>生日</span>
        </template>
        <span>{{info.teacherBirthday}}</span>
      </el-descriptions-item>

    </template>

    <!-- 管理员展示这个 -->
    <template v-if="infoModel=='admin'">
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          <span>管理员号</span>
        </template>
        <span>{{info.admId}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          <span>管理员名</span>
        </template>
        <span>{{info.admName}}</span>
      </el-descriptions-item>

    </template>

  </el-descriptions>
</template>
<script>
  export default {
    name: 'DescriptionsOfMyself',
    props: { info: { type: Object, required: true }, infoModel: { type: String, required: false, default: 'student' } },
    methods: {
      infoUpdate() {
        this.$emit('handleUpdate', this.info);
      }
    },
    mounted() {
      console.log('=============================');
      console.log(this.info);
    },
  }
</script>
<style scoped>
  /* ::v-deep table {
    height: calc(100vh - 160px);
  } */

  span {
    font-weight: bold;
  }
</style>