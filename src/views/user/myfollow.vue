<template>
  <div class="myfollow">
    <nsheader title="我的关注">
      <template #left>
        <div class="icon1">
          <van-icon name="arrow-left" @click="$router.back()" />
        </div>
      </template>
    </nsheader>
    <div class="list">
      <div class="box" v-for="item in followList" :key="item.id">
        <img :src="item.head_img" alt="" />
        <div class="center">
          <p>{{ item.nickname }}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="cancelFollow(item.id)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import nsheader from "@/components/nsheader";
import { getUserFollow, userunFollow } from "@/apis/user.js";
import axios from "@/utils/request.js";
export default {
  data() {
    return {
      followList: [],
    };
  },
  components: {
    nsheader,
  },
  async mounted() {
    let res = await getUserFollow();
    this.followList = res.data.data;
    this.followList = this.followList.map((v) => {
      v.head_img = axios.defaults.baseURL + v.head_img;
      return v;
    });
  },
  methods: {
    async cancelFollow(id) {
      let res = await userunFollow(id);
      this.followList = this.followList.filter((v) => {
        return v.id != id;
      });
      this.$toast.success(res.data.message);
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>