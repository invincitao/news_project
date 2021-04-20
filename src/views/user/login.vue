<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <!-- <input placeholder="请输入手机号" class="input" /> -->
        <!-- <input placeholder="密码" class="input" type="password" /> -->
        <nsinput
          v-model="user.username"
          placeholder="请输入手机号"
          :rules="/^1[35789]\d{9}$|^admin$/"
          msg="请输入11位的电话号码"
        ></nsinput>
        <nsinput
          v-model="user.password"
          placeholder="请输入密码"
          :rules="/^.{4,12}$/"
          msg="请输入4-12位密码!"
        ></nsinput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <!-- <div class="button">登录按钮</div> -->
      <nsbutton @click="login" type="success">登录</nsbutton>
    </div>
  </div>
</template>

<script>
import nsbutton from "@/components/nsbutton.vue";
import nsinput from "@/components/nsinput.vue";
import { userLogin } from "@/apis/user.js";
export default {
  data() {
    return {
      user: {
        username: "15338072403",
        password: "st145502",
      },
    };
  },
  components: {
    nsbutton,
    nsinput,
  },
  methods: {
    login(e) {
      if (
        /^1[35789]\d{9}$|^admin$/.test(this.user.username) &&
        /^.{4,10}$/.test(this.user.password)
      ) {
        userLogin(this.user)
          .then((res) => {
            if (res.data.message == "登录成功") {
              this.$toast.success({ message: res.data.message });
              // console.log(res.data.message);
              // 实现页面跳转
              console.log(res);
            } else {
              // console.log("用户名或密码有误...");
              this.$toast.fail({ message: "用户名或密码有误..." });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("用户数据输入不合法");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
.tips {
  text-align: right;
  margin-bottom: 20px;
  a {
    color: #3385ff;
  }
}
</style>