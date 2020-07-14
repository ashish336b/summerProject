<template>
  <div>
    <div class="main-body">
      <sideNav />
      <div class="main" id="main">
        <topNav />
        <div class="main-content">
          <h1>About Page</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from "../components/topNavbar";
import sideNav from "../components/sideNav";
export default {
  components: {
    topNav,
    sideNav
  }
};
</script>

<style>
</style>