<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-panel">
      <van-field
        :error-message="usernameErrorMsg"
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username=''"
      />
      <van-field
        :error-message="passwordErrorMsg"
        v-model="password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        required
      />
    </div>
    <div class="register-button">
      <van-button size="large" type="primary" @click="loginAction" :loading="openLoading">登录</van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import url from "../../serverApi.config";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, //是否开启用户的loading状态
      usernameErrorMsg: "",
      passwordErrorMsg: ""
    };
  },
  created() {
    if (localStorage.userInfo) {
      Toast.success('您已经登录')
      this.$router.push('/')
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //表单验证
    checkForm() {
      let isOk = true;
      if (this.username.length <= 5) {
        this.usernameErrorMsg = "用户名不得小于6位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length <= 5) {
        this.passwordErrorMsg = "密码不得小于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    },
    loginAction() {
      this.checkForm() && this.loginUser();
    },
    loginUser() {
      this.openLoading = true;
      axios({
        url: url.loginUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(res => {
          new Promise(resolve => {
            localStorage.userInfo = { userName: this.username };
            setTimeout(() => {
              resolve();
            }, 500);
          })
            .then(() => {
              Toast.success("登录成功");
              this.$router.push("/");
            })
            .catch(err => {
              Toast.fail("登录状态保存失败");
              console.log(err);
            });
          if (res.data.code == 200 && res.data.message) {
            Toast.success("登录成功");
            this.$router.push("/");
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch(err => {
          Toast.fail("登录失败");
          this.openLoading = false;
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>