// import {getMenuRole} from "../../api/user";
import { userState } from './user'
const state = {
  routes: [], // biến lưu danh sách menu router hiển thị, được truy cập
  access: false, //bien luu quyen truy cap cuar router,
  routerNames: [],
  loading: false
};
const mutations = {
  SET_ROUTES: (state, data) => {
    state.routes = data;
  },
  SET_ACCESS: (state, status) => {
    state.access = status;
  },
  setLoading: (state, status) => {
    state.loading = status
  }
};

const actions = {
  setRouters({ commit }, data) {
    commit("SET_ROUTES", data);
  },
  setMenus({ commit }, data) {
    let mainRouter = data.find(el => el.children);
    mainRouter = mainRouter.children;
    mainRouter = mainRouter.map(el => {
      if (el.children && el.children.length) {
        el.children = el.children.map(it => ({
          ...it,
          path: `/${el.path}/${it.path}`
        }))

      }
      return el
    })
    commit("SET_ROUTES", mainRouter);

  },
  checkRoleUser({ commit }, name) {
    //Kiem tra quyen truy cap router theo name
    const roleCode = userState.me ? userState.me.role.code : null;
    let data = state.routes;
    let parent = []
    data.forEach(el => {
      if (!el.role || el.role.includes(roleCode)) {
        parent.push(el.name)
      }
    })

    let children = [];
    data.forEach(el => {
      if (el.children) {
        el.children.forEach(it => {
          if (!it.role || it.role.includes(roleCode)) {
            children.push(it.name)
          }
        }
        );
      }
    });
    let newData = [...parent, ...children]; //Mảng chứa toàn bộ name của rouuter
    if (newData.includes(name) || name == "Error") {
      commit("SET_ACCESS", true);
    } else {
      commit("SET_ACCESS", false);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
