<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>一封家书征文后台管理系统</span>
      </div>
      <el-button type="info" @click="handleLogout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width= "isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#efba14" unique-opened :collapse="isCollapse" :collapse-transition="false" default-active="1">
            <!-- 一级菜单 -->
            <el-menu-item index="1" >
              <i class="el-icon-menu"></i>
              <span slot="title">信件统计</span>
            </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      isCollapse: false,
      defaultActive: ''
    }
  },

  methods: {
    handleLogout() {
      this.$router.push("/login");
    },

    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;

  .el-header {
    background-color: #383d40;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
      }

      span {
        font-size: 20px;
        color: #fff;
        margin-left: 10px;
        letter-spacing: 2px;
      }
    }
  }

  .el-aside {
    background-color: #545c64;
    .toggle-button {
      background-color: #4a5064;
      color: #fff;
      line-height: 24px;
      font-size: 10px;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
      }

    .el-menu {
      border-right: none;

      .iconfont {
        margin-right: 10px;
      }
    }
  }

  .el-main {
    background-color: #ddd;
  }
}
</style>