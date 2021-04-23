<template>
  <div class="nscell">
    <div class="left">
      {{ title }}
    </div>
    <div class="right">
      <span>{{ desc }}</span>
      <van-icon name="arrow" class="icon" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.nscell {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid #bbb;
  .right {
    color: #999;
    font-size: 13px;
    .icon {
      vertical-align: bottom;
    }
  }
}
</style>