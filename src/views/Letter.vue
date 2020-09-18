<template>
  <div>
    <!-- 面包屑路径 -->
    <el-row>
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>信件管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3">
        <el-button type="warning" size="small" @click="exportExcel">导出Excel</el-button>
      </el-col>
    </el-row>

    <!-- 卡面区域 -->
    <el-card>
      <!-- 信件表格区域 -->
      <el-table :data="letterList" border stripe>
        <el-table-column width="80" type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="gender" label="性别" width="120"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="200"></el-table-column>
        <el-table-column class="content" prop="content" label="正文"></el-table-column>
      </el-table>

      <!-- 分页浏览 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 3, 5]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import qee from "qf-export-excel";

export default {
  data() {
    return {
      letterList: [],
      allLetterList: [],
      queryInfo: {
        pagenum: 1,
        pagesize: 3,
      },
      total: 0,
    };
  },

  created() {
    this.getLetters();


    this.getAllLetters();
  },

  methods: {
    //  获取所有信件信息
    async getAllLetters() {
      const { data: res } = await this.$http.get("getallletters");

      this.allLetterList = res.data.result;
    },

    //  获取信件信息
    async getLetters() {
      let { data: res } = await this.$http.get("getletters", {
        params: this.queryInfo,
      });

      if (res.meta.status !== 200) {
        this.$message.error("获取信件信息失败");
        return;
      }

      this.letterList = res.data.result;

      this.total = res.data.total;
    },

    //  监听 pagesize改变的事件
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      this.getLetters();
    },

    //  监听 页码值改变的事件
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getLetters();
    },

    //  导出
    exportExcel() {
      let titleList = [
        {
          title: "序号",
          key: "lid",
        },
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "性别",
          key: "gender",
        },
        {
          title: "电话",
          key: "mobile",
        },
        {
          title: "正文",
          key: "content",
        },
      ];


      console.log(this.allLetterList)
      qee(titleList, this.allLetterList, "一封家书投稿.xls");
    },
  },
};
</script>

<style>
</style>