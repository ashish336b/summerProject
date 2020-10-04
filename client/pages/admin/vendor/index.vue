<template>
  <adminSidebar>
    <div>
      <div class="columns is-multiline">
        <div class="column is-11">
          <h1 class="has-text-info has-text-weight-bold is-size-4">Vendors</h1>
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
    ></datatable>
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
      endpoint: "/crm/vendor/paginate",
      columns: [
        {
          field: "vendorName",
          column: "Name",
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
          column: "panNumber",
          render: function (field) {
            return !field ? "<p class='has-text-primary'>No Email</p>" : field;
          },
        },
      ],
      actions: [
        {
          event: "editEvent",
          class: "is-white has-text-primary px-2 py-0 mx-0 my-0",
          value: `<span class="iconify" data-icon="ant-design:edit-filled" data-inline="false"></span>`,
        },
        {
          event: "deleteEvent",
          class: "is-white has-text-danger px-2 py-0 mx-0 my-0",
          value: `<span class="iconify" data-icon="ant-design:delete-filled" data-inline="false"></span>`,
        },
      ],
    },
  }),
  methods: {},
};
</script>

<style>
</style>