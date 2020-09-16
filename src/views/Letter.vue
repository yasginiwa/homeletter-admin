<template>
  <div>
    <!-- 面包屑路径 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信件管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡面区域 -->
    <el-card></el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {
    this.getLetters()
  },

  methods: {
    async getLetters() {
      const { data: res } = await this.$http.get("getletters");

      console.log(res);
    },
  },
};
</script>

<style>
</style>