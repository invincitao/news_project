<template>
  <input
    type="text"
    class="nsinput"
    @input="handlerInput"
    @blur="handlerBlur"
    :[key]="{ success: flag, error: !flag }"
  />
</template>

<script>
export default {
  data() {
    return {
      flag: "",
      key: "",
    };
  },
  props: {
    rules: {
      type: RegExp,
    },
    msg: {
      type: String,
      default: "输入有误！",
    },
  },
  methods: {
    handlerInput(e) {
      let value = e.target.value;
      this.$emit("input", value);
      // console.log(value);
      this.key = "class";
      if (this.rules && this.rules.test(value)) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    handlerBlur(e) {
      let value = e.target.value;
      if (this.rules && !this.rules.test(value)) {
        this.$toast.fail(this.msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.nsinput {
  width: 314 / 360vw * 100;
  height: 60px;
  outline: none;
  border: none;
  border-bottom: 3px solid #ccc;
  color: rgb(156, 150, 150);
  line-height: 60px;
  font-size: 20px;
}
.success {
  border-bottom: 3px solid green;
}
.error {
  border-bottom: 3px solid red;
}
</style>