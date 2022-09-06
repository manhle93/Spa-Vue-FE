import Layout from "@/components/Layout/Layout";

// Pages
import Dashboard from "@/pages/Dashboard/Dashboard";
import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";
import Blank from "@/components/Blank/Layout";

export const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "*",
    name: "Error",
    component: Error,
  },

  ///////////////////////
  {
    path: "/",
    redirect: "/dashboard",
    name: "Layout",
    component: Layout,
    children: [
      //Dashboard Router write here
      {
        path: "dashboard",
        name: "Tổng quan",
        component: Dashboard,
        icon: 'mdi-grid-large',
      },
      {
        path: "users",
        name: "Người dùng",
        icon: 'mdi-account',
        component: Blank,
        children: [
          // {
          //   path: "menus",
          //   component: () => import("@/pages/User/menus/index"),
          //   name: "Menu",
          // },
          // {
          //   path: "role",
          //   component: () => import("@/pages/User/roles/index"),
          //   name: "Role",
          // },
          {
            path: "profile",
            component: () => import("@/pages/User/profile/index"),
            name: "Tài khoản",
            icon: "mdi-information"
          },
          {
            path: "management",
            component: () => import("@/pages/User/management/index"),
            name: "Quản lý người dùng",
            icon: "mdi-account-multiple",
            role: ['admin'],
          },
        ],
      },
      {
        path: "coso",
        name: "Quản lý cơ sở",
        icon: 'mdi-home-modern',
        component: () => import("@/pages/CoSo/index")     
      },
      {
        path: "nhansu",
        name: "Quản lý nhân sự",
        icon: 'mdi-account-multiple',
        component: Blank,
        children: [
          {
            path: "chucoso",
            component: () => import("@/pages/Nhansu/ChuCoSo/index"),
            name: "Chủ cơ sở",
            icon: "mdi-account-star",
            role: ['admin'],
          },
          {
            path: "themchucoso",
            component: () => import("@/pages/Nhansu/ChuCoSo/create"),
            name: "Thêm chủ cơ sở",
            hidden: true,
            role: ['admin'],
          },
          {
            path: "kythuatvien",
            component: () => import("@/pages/Nhansu/KyThuatVien/index"),
            name: "Kỹ thuật viên",
            icon: "mdi-human-male-female",
          },
          {
            path: "themkythuatvien",
            component: () => import("@/pages/Nhansu/KyThuatVien/create"),
            name: "Thêm chủ cơ sở",
            hidden: true,
            role: ['admin'],
          },
        ],
      },
      {
        path: "khachhang",
        name: "Khách hàng",
        icon: 'mdi-clipboard-account',
        component: Blank,     
      },
      {
        path: "danhmucsanpham",
        name: "Sản phẩm - Dịch vụ",
        icon: 'mdi-leaf',
        component: Blank,     
      },
      {
        path: "quanlydonhang",
        name: "Quản lý đơn hàng",
        icon: 'mdi-format-list-bulleted',
        component: Blank,     
      },
      {
        path: "voucher",
        name: "Voucher - Giảm giá",
        icon: 'mdi-qrcode',
        component: Blank,     
      },
      {
        path: "feedbacks",
        name: "Phản hồi - Khiếu nại",
        icon: 'mdi-message',
        component: Blank,     
      },
    ],
  },
];
