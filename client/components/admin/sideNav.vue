<template>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-heading">
      <nuxt-link to="/admin/dashboard">
        <div class="has-text-primary has-text-centered">Admin Section</div>
      </nuxt-link>
    </div>
    <div class="divider mt-4"></div>
    <aside class="menu">
      <ul class="menu-list">
        <li class="my-1">
          <nuxt-link to="/admin/dashboard">
            <div class="list">
              <span
                class="iconify"
                data-icon="ic:twotone-dashboard"
                data-inline="false"
              ></span>
              <p>Dashboard</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <div class="divider mb-4"></div>
      <!-- <p class="menu-label has-text-weight-bold">Invoice Section</p> -->

      <p class="menu-label has-text-weight-bold">Ecommerce</p>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/admin/purchase">
            <div class="list">
              <span
                class="iconify"
                data-icon="ri:medicine-bottle-line"
                data-inline="false"
              ></span>
              <p>Purchase</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/admin/purchase/return">
            <div class="list">
              <span
                class="iconify"
                data-icon="ri:medicine-bottle-line"
                data-inline="false"
              ></span>
              <p>Purchase Return</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/admin/invoice">
            <div class="list">
              <span
                class="iconify"
                data-icon="la:file-invoice-dollar-solid"
                data-inline="false"
              ></span>
              <p>Invoice</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/admin/invoice/return">
            <div class="list">
              <span
                class="iconify"
                data-icon="la:file-invoice-dollar-solid"
                data-inline="false"
              ></span>
              <p>Invoice Return</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/admin/customer">
            <div class="list">
              <span
                class="iconify"
                data-icon="ant-design:user-outlined"
                data-inline="false"
              ></span>
              <p>Customer</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/admin/inventory">
            <div class="list">
              <span
                class="iconify"
                data-icon="mdi:warehouse"
                data-inline="false"
              ></span>
              <p>Inventory</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/admin/vendor">
            <div class="list">
              <span
                class="iconify"
                data-icon="tabler:building-warehouse"
                data-inline="false"
              ></span>
              <p>Vendor</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <p class="menu-label has-text-weight-bold">Report</p>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/admin/purchase/report">
            <div class="list">
              <span
                class="iconify"
                data-icon="bx:bxs-purchase-tag"
                data-inline="false"
              ></span>
              <p>Purchase Report</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/admin/invoice/report">
            <div class="list">
              <span
                class="iconify"
                data-icon="flat-color-icons:sales-performance"
                data-inline="false"
              ></span>
              <p>Sales Report</p>
            </div>
          </nuxt-link>
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
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    toggle: function (event) {
      console.log(event.target);
    },
  },
  created() {},
};
</script>

<style>
</style>