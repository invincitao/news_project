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
        <van-icon
          name="manager-o"
          @click="$router.push({ path: `/personal/${id}` })"
        />
      </div>
    </div>

    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <!-- 新闻内容 -->
        <van-list
          v-model="cate.loading"
          :finished="cate.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
            <nssingle
              v-for="item in cate.postlist"
              :key="item.id"
              :post="item"
            ></nssingle>
          </van-pull-refresh>
        </van-list>
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
      id: 2228,
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
      return {
        ...v,
        postlist: [],
        loading: false,
        finished: false,
        isLoading: false,
        pageSize: 10,
        pageIndex: 1,
      };
    });
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
      // let id = this.cateList[this.active].id;
      // let res = await getPostList(id);
      // this.postList = res.data.data;
      // 需要将打散好的数据添加到原数组中
      // 用一个变量保存出来的原数组
      let current = (
        await getPostList({
          category: this.cateList[this.active].id,
          pageSize: this.cateList[this.active].pageSize,
          pageIndex: this.cateList[this.active].pageIndex,
        })
      ).data.data;

      this.cateList[this.active].postlist.push(...current);
      this.cateList[this.active].loading = false;
      this.cateList[this.active].isLoading = false;
      // 当没有数据了就会提示用户没有更多了
      if (current.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true;
      }
    },
    // 下拉加载数据
    onLoad() {
      this.cateList[this.active].pageIndex++;

      this.gePost();
    },
    //上拉刷新
    onRefresh() {
      console.log("刷新了");
      this.cateList[this.active].pageIndex = 1;
      this.cateList[this.active].postlist.length = 0;
      this.cateList[this.active].finished = false;
      this.gePost();
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