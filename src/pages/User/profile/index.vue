<template>
  <v-container>
    <v-list-item>
      <v-layout>
        <v-img
          max-height="100"
          max-width="100"
          :size="40"
          :src="UserPic"
          class="mr-4"
        ></v-img>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            Thông tin cá nhân</v-list-item-title
          >
          <v-list-item-subtitle
            >Cập nhật thông tin tài khoản</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-layout>
    </v-list-item>
    <v-progress-linear
      height="2"
      color="indigo"
      rounded
      class="mt-1"
      value="100"
    ></v-progress-linear>
    <br />
    <v-row>
      <v-col sm="12" lg="4" md="4" xs="12">
        <v-card height="600">
          <v-img height="230px" :src="masterialPic">
            <v-card-text>
              <v-layout column class="align-center">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-avatar
                      size="200"
                      style="border: 4px solid white"
                      v-bind="attrs"
                      v-on="on"
                      @click="uploadAvatar"
                    >
                      <img
                        :src="
                          USER.url_image
                            ? imageEndpoint + USER.urlImage
                            : avatarNone
                        "
                        alt="ManhLe"
                      />
                      <v-btn
                        color="blue"
                        fab
                        x-small
                        style="position: absolute; top: 155px; right: 50px"
                      >
                        <v-icon color="white">mdi-pencil</v-icon>
                      </v-btn>
                    </v-avatar>
                  </template>
                  <span>Cập nhật ảnh đại diện</span>
                </v-tooltip>
              </v-layout>
              <input
                name="file"
                ref="upload-image"
                style="display: none"
                type="file"
                @change="handleUpload($event)"
              />
            </v-card-text>
          </v-img>
          <v-layout column class="align-center">
            <v-card-title>{{ USER.name }}</v-card-title>
            <v-card-subtitle>{{ USER.email }}</v-card-subtitle>
            <v-btn rounded color="primary" dark small @click="changePass()">
              <v-icon left small> mdi-key </v-icon>
              Đổi mật khẩu
            </v-btn>
          </v-layout>
          <v-card-title class="pt-0 pb-2 pl-8">Thông tin</v-card-title>
          <v-layout column class="pl-8 pb-6">
            <div class="mb-2">
              Ngày tạo: <strong>{{ formatDate(USER.createdAt) }}</strong>
            </div>
            <div class="mb-2">
              Quyền:
              {{
                USER && USER.role
                  ? USER.role.name
                  : ""
              }}
            </div>
            <span></span>
          </v-layout>
        </v-card>
      </v-col>
      <v-col lg="8" sm="12" md="8" xs="12">
        <v-card height="600">
          <v-toolbar color="indigo darken-3" dark flat>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Hồ sơ</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn> -->
            <template v-slot:extension>
              <v-tabs v-model="tab" align-with-title>
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab>Tài khoản</v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-form ref="form">
                <div
                  class="d-flex"
                  style="width: 100%; justify-content: center"
                >
                  <div column class="pt-6" style="width: 50%">
                    <div class="label-form">Tên người dùng</div>
                    <v-text-field
                      placeholder="Họ và tên người dùng"
                      :rules="nameRules"
                      outlined
                      dense
                      prepend-inner-icon="mdi-account"
                      v-model="form.name"
                    ></v-text-field>
                    <div class="label-form">Tên đăng nhập</div>
                    <v-text-field
                      placeholder="Tên đăng nhập"
                      :rules="userNameRules"
                      outlined
                      dense
                      prepend-inner-icon="mdi-account"
                      v-model="form.userName"
                    ></v-text-field>
                    <div class="label-form">E-Mail</div>
                    <v-text-field
                      placeholder="Địa chỉ email"
                      :rules="emailRules"
                      outlined
                      dense
                      prepend-inner-icon="mdi-mail"
                      v-model="form.email"
                    ></v-text-field>
                    <v-btn
                      class="mt-2 mb-2"
                      style="width: 100%"
                      color="indigo"
                      dark
                      @click="updateUser"
                    >
                      Cập nhật
                    </v-btn>
                  </div>
                </div>
              </v-form>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <!-- <v-card-text><Inbox /></v-card-text> -->
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <!-- <v-card-text><Nhom /></v-card-text> -->
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showFormChangePass" persistent width="500">
      <v-card>
        <v-card-title class="headline">Đổi mật khẩu</v-card-title>
        <br />
        <v-card-text>
          <v-form ref="form">
            <div class="label-form">Mật khẩu hiện tại</div>
            <v-text-field
              type="password"
              v-model="changePassWord.currentPass"
              :rules="rulePass.currentPass"
              placeholder="Nhập mật khẩu hiện tại"
              outlined
              dense
              prepend-inner-icon="mdi-account-key"
            ></v-text-field>
            <div class="label-form">Mật khẩu mới</div>
            <v-text-field
              type="password"
              v-model="changePassWord.newPassWord"
              :rules="rulePass.newPassWord"
              placeholder="Mật khẩu mới"
              outlined
              dense
              prepend-inner-icon="mdi-lock"
            ></v-text-field>
            <div class="label-form">Nhập lại mật khẩu mới</div>
            <v-text-field
              type="password"
              v-model="changePassWord.reNewPassWord"
              :rules="[reNewPassWord]"
              placeholder="Nhập lại mật khẩu mới"
              outlined
              dense
              prepend-inner-icon="mdi-lock"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showFormChangePass = false" class="mr-4"
            >Đóng</v-btn
          >
          <v-btn :loading="btnLoading" color="primary" @click="updatePass">
            <v-icon left>mdi-pencil</v-icon>
            Cập nhật
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import UserPic from "@/assets/images/users_manage.svg";
import { changePassword } from "@/api/user";
import avatarNone from "../../../../docs/img/avatar_none.png";
import masterialPic from "../../../../docs/img/masterial.png";
import { uploadAvatarProfile, updateMyUser } from "@/api/user";
export default {
  data: () => ({
    avatarNone,
    UserPic,
    masterialPic,
    tab: null,
    imageEndpoint: process.env.VUE_APP_BASE,
    showFormChangePass: false,
    changePassWord: {
      currentPass: null,
      newPassWord: null,
      reNewPassWord: null,
    },
    btnLoading: false,
    rulePass: {
      currentPass: [(v) => !!v || "Hãy nhập mật khẩu hiện tại"],
      newPassWord: [(v) => !!v || "Mật khẩu mới không thể bỏ trống"],
    },
    form: {
      userName: "",
      name: "",
      email: "",
      company_name: "",
    },
    nameRules: [
      (v) => !!v || "Tên người dùng không thể bổ trống",
      (v) => (v && v.length >= 2) || "Tên người dùng tối thiểu 2 ký tự",
    ],
    userNameRules: [
      (v) => !!v || "Tên đăng nhập không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Tên đăng nhập tối thiểu 3 ký tự",
    ],
    emailRules: [
      (v) => !!v || "E-Mail không thể bỏ trống",
      (v) => /.+@.+\..+/.test(v) || "E-Mail không đúng định dạng",
    ],
  }),
  computed: {
    USER() {
      return this.$store.state.User.me;
    },
    reNewPassWord() {
      if (!this.changePassWord.reNewPassWord)
        return () => "Mật khẩu hiện tại không thể bỏ trống";
      return () =>
        this.changePassWord.newPassWord === this.changePassWord.reNewPassWord ||
        "Mật khẩu 2 lần nhập không khớp";
    },
  },
  mounted() {
    this.form.name = this.USER.name;
    this.form.userName = this.USER.userName;
    this.form.email = this.USER.email;
    this.form.company_name = this.USER.company_name
  },
  methods: {
    formatDate(e) {
      try {
        let date = new Date(e);
        let ngay = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let thang =
          Number(date.getMonth() + 1) < 10
            ? "0" + Number(date.getMonth() + 1)
            : Number(date.getMonth() + 1);
        return ngay + "/" + thang + "/" + date.getFullYear();
      } catch (error) {
        return "";
      }
    },
    uploadAvatar() {
      this.$refs["upload-image"].click();
    },
    async handleUpload(e) {
      let files = e.target.files;
      let data = new FormData();
      data.append("file", files[0]);

      var filePath = files[0].name.split(".").pop(); //lấy định dạng file
      var dinhDangChoPhep = ["jpg", "jpeg", "png"]; //các tập tin cho phép
      const isLt2M = files[0].size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.form.fileList.pop();
        this.$toast.warning("ファイルのサイズは最大２０MBでアップロードしてください", {
          position: "top-center",
          timeout: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
        });
        return false;
      }
      if (!dinhDangChoPhep.find((el) => el == filePath.toLowerCase())) {
        this.loadingUpload = false;
        this.listLoading = false;
        this.iconUpload = "el-icon-bottom";
        this.$toast.warning("正しくファイルをアップロードしてください", {
          position: "top-center",
          timeout: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
        });
        return;
      }
      try {
        await uploadAvatarProfile(data);
        this.$store.dispatch("User/getMe");
      } catch (error) {
        console.log(error);
      }
      this.$refs["upload-image"].value = null;
    },
    changePass() {
      this.showFormChangePass = true;
      this.changePassWord = {
        currentPass: null,
        newPassWord: null,
        reNewPassWord: null,
      };
    },
    async updatePass() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        try {
          this.btnLoading = true;
          await changePassword(this.changePassWord);
          this.showFormChangePass = false;
          this.btnLoading = false;
          this.changePassWord = {
            currentPass: null,
            newPassWord: null,
            reNewPassWord: null,
          };
          this.$toast.info("Cập nhật mật khẩu thành công", {
            position: "top-center",
            timeout: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
          });
          window.location.reload();
        } catch (error) {
          this.btnLoading = false;
        }
      }
    },
    async updateUser() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await updateMyUser(this.form);
          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("Cập nhật thành công", {
            position: "top-center",
            timeout: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
          });
        } catch (error) {
          this.btnLoading = false;
          this.show = false;
        }
      }
    },
  },
  created() {},
};
</script>
<style scoped>
.label-form {
  font-size: 18px;
}
</style>
