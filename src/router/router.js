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
        name: "Dashboard",
        component: Dashboard,
        icon: 'mdi-grid-large',
      },
      {
        path: "users",
        name: "Users",
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
            name: "Profile",
            icon: "mdi-information"
          },
          {
            path: "management",
            component: () => import("@/pages/User/management/index"),
            name: "Management",
            icon: "mdi-account-multiple",
            role: ['admin']
          },
        ],
      },
    ],
  },
];
