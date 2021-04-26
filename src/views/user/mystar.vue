<template>
  <div class="mystar">
    <nsheader title="我的收藏">
      <template #left>
        <div class="icon1">
          <van-icon name="arrow-left" @click="$router.back()" />
        </div>
      </template>
    </nsheader>
    <!-- 收藏新闻列表 -->

    <van-swipe-cell v-for="item in starList" :key="item.id">
      <nssingle :post="item"></nssingle>
      <template #right>
        <van-button
          square
          text="取消收藏"
          type="danger"
          class="delete-button"
          style="height: 100%"
          @click="cancelStar(item.id)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import nsheader from "@/components/nsheader";
import nssingle from "@/components/nssingle";
import { getUserStar } from "@/apis/user.js";
import { postStar } from "@/apis/post.js";

export default {
  data() {
    return {
      starList: [],
    };
  },
  components: {
    nsheader,
    nssingle,
  },
  async mounted() {
    let res = await getUserStar();
    this.starList = res.data.data;
  },
  methods: {
    // 取消收藏
    async cancelStar(id) {
      let res = await postStar(id);
      this.starList = this.starList.filter((v) => {
        return v.id != id;
      });
      this.$toast.success(res.data.message);
      return this.starList;
    },
  },
};
</script>

<style lang="less" scoped>
</style>