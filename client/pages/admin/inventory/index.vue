<template>
  <adminSidebar>
    <div>
      <div class="columns is-multiline">
        <div class="column is-11">
          <h1 class="has-text-info has-text-weight-bold is-size-4">
            Inventory Items
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
    ></datatable>
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
      endpoint: "http://localhost:3000/crm/inventory/paginate",
      columns: [
        {
          field: "productName",
          column: "ProductName",
          render: function (field) {
            return !field ? "ok" : field;
          },
        },
        {
          field: "manufacturer",
          column: "Manufacturer",
          render: function (field) {
            return !field ? "..." : field;
          },
        },
        {
          field: "quantity",
          column: "Quantity",
          render: function (field) {
            return !field ? "<p class='has-text-primary'>No Email</p>" : field;
          },
        },
        {
          field: "purchasedFrom",
          column: "Vendor",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "mrp",
          column: "mrp/unit",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
      ],
    },
  }),
  methods: {},
};
</script>

<style>
</style>