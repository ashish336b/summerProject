import Vue from "vue";
import adminSidebar from "../components/admin/adminSidebar";
import userSidebar from "../components/user/sidebar";

const components = { adminSidebar, userSidebar };
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component);
});
