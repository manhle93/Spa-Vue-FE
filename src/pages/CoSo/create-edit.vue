<template>
  <v-dialog v-model="show" persistent width="800">
    <v-card>
      <v-card-title class="headline">{{
          edit ? "Cập nhật cơ sở" : "Thêm mới cơ sở"
      }}</v-card-title>
      <br />
      <v-card-text>
        <v-form ref="form" lazy-validation>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="show = false" class="mr-4">Đóng</v-btn>
        <v-btn :loading="btnLoading" color="primary" @click="add" v-if="!edit">
          <v-icon left>mdi-plus</v-icon>
          Thêm mới
        </v-btn>
        <v-btn :loading="btnLoading" color="primary" @click="update" v-else>
          <v-icon left>mdi-pencil</v-icon>
          Cập nhật
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["roles"],
  data: () => ({
    show: false,
    edit: false,
    imageEndpoint: process.env.VUE_APP_BASE,
    btnLoading: false,
    form: {
    },

  }),
  computed: {
    USER() {
      return this.$store.state.User.me;
    },
  },
  methods: {
    showFormAdd() {
      this.show = true;
      this.edit = false;
      this.form = {

      };
    },
    async showFormEdit(data) {
      this.edit = true;
      this.show = true;
      this.form = { ...data };
    },
    async add() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {

          // await createStore(this.form);

          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("Tạo tài khoản thành công", {
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
          // this.show = false;
        }
      }
    },

    async update() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {

          // await updateStore(this.form);

          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("Cập nhật tài khoản thành công", {
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
          // this.show = false;
        }
      }
    },
  },
};
</script>
