<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>

      <!-- 登录表单区 -->
      <el-form
        label-width="0px"
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="loginForm"
        class="login_form"
      >
        <p class="login_title">一封家书征文后台管理</p>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            type="password"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="login_btns">
          <el-button type="info" @click="resetLoginForm">重置</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  登录表单的数据绑定
      loginForm: {
        username: "",
        password: "",
      },
      //  表单验证规则
      loginFormRules: {
        //  验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "登录名称长度在5至10位之间",
            trigger: "blur",
          },
        ],
        //  验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "登录密码长度在6至15位之间",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        let { data: res } = await this.$http.post("login", this.loginForm);

        if (res.meta.status != 200) {
          this.$message.error(res.meta.msg);
          return;
        } else {
          this.$router.push("/home");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box {
    width: 450px;
    height: 370px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      transform: translateY(-50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .login_form {
      width: 100%;
      height: 100%;
      padding: 0 20px;
      margin-top: 20px;
      box-sizing: border-box;
      transform: translateY(-30%);
      display: flex;
      flex-direction: column;
      .login_title {
        text-align: center;
        padding: 10px 0;
        color: #333;
        letter-spacing: 1px;
        font-size: 16px;
      }
      .el-form-item {
        margin-top: 20px;
      }

      .login_btns {
        align-self: flex-end;
      }
    }
  }
}
</style>
