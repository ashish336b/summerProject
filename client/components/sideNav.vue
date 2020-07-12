<template>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-heading">
      <div class="has-text-primary has-text-centered">Admin Panel</div>
      <div class="divider mt-4"></div>
    </div>
    <aside class="menu">
      <ul class="menu-list">
        <li>
          <a class="active">
            <div class="list">
              <span class="iconify" data-icon="ic:twotone-dashboard" data-inline="false"></span>
              <span>Dashboard</span>
            </div>
          </a>
        </li>
      </ul>
      <div class="divider"></div>
      <p class="menu-label has-text-weight-bold">Action</p>
      <ul class="menu-list">
        <li>
          <a class="custom-list-container">
            <div class="list">
              <span class="iconify" data-icon="ic:twotone-dashboard" data-inline="false"></span>
              <span>Manage</span>
              <!-- <span class="iconify" data-icon="dashicons:arrow-down-alt2" data-inline="false"></span> -->
              <span class="iconify" data-icon="dashicons:arrow-right" data-inline="false"></span>
            </div>
          </a>
          <ul>
            <li>
              <a href="#">Member</a>
            </li>
            <li>
              <a href="#" class="dropdown-item">Member</a>
            </li>
            <li>
              <a href="#" class="dropdown-item">Member</a>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>