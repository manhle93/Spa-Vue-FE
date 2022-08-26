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
          <!-- <v-btn color="#33691E" class="mr-4" @click="exportExcel">
              <v-avatar size="30" class="mr-2">
                <img :src="excelPic" />
              </v-avatar>
              <span style="color: white" class="btn-add">Xuất Excel</span>
            </v-btn> -->
          <router-link to="/nhansu/themchucoso">
            <v-btn color="indigo">
              <v-icon color="white">mdi-plus</v-icon>
              <span style="color: white" class="btn-add">Thêm Cơ Sở</span>
            </v-btn>
          </router-link>
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
            <v-autocomplete v-model="phong_ban_id" item-text="name" item-value="id" :items="phongBans"
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
      hide-default-footer :loading="loading" class="elevation-1 table-nhanvien" loading-text="Đang tải dữ liệu ..."
      @click:row="clickRow">
      <template v-slot:[`item.name`]="{ item }">
        <router-link :to="'/nhansu/thongtinnhanvien/' + item.id" style="text-decoration: none; color: black">
          <v-layout align-center>
            <v-avatar color="indigo" size="36">
              <img v-if="item.url_image" :src="imageEndpoint + item.url_image" alt="ManhLe" />
              <span style="color: white" v-else-if="item && item.name">{{
                  item.name.charAt(0).toUpperCase()
              }}</span>
              <v-icon v-else dark>mdi-account</v-icon>
            </v-avatar>
            <div>
              <span class="ml-2" style="font-size: 16px">{{ item.name }}</span>
              <div class="ml-2" style="color: gray">Mã NV: {{ item.ma_nhan_vien }}</div>
            </div>
          </v-layout>

        </router-link>
      </template>
      <template v-slot:[`item.gioi_tinh`]="{ item }">
        {{ item.gioi_tinh ? "Nam" : "Nữ" }}
      </template>
      <template v-slot:[`item.da_nghi_viec`]="{ item }">
        <v-chip v-if="item.da_nghi_viec" color="pink" dark small>
          Đã nghỉ việc
        </v-chip>
        <v-chip v-else color="success" dark small> Đang hoạt động </v-chip>
        <v-tooltip bottom v-if="item.hop_dong_het_han">
          <template v-slot:activator="{ on }">
            <v-icon class="ml-1 pointer" color="red" v-on="on">
              mdi-alert-decagram
            </v-icon>
          </template>
          <span>Sắp hết hạn hợp đồng thử việc</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="textColor">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="xemChiTiet(item)">
              <v-list-item-title>
                <v-icon>mdi-pencil</v-icon> Xem chi tiết
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="nghiViec(item)">
              <v-list-item-title>
                <div v-if="!item.da_nghi_viec">
                  <v-icon class="mr-2"> mdi-close </v-icon>
                  Nghỉ việc
                </div>
                <div v-else>
                  <v-icon class="mr-2"> mdi-check </v-icon>
                  Trở lại làm việc
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
  </v-container>
</template>
<script>
import { debounce } from "lodash";
import { getNhanVien, nghiViec, exportNhanVien } from "@/api/nhanvien";
import excelPic from "@/assets/images/excel.png";
import { getPhongBan } from "@/api/phongban";
import { getNhomToTrucThuoc } from "@/api/nhomto";
import { getDanhMucCon } from "@/api/danhmuc";
import { saveAs } from "file-saver";
import { fullTextFilter } from "../../utils/stringHelper";
import coSoPic from "@/assets/images/coSo.svg";

export default {
  data() {
    return {
      fullTextFilter,
      coSoPic,
      excelPic,
      phongBans: [],
      nhomTos: [],
      phong_ban_id: null,
      nhom_to_id: null,
      chuc_vu_id: null,
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
      menu: {},
      loading: false,
      search: "",
      roleId: null,
      imageEndpoint: process.env.VUE_APP_BASE,
      roles: [],
      headers: [
        { text: "Tên cơ sở", value: "name", sortable: true },
        {
          text: "Số điện thoại",
          align: "start",
          sortable: true,
          value: "so_dien_thoai",
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
          value: "gioi_tinh",
        },
        {
          text: "Trạng thái",
          align: "start",
          sortable: true,
          value: "da_nghi_viec",
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
  created() {
    // this.getData();
    // this.getDanhMuc();
  },
  watch: {
    search: debounce(async function (val) {
      this.loading = true;
      this.page = 1;
      let data = await getNhanVien({
        perPage: this.itemsPerPage,
        search: val,
        role_id: this.roleId,
        trang_thai: this.trang_thai,
        nhom_to_id: this.nhom_to_id,
        phong_ban_id: this.phong_ban_id,
        chuc_vu_id: this.chuc_vu_id,
        loai_nhom: this.loai_nhom,
      });
      this.loading = false;
      this.tableData = data.data;
      this.pageCount = data.meta.last_page;
    }, 300),
  },
  methods: {
    clickRow(item) {
      this.$router.push("/nhansu/thongtinnhanvien/" + item.id);
    },
    async exportExcel() {
      const res = await exportNhanVien();
      saveAs(new Blob([res]), `Nhan_vien.xlsx`);
    },
    async getData() {
      this.loading = true;
      let data = await getNhanVien({
        page: this.page,
        perPage: this.itemsPerPage,
        search: this.search,
        trang_thai: this.trang_thai,
        nhom_to_id: this.nhom_to_id,
        phong_ban_id: this.phong_ban_id,
        chuc_vu_id: this.chuc_vu_id,
        loai_nhom: this.loai_nhom,
      });
      this.tableData = data.data;
      this.loading = false;
      this.pageCount = data.meta.last_page;
      this.getNhomTo();
    },
    searchData() {
      this.page = 1;
      this.getData();
    },
    async getDanhMuc() {
      let phongbans = await getPhongBan({
        perPage: 999,
      });
      this.chucVus = await getDanhMucCon({ code: "CHUCVU" });
      this.phongBans = phongbans.data;
    },
    async getNhomTo() {
      if (this.phong_ban_id) {
        let data = await getNhomToTrucThuoc({
          phong_ban_id: this.phong_ban_id,
        });
        this.nhomTos = data;
      } else this.nhomTos = [];
    },
    changePage(val) {
      this.page = val;
      this.getData();
    },
    editMenu(menu) {
      this.$refs.menuForm.showFormEdit(menu);
    },
    createMenu() {
      this.$refs.menuForm.showFormAdd();
    },
    xemChiTiet(item) {
      this.$router.push("/nhansu/thongtinnhanvien/" + item.id);
    },
    async nghiViec(data) {
      this.$confirmBox.show({
        title: data.da_nghi_viec
          ? "Xác nhận trở lại công việc"
          : "Xác nhận nghỉ việc",
        width: 480,
        body:
          "Nhân viên  " +
          "<strong>" +
          data.name +
          "</strong>" +
          `${data.da_nghi_viec
            ? " Sẽ tiếp tục công việc và có thể sử dụng phần mềm"
            : " Sẽ không thể đăng nhập phần mềm"
          }`,
        action: () => nghiViec({ nhan_vien_id: data.id }),
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
