<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @click="isFocus = !isFocus" />
      <span class="comment">
        <i
          class="iconfont iconpinglun-"
          @click="$router.push({ path: `/comment/${post.id}` })"
        ></i>
        <em>{{ post.comment_length }}</em>
      </span>
      <i
        class="iconfont iconshoucang"
        :class="{ active: post.has_star }"
        @click="putStar"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" v-model="content"></textarea>
      <div>
        <span @click="sendComment">发 送</span>
        <span @click="cancelComment">取 消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { postStar, publishComment } from "@/apis/post.js";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    commentObj: {
      type: Object,
    },
  },
  data() {
    return {
      content: "",
      isFocus: false,
    };
  },
  watch: {
    commentObj() {
      if (this.commentObj) {
        this.isFocus = true;
      }
    },
  },
  methods: {
    // 收藏
    async putStar() {
      let res = await postStar(this.post.id);
      if (res.data.message == "收藏成功") {
        this.post.has_star = true;
      } else {
        this.post.has_star = false;
      }
      this.$toast.success(res.data.message);
    },
    async sendComment() {
      if (this.content.length == 0) {
        this.$toast.fail("请输入内容");
        return;
      }
      let data = {
        content: this.content,
      };
      if (this.commentObj) {
        data.parent_id = this.commentObj.id;
      }
      let res = await publishComment(this.post.id, data);
      console.log(res);
      console.log(data);
      // 提示
      this.$toast.success("评论发表成功");
      // 关闭评论
      this.isFocus = false;
      // 清空输入框
      this.content = "";
      this.$emit("refresh");
    },
    cancelComment() {
      this.isFocus = !this.isFocus;
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .active {
    color: red;
  }
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  background-color: #fff;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>