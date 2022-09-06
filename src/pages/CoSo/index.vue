<template>
  <v-container fluid>
    <v-list-item three-line>
      <v-layout>
        <v-img max-height="100" max-width="100" :size="40" :src="coSoPic" class="mr-4"></v-img>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            CƠ SỞ</v-list-item-title>
          <v-list-item-subtitle>Danh sách cơ sở spa</v-list-item-subtitle>
        </v-list-item-content>

        <div class="pt-3">
          <v-btn color="indigo" @click="createStore">
            <v-icon color="white">mdi-plus</v-icon>
            <span style="color: white" class="btn-add">Thêm Cơ Sở</span>
          </v-btn>
        </div>
      </v-layout>
    </v-list-item>
    <v-progress-linear height="2" color="indigo" rounded value="100"></v-progress-linear>
    <br />
    <v-card-title>
      <v-spacer></v-spacer>
      <div style="width: 800px" class="mr-2">
        <v-row>
          <v-col cols="4">
            <v-select v-model="trang_thai" item-text="name" item-value="value" :items="trangThai"
              placeholder="Trạng thái" hide-details clearable @change="searchData" prepend-inner-icon="mdi-tag">
            </v-select>
          </v-col>
          <v-col cols="4">
            <v-autocomplete item-text="name" item-value="id" :items="phongBans"
              placeholder="Cơ sở" hide-details clearable :filter="fullTextFilter" @change="searchData"
              prepend-inner-icon="mdi-city"></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="search" label="Tìm kiếm" clearable single-line hide-details
              prepend-inner-icon="mdi-magnify"></v-text-field>
          </v-col>
        </v-row>
      </div>
    </v-card-title>
    <v-data-table :headers="headers" :items="tableData" :page.sync="page" :items-per-page="itemsPerPage"
      hide-default-footer :loading="loading" class="elevation-1 table-nhanvien" loading-text="Đang tải dữ liệu ...">
      <template v-slot:[`item.active`]="{ item }">
        <v-chip v-if="item.active" color="pink" dark small>
          Không hoạt động
        </v-chip>
        <v-chip v-else color="success" dark small> Đang hoạt động </v-chip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="textColor">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="editStore(item)">
              <v-list-item-title>
                <v-icon>mdi-pencil</v-icon> Cập nhật
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="deactiveStore(item)">
              <v-list-item-title>
                <div v-if="!item.active">
                  <v-icon class="mr-2"> mdi-close </v-icon>
                  Xóa
                </div>
                <div v-else>
                  <v-icon class="mr-2"> mdi-check </v-icon>
                  Phục hồi
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <div class="pt-2">
      <v-pagination v-model="page" :length="pageCount" @input="changePage" :total-visible="10">></v-pagination>
    </div>
    <create-edit ref="cosoForm" @on-done="getData"></create-edit>
  </v-container>
</template>
<script>
import { debounce } from "lodash";
import { fullTextFilter } from "../../utils/stringHelper";
import coSoPic from "@/assets/images/coSo.svg";
import CreateEdit from "./create-edit";

export default {
  components: { CreateEdit },
  data() {
    return {
      fullTextFilter,
      coSoPic,
      phongBans: [],
      nhomTos: [],
      chucVus: [],
      trang_thai: null,
      trangThai: [
        { name: "Đang hoạt động", value: false },
        { name: "Đã nghỉ việc", value: true },
      ],
      loai_nhom: null,
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
      options: {},
      totalDesserts: 0,
      tableData: [],
      btnLoading: false,
      loading: false,
      search: "",
      imageEndpoint: process.env.VUE_APP_BASE,
      headers: [
        { text: "Tên cơ sở", value: "name", sortable: true },
        {
          text: "Số điện thoại",
          align: "start",
          sortable: true,
          value: "soDienThoai",
        },
        {
          text: "Email",
          align: "start",
          sortable: false,
          value: "email",
        },
        {
          text: "Địa chỉ",
          align: "start",
          sortable: true,
          value: "address",
        },
        {
          text: "Trạng thái",
          align: "start",
          sortable: true,
          value: "active",
        },
        {
          text: "Chi tiết",
          value: "action",
          sortable: false,
          align: "center",
          width: "150",
        },
      ],
    };
  },
  mounted() {
    this.getData()
  },
  watch: {
    search: debounce(async function () {

    }, 300),
  },
  methods: {
    async getData() {
      this.tableData = [
        {
          name: 'Cơ sở Nguyễn Trãi',
          soDienThoai: '12121',
          email: 'AVX@email.com',
          address: 'So 1 nguyen trai',
          acitve: true,
        },
      ];
    },
    searchData() {
      this.page = 1;
      this.getData();
    },


    changePage(val) {
      this.page = val;
      this.getData();
    },
    editStore(data) {
      this.$refs.cosoForm.showFormEdit(data);
    },
    createStore() {
      this.$refs.cosoForm.showFormAdd();
    },
    async deactiveStore(data) {
      this.$confirmBox.show({
        title: data.da_nghi_viec
          ? "Xác nhận trở lại hoạt động"
          : "Xác nhận ngừng hoạt động",
        width: 480,
        body:
          "Cơ sở  " +
          "<strong>" +
          data.name +
          "</strong>" +
          `${data.da_nghi_viec
            ? " Sẽ tiếp tục công việc và có thể sử dụng phần mềm"
            : " Sẽ không thể đăng nhập phần mềm"
          }`,
        action: () => { },
        onDone: this.getData,
      });
    },
  },
};
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  .btn-add {
    display: none;
  }
}
</style>
<style>
.nhan-vien .v-data-table td:hover {
  cursor: pointer;
}
</style>
