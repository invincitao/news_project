<template>
  <div class="edit_profile">
    <!-- 顶部 -->
    <nsheader>
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
      <template #center>编辑资料</template>
      <template #right>
        <van-icon name="wap-home-o" @click="$router.push({ name: 'index' })" />
      </template>
    </nsheader>

    <!-- 上传图片的按钮 -->
    <div class="imgarea">
      <img :src="userinfo.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>

    <!-- 单元格 -->
    <nscell
      title="昵称"
      :desc="userinfo.nickname"
      @click.native="showNicknameDialog"
    ></nscell>
    <van-dialog
      v-model="nickshow"
      title="标题"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field v-model="nickname" required label="修改昵称" />
    </van-dialog>

    <!-- 密码 -->
    <nscell
      title="密码"
      desc="*********"
      @click.native="pwdshow = !pwdshow"
    ></nscell>
    <van-dialog
      v-model="pwdshow"
      title="修改密码"
      show-cancel-button
      @confirm="editPwd"
      :beforeClose="beforeClose"
    >
      <van-field
        required
        label="原密码"
        placeholder="请输入原密码"
        v-model="pwd"
      />
      <van-field
        required
        label="新密码"
        placeholder="请输入新密码"
        v-model="newPwd"
      />
    </van-dialog>
    <nscell
      title="性别"
      :desc="userinfo.gender == 1 ? '男' : '女'"
      @click.native="gendershow = !gendershow"
    ></nscell>
    <van-action-sheet
      v-model="gendershow"
      :actions="actions"
      @select="onSelect"
      :close-on-click-action="true"
    />
  </div>
</template>

<script>
import nsheader from "@/components/nsheader";
import nscell from "@/components/nscell";
import { UserDetail, updateUserInfo } from "@/apis/user.js";
import { uploadFile } from "@/apis/fileUpload.js";
import axios from "@/utils/request.js";
export default {
  data() {
    return {
      userinfo: {},
      nickshow: false,
      nickname: "",
      pwdshow: false,
      pwd: "",
      newPwd: "",
      gendershow: false,
      actions: [{ name: "男" }, { name: "女" }],
    };
  },
  components: {
    nsheader,
    nscell,
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      let fd = new FormData();
      fd.append("file", file.file);
      uploadFile(fd)
        .then((res) => {
          if (res.data.message == "文件上传成功") {
            this.userinfo.head_img = axios.defaults.baseURL + res.data.data.url;
            // console.log(res);
            // 😡2.更新数据
            updateUserInfo(this.$route.params.id, {
              head_img: res.data.data.url,
            })
              .then((res) => {
                if (res.data.message == "修改成功") {
                  this.$toast.success(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showNicknameDialog() {
      this.nickshow = !this.nickshow;
      this.nickname = this.userinfo.nickname;
    },
    editNickname() {
      updateUserInfo(this.$route.params.id, { nickname: this.nickname })
        .then((res) => {
          if (res.data.message == "修改成功") {
            this.userinfo.nickname = this.nickname;
            this.$toast.success(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 密码的修改
    editPwd() {
      // 要对输入的原密码做校验
      if (this.pwd == this.userinfo.password) {
        if (/^.{4,10}$/.test(this.newPwd)) {
          if (this.userinfo.password == this.newPwd) {
            this.$toast.fail("输入的密码与原密码相同");
          } else {
            updateUserInfo(this.$route.params.id, { password: this.newPwd })
              .then((res) => {
                if (res.data.message == "修改成功") {
                  this.userinfo.password = this.newPwd;
                  this.$toast("请重新登录");
                  this.$router.push({ name: "login" });
                  localStorage.removeItem("mytoken");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else {
          this.$toast.fail("请输入4-10位的新密码!");
        }
      } else {
        this.$toast.fail("与原密码不匹配!");
      }
    },
    // 编辑密码
    beforeClose(active, done) {
      if (active == "confirm") {
        if (
          this.pwd == this.userinfo.password ||
          !/^.{4-10}$/.test(this.newPwd) ||
          this.newPwd == this.userinfo.password
        ) {
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    },
    // 性别修改
    async onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      let gender = item.name == "男" ? 1 : 0;
      let res = await updateUserInfo(this.$route.params.id, gender);
      this.userinfo.gender = gender;
      this.$toast.success(res.data.message);
      console.log(res);
    },
    // getgender(a, b, c) {
    //   this.newGender = c;
    // },
    // updateGender() {
    //   updateUserInfo(this.$route.params.id, { gender: this.newGender })
    //     .then((res) => {
    //       if (res.data.message == "修改成功") {
    //         // console.log(result);
    //         this.$toast.success("修改成功");
    //         // 这里的重置为了页面的展示效果
    //         this.userinfo.gender = this.newGender;
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  mounted() {
    UserDetail(this.$route.params.id)
      .then((res) => {
        if (res.data.message == "获取成功") {
          this.userinfo = res.data.data;
          this.userinfo.head_img =
            axios.defaults.baseURL + this.userinfo.head_img;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style lang="less" scoped>
.imgarea {
  padding: 20px 0;
  display: flex;
  justify-content: center;
  position: relative;
  > img {
    border-radius: 60px;
    width: 120px;
    height: 120px;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  /deep/ .van-uploader__upload {
    width: 120px;
    height: 120px;
  }
}
</style>