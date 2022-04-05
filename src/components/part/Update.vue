<template>
  <!-- 修改资料 -->
  <div class="Update">
    <div class="title min_box">我的资料</div>
    <div class="content">
      <el-collapse v-model="activeName" accordion class="form_data min_box">
        <div class="user_title">基本资料</div>
        <el-collapse-item title="修改密码" name="1">
          <el-form
            ref="updateForm"
            :model="form"
            :rules="rule"
            label-width="100px"
          >
            <el-form-item label="账号">
              <el-input
                disabled
                v-model="form.name"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <div v-if="!editUpdatePasswordShow" @click="showPasswordInput">
              <el-form-item label="密码" class="password_text">
                <span class="hidden">**********</span>
                <el-button type="primary" size="mini" round>修改密码</el-button>
              </el-form-item>
            </div>
            <div v-if="editUpdatePasswordShow">
              <el-form-item label="旧密码" prop="oldPassword">
                <el-input type="password" v-model="form.oldPassword"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="confirmpassword">
                <el-input
                  type="password"
                  v-model="form.confirmpassword"
                ></el-input>
              </el-form-item>
              <el-button
                type="primary"
                size="mini"
                round
                @click="funtionUpdatePassword"
                >提交</el-button
              >
              <el-button size="mini" round @click="cancalPasswordShow"
                >取消</el-button
              >
            </div>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="修改资料" name="2">
          <el-form
            ref="updateUserinfoForm"
            :model="form"
            :rules="rule"
            label-width="100px"
          >
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="邮箱"
                type="mail"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select
                v-model="form.sex"
                placeholder="请选择性别"
                style="width: 100%"
              >
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生日">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date1"
                  style="width: 100%"
                  value-format="yyyy-mm-dd"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="form.date2"
                  value-format="HH:MM:ss"
                  format="HH:MM:ss"
                  style="width: 100%"
                ></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="更改">
              <el-button
                type="primary"
                size="mini"
                round
                @click="updateUserInfoOnSubmit"
                >提交</el-button
              >
              <el-button type="primary" size="mini" round @click="cancelSubmit"
                >取消</el-button
              >
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <!-- <el-divider></el-divider> -->
      <div class="user min_box">
        <el-upload
          tip="点击更换头像,大小限制5M"
          class="avatar-uploader min_box"
          action="http://127.0.0.1:8008/my/avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          :headers="headers"
        >
          <img fit="contain " v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="name">{{ user.account }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import dateFormat from "dateformat";
export default {
  name: "Update",
  data() {
    let checkPwd2 = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error("请确认密码不能为空"));
      } else if (value != this.form.password) {
        callback(new Error("2次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      editUpdatePasswordShow: false,
      form: {
        name: "",
        sex: "",
        date1: "",
        date2: "",
        email: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        confirmpassword: "",
        password: "",
        oldPassword: "",
      },
      imageUrl: "",
      headers: {},
      rule: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: "请输入正确的邮箱格式",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
        confirmpassword: [
          { validator: checkPwd2, trigger: "blur", required: true },
        ],
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
      },
      //手风琴索引
      activeName: "1",
    };
  },
  async mounted() {
    this.userinfo = this.user;
    this.hosts = this.host;
    this.imageUrl = this.host + this.user.avtar;
    this.headers = {
      Authorization: this.Authorization,
    };
    await this.loadData();
  },
  methods: {
    ...mapMutations(["updateUser"]),
    async loadData() {
      try {
        let _this = this;
        const userinfo = await _this.$axios.get(
          "http://127.0.0.1:8008/my/getUserInfoEdit"
        );
        if (userinfo.data.status === 1) {
          this.$message({
            showClose: true,
            message: userinfo.data.message,
            type: "error",
            offset: 100,
          });
        } else {
          this.form.name = userinfo.data.data.account;
          this.form.email = userinfo.data.data.email;
          this.form.sex = userinfo.data.data.sex;
          let date = userinfo.data.data.Birthday.split(" ");
          this.form.date1 = dateFormat(date[0], "yyyy-mm-dd");
          this.form.date2 = date[1].split(".")[0];
        }
      } catch (err) {
        console.log(err);
      }
    },
    funtionUpdatePassword() {
      let _this = this;
      this.$refs.updateForm.validate(async (valid) => {
        if (valid) {
          let param = new URLSearchParams();
          param.append("newPwd", this.form.password);
          param.append("oldPwd", this.form.oldPassword);
          try {
            const dateinfo = await _this.$axios.post(
              "http://127.0.0.1:8008/my/updatePassword",
              param
            );
            if (dateinfo.data.status === 1) {
              _this.$message({
                showClose: true,
                message: dateinfo.data.message,
                type: "error",
                offset: 100,
              });
              // alert(dateinfo.data.message);
            } else {
              _this.$message({
                showClose: true,
                message: "更新密码成功",
                type: "success",
                offset: 100,
              });
              // await this.loadData();
              this.$refs.updateForm.resetFields();
              _this.$router.push("/login");
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          // console.log("error submit!!");
          this.$message({
            showClose: true,
            message: "数据不合法",
            type: "error",
            offset: 100,
          });
          return false;
        }
      });
    },
    showPasswordInput() {
      this.editUpdatePasswordShow = true;
    },
    cancalPasswordShow() {
      this.editUpdatePasswordShow = false;
    },
    updateUserInfoOnSubmit() {
      // console.log("onSubmit 这是提交按钮");
      // if (this.form.password != this.form.confirmpassword) {
      //   alert("修改密码俩次输入密码不一样");
      // }
      let _this = this;
      this.$refs.updateUserinfoForm.validate(async (valid) => {
        if (valid) {
          let param = new URLSearchParams();
          param.append("email", this.form.email);
          param.append("sex", this.form.sex);
          param.append("Birthday", this.form.date1 + " " + this.form.date2);
          try {
            const dateinfo = await _this.$axios.post(
              "http://127.0.0.1:8008/my/updateUserInfo",
              param
            );
            if (dateinfo.data.status === 1) {
              _this.$message({
                showClose: true,
                message: dateinfo.data.message,
                type: "error",
                offset: 100,
              });
              // alert(dateinfo.data.message);
            } else {
              _this.$message({
                showClose: true,
                message: "更新信息成功",
                type: "success",
                offset: 100,
              });
              // await this.loadData();
              try {
                let _this = this;
                const userinfo = await _this.$axios.get(
                  "http://127.0.0.1:8008/my/userinfo"
                );
                if (userinfo.data.status === 1) {
                  this.$message({
                    showClose: true,
                    message: userinfo.data.message,
                    type: "error",
                    offset: 100,
                  });
                } else {
                  _this.updateUser(userinfo.data.data);
                }
              } catch (err) {
                console.log(err);
              }
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          // console.log("error submit!!");
          this.$message({
            showClose: true,
            message: "数据不合法",
            type: "error",
            offset: 100,
          });
          return false;
        }
      });
    },
    cancelSubmit() {
      console.log("cancelSubmit 这是取消按钮");
      this.$router.back();
    },
    async handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      try {
        let _this = this;
        const userinfo = await _this.$axios.get(
          "http://127.0.0.1:8008/my/userinfo"
        );
        if (userinfo.data.status === 1) {
          this.$message({
            showClose: true,
            message: userinfo.data.message,
            type: "error",
            offset: 100,
          });
        } else {
          _this.updateUser(userinfo.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    },
    handleAvatarError(err) {
      console.log(err);
      return this.$message.error(err);
    },
    beforeAvatarUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error({
          showClose: true,
          message: "上传头像图片大小不能超过 5MB!",
          type: "error",
          offset: 100,
        });
      }
      return isLt5M;
    },
  },
  computed: {
    ...mapState(["user", "host", "Authorization"]),
  },
};
</script>

<style lang="less">
.Update {
  // background-color: var(--theme_backgroun_colorcc);
  display: flex;
  width: 800px;
  margin: 10px auto;
  border-radius: 30px;
  padding-bottom: 10px;
  // flex-wrap: wrap;
  flex-direction: column;
  .title {
    flex: 1 1 auto;
    padding: 0px 30px;
    font-size: 14px;
    background-color: rgb(251, 251, 251);
    border-bottom: 1px solid rgb(226, 232, 236);
    height: 59px;
    line-height: 59px;
  }
  .content {
    display: flex;
    // align-items: center;
    .user_title {
      font-size: 16px;
      color: rgb(52, 52, 52);
      margin-bottom: 25px;
      font-weight: 600;
    }
    .form_data {
      // display: flex;
      flex: 1;
      padding-top: 40px;
      margin-right: 10px;
      text-align: center;
      margin-bottom: 118px;
      padding-bottom: 20px;
      .el-collapse-item {
        width: 430px;

        .el-form-item__label {
          width: 100px;
          color: rgb(136, 136, 136);
        }
        .password_text {
          text-align: left;
          .hidden {
            margin-right: 37px;
          }
        }
        .el-button {
          margin-top: -10px;
          margin-bottom: 5px;
          margin-right: 30px;
        }
      }
    }
    .user {
      margin: 0 auto;
      padding: 20px;
      height: 320px;
      .avatar-uploader {
        width: 200px;
        padding: 0;
        // display: flex;

        .el-upload {
          display: flex;
          // height: 200px;
          flex: 1;
          img {
            flex: 1;
          }
        }
      }
      .name {
        margin-top: 10px;
        font-size: 14px;
        font-weight: bolder;
        margin-left: 10px;
        margin-top: 20px;
      }
    }
  }
}
</style>