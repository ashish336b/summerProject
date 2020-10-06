<template>
  <adminSidebar>
    <div>
      <div class="columns is-multiline">
        <div class="column is-11">
          <h1 class="has-text-info has-text-weight-bold is-size-4">
            Purchased Items
          </h1>
        </div>
        <div class="column is-1">
          <nuxt-link to="/admin/purchase/add" class="button is-small is-primary"
            >Add</nuxt-link
          >
        </div>
      </div>
    </div>
    <datatable
      :endpoint="tableData.endpoint"
      :columns="tableData.columns"
      :actions="tableData.actions"
      @deleteEvent="deleteEvent($event)"
      :parameters="tableData.params"
      :refresh="tableData.refresh"
    >
      <template slot-scope="item">
        <button class="button is-primary is-small" @click="goToinfo(item)">
          Info
        </button>
      </template>
    </datatable>
  </adminSidebar>
</template>

<script>
import datatable from "../../../components/datatable";
export default {
  components: {
    datatable,
  },
  data: () => ({
    tableData: {
      params: null,
      refresh: true,
      endpoint: "/crm/purchase/paginate",
      columns: [
        {
          field: "vendorName",
          column: "VendorName",
          render: function (field) {
            return !field ? "ok" : field;
          },
        },
        {
          field: "phoneNumber",
          column: "Phone No.",
          render: function (field) {
            return !field ? "..." : field;
          },
        },
        {
          field: "address",
          column: "Address",
          render: function (field) {
            return !field ? "<p class='has-text-primary'>No Email</p>" : field;
          },
        },
        {
          field: "panNumber",
          column: "PAN",
          render: function (field) {
            return !field ? "<p class='has-text-primary'>No Email</p>" : field;
          },
        },
      ],
    },
  }),
  methods: {
    goToinfo: function (item) {
      this.$router.push(`/admin/purchase/${item._id}`);
    },
  },
};
</script>

<style>
</style>