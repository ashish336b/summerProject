import Vue from "vue";
import sidebar from "../components/admin/sidebar";
import userSidebar from "../components/user/sidebar";

const components = { sidebar, userSidebar };
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component);
});
