<template>
  <v-app id="container" class="c_login logincontainer">
    <!-- FORM SECTION -->
    <div class="row">
      <!-- SIGN UP -->
      <div class="col align-items-center flex-col sign-up">
        <div class="form-wrapper align-items-center">
          <div class="form sign-up">
            <div class="input-group">
              <i class="bx bxs-user"></i>
              <input type="text" placeholder="Email hoặc tên đăng nhập" />
            </div>
            <div class="input-group">
              <i class="bx bx-mail-send"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div class="input-group">
              <i class="bx bxs-lock-alt"></i>
              <input type="password" placeholder="Password" />
            </div>
            <div class="input-group">
              <i class="bx bxs-lock-alt"></i>
              <input type="password" placeholder="Confirm password" />
            </div>
            <button>登録</button>
            <p>
              <span style="margin-right: 5px">Bạn đã có tài khoản ?</span>
              <b @click="sign" class="pointer">ログイン</b>
            </p>
          </div>
        </div>
        <div class="form-wrapper">
          <div class="social-list align-items-center sign-up">
            <div class="align-items-center facebook-bg">
              <i class="bx bxl-facebook"></i>
            </div>
            <div class="align-items-center google-bg">
              <i class="bx bxl-google"></i>
            </div>
            <div class="align-items-center twitter-bg">
              <i class="bx bxl-twitter"></i>
            </div>
            <div class="align-items-center insta-bg">
              <i class="bx bxl-instagram-alt"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- END SIGN UP -->
      <!-- SIGN IN -->
      <div class="col align-items-center flex-col sign-in">
        <div class="form-wrapper align-items-center">
          <div class="form sign-in">
            <div class="input-group">
              Đăng nhập
              <v-progress-linear
                v-if="loading"
                indeterminate
                color="green"
              ></v-progress-linear>
            </div>
            <div>
              <div class="input-group">
                <i class="bx bxs-user"></i>
                <input
                  v-model="formLogin.email_username"
                  type="text"
                  placeholder="Email hoặc tên đăng nhập"
                />
              </div>
              <div class="input-group">
                <i class="bx bxs-lock-alt"></i>
                <input
                  v-model="formLogin.password"
                  type="password"
                  placeholder="Mật khẩu"
                />
              </div>
            </div>
            <!-- <button @click="login">Đăng nhập</button> -->


            <v-btn
              @click="login"
              color="teal"
              style="font-size: 14px"
              :disabled="loading"
            >
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
              ></v-progress-circular>
              <span v-else>Đăng nhập</span>
            </v-btn>
          </div>
        </div>
      </div>
      <!-- END SIGN IN -->
    </div>
    <!-- END FORM SECTION -->

    <!-- CONTENT SECTION -->
    <div class="row content-row">
      <!-- SIGN IN CONTENT -->
      <div class="col align-items-center flex-col">
        <div class="text sign-in">
          <h2>TENTECH</h2>
          <p>Lead today, Pioneer tomorrow...</p>
        </div>
        <div class="img sign-in">
          <img src="./assets/undraw_Data_re_80ws.svg" alt="welcome" />
        </div>
      </div>
      <!-- END SIGN IN CONTENT -->
      <!-- SIGN UP CONTENT -->
      <div class="col align-items-center flex-col">
        <div class="img sign-up">
          <img src="./assets/undraw_Data_re_80ws.svg" alt="welcome" />
        </div>
        <div class="text sign-up">
          <h2>Join with us</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
            obcaecati, accusantium molestias, laborum, aspernatur deserunt
            officia voluptatum tempora dicta quo ab ullam. Assumenda enim harum
            minima possimus dignissimos deserunt rem.
          </p>
        </div>
      </div>
      <!-- END SIGN UP CONTENT -->
    </div>
    <!-- END CONTENT SECTION -->
  </v-app>
</template>

<script>
import store from "../../store/index";
export default {
  name: "Login",
  data() {
    return {
      verify: false,
      loading: false,
      code: null,
      formLogin: {
        email_username: null,
        password: null,
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      createFullName: "John Smith",
      createEmail: "john@flatlogic.com",
      createPassword: "123456",
      passRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Min 6 characters",
      ],
    };
  },
  methods: {
    sign() {
      let container = document.getElementById("container");
      container.classList.toggle("sign-in");
      container.classList.toggle("sign-up");
    },
    async login() {
      try {
        this.loading = true;
        await store.dispatch("User/login", this.formLogin);
        this.$router.push("/dashboard");
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
  },
  created() {
    setTimeout(() => {
      let container = document.getElementById("container");
      container.classList.add("sign-in");
    }, 200);
  },
};
</script>
<style lang="css" scoped>
@import "./style.css";
@import "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css";
</style>
