<template>
  <div class="personal">
    <router-link :to="{ path: `/edit_profile/${this.$route.params.id}` }">
      <div class="profile">
        <img :src="userinfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont"
              :class="userinfo.gender == 1 ? 'iconxingbienan' : 'iconxingbienv'"
            ></span
            >{{ userinfo.nickname }}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <!-- 单元格 -->
    <nscell
      desc="关注的用户"
      title="我的关注"
      @click.native="$router.push({ name: 'myfollow' })"
    ></nscell>
    <nscell desc="我的跟帖" title="跟帖/回复"></nscell>
    <nscell
      desc="我的收藏"
      title="文章/视频"
      @click.native="$router.push({ name: 'mystar' })"
    ></nscell>
    <nscell title="设置"></nscell>
    <!-- 按钮 -->
    <nsbutton type="danger" style="margin-top: 20px" @click="exit"
      >退出</nsbutton
    >
  </div>
</template>

<script>
import nscell from "@/components/nscell";
import nsbutton from "@/components/nsbutton";
import { UserDetail } from "@/apis/user.js";
import axios from "../../utils/request.js";
export default {
  data() {
    return {
      userinfo: {},
    };
  },
  components: {
    nscell,
    nsbutton,
  },
  methods: {
    exit() {
      this.$dialog
        .confirm({
          title: "是否退出登录",
        })
        .then(() => {
          localStorage.removeItem("mytoken");
          this.$router.push({ name: "login" });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  mounted() {
    UserDetail(this.$route.params.id)
      .then((res) => {
        // console.log(res);
        if (res.data.message == "获取成功") {
          this.userinfo = res.data.data;
          // console.log(this.userinfo);
          this.userinfo.head_img =
            axios.defaults.baseURL + this.userinfo.head_img;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 10px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px red solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>