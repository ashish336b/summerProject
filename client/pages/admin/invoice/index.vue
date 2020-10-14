<template>
  <adminSidebar>
    <div>
      <div class="columns is-multiline">
        <div class="column is-11">
          <h1 class="has-text-info has-text-weight-bold is-size-4">
            Invoice Items
          </h1>
        </div>
        <div class="column is-1">
          <nuxt-link to="/admin/invoice/add" class="button is-small is-primary"
            >Add</nuxt-link
          >
        </div>
      </div>
    </div>
    <button class="button">A</button>
    <datatable
      :endpoint="tableData.endpoint"
      :columns="tableData.columns"
      :actions="tableData.actions"
      @deleteEvent="deleteEvent($event)"
      :parameters="tableData.params"
      :refresh="tableData.refresh"
    >
      <template slot-scope="item">
        <button class="button is-small is-primary" @click="goToInvoice(item)">
          Details
        </button>
      </template>
    </datatable>
  </adminSidebar>
</template>

<script>
import datatable from "@/components/datatable";
export default {
  components: {
    datatable,
  },
  data: () => ({
    tableData: {
      params: null,
      refresh: true,
      endpoint: "/crm/invoice/paginate",
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
          column: "Date",
          render: function (field) {
            return !field ? "-" : new Date(field).toLocaleDateString();
          },
        },
        {
          field: "name",
          column: "Name",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "netTotal",
          column: "netTotal",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "paidDate",
          column: "paidDate",
          render: function (field) {
            return !field
              ? `<span class="tag is-link is-rounded">credit</span>`
              : field;
          },
        },
      ],
    },
  }),
  methods: {
    goToInvoice: function (item) {
      this.$router.push(`/admin/invoice/${item._id}`);
    },
  },
};
</script>

<style>
</style>