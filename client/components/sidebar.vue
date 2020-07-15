<template>
  <div>
    <div class="main-body">
      <sideNav />
      <div class="main" id="main">
        <topNav />
        <div class="main-content">
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