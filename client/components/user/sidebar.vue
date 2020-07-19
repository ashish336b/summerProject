<template>
  <div>
    <div class="main-body">
      <input type="checkbox" id="sidebar" />
      <sideNav />
      <div class="main" id="main">
        <topNav />
        <div class="main-content px-1 py-1 mx-1 my-2">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from "./topNavbar";
import sideNav from "./sideNav";
export default {
  components: {
    topNav,
    sideNav
  }
};
</script>

<style>
</style>