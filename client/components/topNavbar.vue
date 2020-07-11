<template>
  <header>
    <nav class="navbar is-dark py-2" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item c-title" href="index.html">
            <div class="has-text-white has-text-weight-bold is-size-4">Dashboard</div>
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
        <div id="navbarBasicExample" class="navbar-menu navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link has-text-white mr-1">Ashish Bhandari</a>
            <div class="navbar-dropdown custom-dropdown">
              <a class="navbar-item">
                <span class="iconify" data-icon="carbon:logout" data-inline="false"></span>
                <span class="px-2 has-text-weight-bold">Logout</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
</style>