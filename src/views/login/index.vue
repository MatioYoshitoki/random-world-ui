<script setup>
import LoginFormVue from './components/LoginForm.vue'
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left">
        <img src="@/assets/images/login_left0.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.png" alt="" />
          <p class="logo-text">RadomWorld!</p>
        </div>
        <LoginFormVue />
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: false
</route>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 550px;
  height: 100%;
  min-height: 500px;
  background-color: #eeeeee;
  background-image: url('@/assets/images/login_bg.svg');
  background-position: 50%;
  background-size: 100% 100%;
  background-size: cover;
  .login-box {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 96%;
    height: 94%;
    padding: 0 4% 0 50px;
    background-color: hsl(0deg 0% 100% / 80%);
    border-radius: 10px;
    .login-left {
      width: 800px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login-form {
      width: 420px;
      padding: 50px 40px 45px;
      border-radius: 10px;
      box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
      .login-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 45px;
        .login-icon {
          width: 60px;
          height: 52px;
        }
        .logo-text {
          padding-left: 25px;
          font-size: 42px;
          font-weight: bold;
          color: #34495e;
          white-space: nowrap;
        }
      }
      .el-form-item {
        margin-bottom: 40px;
      }
      .login-btn {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 40px;
        white-space: nowrap;
        .el-button {
          width: 185px;
        }
      }
    }
  }
}
</style>
