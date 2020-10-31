<template>
  <adminSidebar>
    <div>
      <div class="columns is-multiline">
        <div class="column is-11">
          <h1 class="has-text-info has-text-weight-bold is-size-4">
            Purchase Return Items
          </h1>
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
import datatable from "../../../../components/datatable";
export default {
  components: {
    datatable,
  },
  data: () => ({
    tableData: {
      params: null,
      refresh: true,
      endpoint: "/crm/purchase/paginate/return",
      columns: [
        {
          field: "invoiceNumber",
          column: "#",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "createdAt",
          column: "Invoice Date",
          render: function (field) {
            return !field ? "-" : new Date(field).toLocaleDateString();
          },
        },
        {
          field: "vendorName",
          column: "Vendor",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "netTotal",
          column: "Amount",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
      ],
    },
  }),
  methods: {
    goToinfo: function ({ item }) {
      this.$router.push(`/admin/purchase/${item._id}`);
    },
  },
};
</script>

<style>
</style>