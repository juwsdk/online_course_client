<template>
  <el-descriptions class="margin-top" title="个人信息描述" :column="2" border>
    <template slot="extra">
      <el-button type="primary" size="small" @click="infoUpdate">修改</el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        <span>用户名</span>
      </template>
      <span>kooriookami</span>
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
      <span>18100000000</span>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        <span>居住地</span>
      </template>
      <span>苏州市</span>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        <span>备注</span>
      </template>
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        <span>联系地址</span>
      </template>
      <span>江苏省苏州市吴中区吴中大道 1188 号</span>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
  export default {
    name: 'DescriptionsOfMyself',
    data() {
      return {
        info: {},
      }
    },
    methods: {
      infoUpdate() {
        this.$emit('handleUpdate', this.info);
      }
    },
  }
</script>
<style scoped>
  ::v-deep table{
    height: calc( 100vh - 160px );
  }
  span{
    font-weight: bold;
  }
</style>