<template>
  <div class="nsindex">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" />
      </div>
    </div>

    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <!-- 新闻内容 -->
        <nssingle
          v-for="item in cate.postlist"
          :key="item.id"
          :post="item"
        ></nssingle>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from "@/apis/category.js";
import { getPostList } from "@/apis/post.js";

import nssingle from "@/components/nssingle";
export default {
  data() {
    return {
      active: localStorage.getItem("mytoken") ? 1 : 0,
      cateList: [],
      // postList: [],
    };
  },
  async mounted() {
    let res = await getCateList();
    this.cateList = res.data.data;
    // console.log(this.cateList);
    // let id = this.cateList[this.active].id;
    // let res1 = await getPostList(id);
    // this.postList = res1.data.data;
    // console.log(this.postList);
    this.cateList = this.cateList.map((v) => {
      return { ...v, postlist: [] };
    });
    console.log(this.cateList);
    this.gePost();
  },
  watch: {
    async active() {
      // let id = this.cateList[this.active].id;
      // let res = await getPostList(id);
      // this.postList = res.data.data;
      if (this.cateList[this.active].postlist.length == 0) {
        this.gePost();
      }
    },
  },
  components: {
    nssingle,
  },
  methods: {
    async gePost() {
      let id = this.cateList[this.active].id;
      // let res = await getPostList(id);
      // this.postList = res.data.data;

      this.cateList[this.active].postlist = (await getPostList(id)).data.data;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: #f00;
  .logo {
    color: #fff;
    .iconnew {
      font-size: 50px;
    }
  }
  .search {
    flex: 1;
    height: 40px;
    margin-top: 5px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: 0 10px;
  }
  .user {
    color: #fff;
    font-size: 20px;
  }
}
</style>