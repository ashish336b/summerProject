<template>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-heading">
      <nuxt-link to="/admin/dashboard">
        <div class="has-text-primary has-text-centered">User Section</div>
      </nuxt-link>
    </div>
    <div class="divider mt-4"></div>
    <aside class="menu">
      <ul class="menu-list">
        <li class="my-1">
          <nuxt-link to="/admin">
            <div class="list">
              <span class="iconify" data-icon="ic:twotone-dashboard" data-inline="false"></span>
              <p>Dashboard</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <div class="divider mb-4"></div>
      <p class="menu-label has-text-weight-bold">User Section</p>
      <ul class="menu-list">
        <li>
          <a class="custom-list-container">
            <div class="list">
              <span class="iconify" data-icon="ic:twotone-dashboard" data-inline="false"></span>
              <p for="second">
                <label for="second">Invoice part</label>
              </p>
              <!-- <span class="iconify" data-icon="dashicons:arrow-down-alt2" data-inline="false"></span> -->
              <span class="iconify" data-icon="dashicons:arrow-right" data-inline="false"></span>
            </div>
          </a>
          <input type="checkbox" id="second" />
          <ul class="hide">
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

      <p class="menu-label has-text-weight-bold">Ecommerce</p>
      <ul class="menu-list">
        <li>
          <nuxt-link to="#">
            <div class="list">
              <span class="iconify" data-icon="ri:medicine-bottle-line" data-inline="false"></span>
              <p>Purchase</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <ul class="menu-list">
        <li>
          <a class>
            <div class="list">
              <span class="iconify" data-icon="ant-design:user-outlined" data-inline="false"></span>
              <p>Trusted Customer</p>
            </div>
          </a>
        </li>
      </ul>
      <ul class="menu-list">
        <li>
          <a class>
            <div class="list">
              <span class="iconify" data-icon="mdi:warehouse" data-inline="false"></span>
              <p>Inventory</p>
            </div>
          </a>
        </li>
      </ul>
      <ul class="menu-list">
        <li>
          <a class>
            <div class="list">
              <span class="iconify" data-icon="typcn:vendor-apple" data-inline="false"></span>
              <p>Suppliers</p>
            </div>
          </a>
        </li>
      </ul>
      <p class="menu-label has-text-weight-bold">Report</p>
      <ul class="menu-list">
        <li>
          <a class>
            <div class="list">
              <span class="iconify" data-icon="bx:bxs-purchase-tag" data-inline="false"></span>
              <p>Purchase Report</p>
            </div>
          </a>
        </li>
      </ul>
      <ul class="menu-list">
        <li>
          <a class>
            <div class="list">
              <span
                class="iconify"
                data-icon="flat-color-icons:sales-performance"
                data-inline="false"
              ></span>
              <p>Sales Report</p>
            </div>
          </a>
        </li>
      </ul>
    </aside>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    toggle: function(event) {
      console.log(event.target);
    }
  }
};
</script>

<style>
</style>