<template>
  <div class="list">
    <nsheader title="精彩评论页">
      <template #left>
        <div class="icon1">
          <van-icon name="arrow-left" @click="$router.back()" />
        </div>
      </template>
    </nsheader>
    <div class="item" v-for="item in commentList" :key="item.id">
      <div class="head">
        <img :src="axios.defaults.baseURL + item.user.head_img" alt />
        <div>
          <p>{{ item.user.nickname }}</p>
          <span>时间</span>
        </div>
        <span @click="replayComment(item)">回复</span>
      </div>
      <nsCommentItem :parent="item.parent" v-if="item.parent"></nsCommentItem>
      <div class="text">{{ item.content }}</div>
    </div>
    <!-- 品论 -->
    <nscomment
      :post="article"
      @refresh="refresh"
      :commentObj="temp"
      @cancel="temp = null"
    ></nscomment>
  </div>
</template>

<script>
import nsheader from "@/components/nsheader";
import nscomment from "@/components/nscomment";
import nsCommentItem from "@/components/nsCommentItem";
import { getCommentList, getPostDetail } from "@/apis/post.js";
import axios from "@/utils/request.js";

export default {
  data() {
    return {
      commentList: [],
      axios,
      article: {},
      temp: {},
    };
  },
  components: {
    nsheader,
    nsCommentItem,
    nscomment,
  },
  mounted() {
    // let id = this.$route.params.id;
    // this.article = (await getPostDetail(id)).data.data;

    // let res = await getCommentList(id);
    // this.commentList = res.data.data;
    // console.log(res);
    this.init();
  },
  methods: {
    async init() {
      let id = this.$route.params.id;
      this.article = (await getPostDetail(id)).data.data;

      let res = await getCommentList(id);
      this.commentList = res.data.data;
      console.log(res);
    },
    refresh() {
      this.init();
      window.scrollTo(0, 0);
    },
    replayComment(v) {
      this.temp = v;
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  padding: 10px 10px;
  border-bottom: 1px solid #ccc;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      display: block;
      border-radius: 50%;
    }
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      > span {
        font-size: 12px;
        color: #999;
        line-height: 25px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 14px;
    color: #333;
    padding: 20px 0 10px 0;
  }
}
</style>