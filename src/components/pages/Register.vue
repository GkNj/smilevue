<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username=''"
      />
      <van-field v-model="password" label="密码" type="password" placeholder="请输入密码" required />
    </div>
    <div class="register-button">
      <van-button size="large" type="primary" @click="registerUser">注册</van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "../../serverApi.config";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerUser() {
      console.log(this.password);
      console.log(this.username);
      
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
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