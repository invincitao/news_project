<template>
  <div class="nsheader">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nsheader {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 15px 15px;
  border-bottom: 1px solid #ccc;
  .left {
    font-size: 20px;
  }
  .center {
    flex: 1;
    text-align: center;
  }
  .right {
    font-size: 20px;
    color: red;
  }
}
</style>