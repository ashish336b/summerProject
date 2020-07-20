<template>
  <header>
    <nav class="navbar is-dark py-2" role="navigation" aria-label="main navigation">
      <div class="container custom-container">
        <div class="navbar-brand">
          <a class="navbar-item custom-navbar-item">
            <label for="sidebar" class="my-burger">
              <!-- sidebar input filed is in sidebar.vue file -->
              <!-- when this label is clicked input is checked and sidebar hides -->
              <span class="iconify" data-icon="bi:toggles2" data-inline="false"></span>
            </label>
          </a>
          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" class="has-text-white"></span>
            <span aria-hidden="true" class="has-text-white"></span>
            <span aria-hidden="true" class="has-text-white"></span>
          </a>
        </div>
        <div class="navbar-menu navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link has-text-white mr-1">Hari Bhandari</a>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                <div @click="logout()">
                  <span class="iconify" data-icon="carbon:logout" data-inline="false"></span>
                  <span class="px-2 has-text-weight-bold">Logout</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    logout: async function() {
      await this.$auth.logout();
      this.$router.push("/admin/login");
    }
  }
};
</script>

<style>
</style>