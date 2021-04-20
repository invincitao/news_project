<template>
  <div
    class="btn"
    @click="handlerClick"
    :class="{
      success: type == 'success',
      danger: type == 'danger',
      primary: type == 'primary',
    }"
  >
    <span class="icon"></span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "#ccc",
    },
  },
  methods: {
    handlerClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  width: 318 * 100vw/360;
  height: 60px;
  background-color: rgb(134, 133, 133);
  border-radius: 25px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
}
.success {
  background-color: #469e0c;
  color: #fff;
}
.danger {
  background-color: red;
  color: #fff;
}
.primary {
  background-color: rgb(4, 0, 236);
  color: #fff;
}
</style>