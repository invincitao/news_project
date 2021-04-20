<template>
  <div class="container">
    <div class="close"><span class="iconfont iconicon-test"></span></div>
    <div class="logo"><span class="iconfont iconnew"></span></div>
    <div class="inputs">
      <nsinput
        placeholder="请输入手机号"
        :rules="/^1[35789]\d{9}$/"
        msg="请输入11位的手机号"
        v-model="user.username"
      ></nsinput>
      <nsinput
        placeholder="用户名"
        :rules="/^.{2,8}$/"
        msg="请输入2-6的字符"
        v-model="user.nickname"
      ></nsinput>
      <nsinput
        placeholder="设置密码"
        :rules="/^.{4,10}$/"
        msg="密码最好为4-10位"
        v-model="user.password"
        type="password"
      ></nsinput>
    </div>
    <p class="tips">
      有账号？
      <a href="#/login" class="">去登录</a>
    </p>
    <div class="button" @click="register">注册</div>
  </div>
</template>

<script>
import nsbutton from "@/components/nsbutton.vue";
import nsinput from "@/components/nsinput.vue";
import { userRegister } from "../../apis/user";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: "",
      },
    };
  },
  methods: {
    register() {
      if (
        /^1[35789]\d{9}$/.test(this.user.username) &&
        /^.{2,8}$/.test(this.user.nickname) &&
        /^.{4,10}$/.test(this.user.password)
      ) {
        userRegister(this.user)
          .then((res) => {
            if (res.data.message == "注册成功") {
              this.$toast.success(res.data.message);
              this.$router.push({ name: "login" });
            } else {
              this.$toast.fail(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  components: {
    nsbutton,
    nsinput,
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