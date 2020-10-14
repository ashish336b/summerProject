<template>
  <div>
    <adminSidebar>
      <datatable
        :endpoint="tableData.endpoint"
        :columns="tableData.columns"
        :actions="tableData.actions"
        @deleteEvent="deleteEvent($event)"
        :parameters="tableData.params"
        :refresh="tableData.refresh"
      ></datatable>
    </adminSidebar>
  </div>
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
      endpoint: "/crm/list",
      columns: [
        {
          field: "firstName",
          column: "First Name",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "lastName",
          column: "Last Name",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "address",
          column: "Address",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "username",
          column: "UserName",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "role",
          column: "Role",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
      ],
    },
  }),
  methods: {
    deleteEvent: function (event) {
      this.$axios.post("api/auth/delete", { id: event.id }).then((res) => {
        this.tableData.params = event.params;
        this.tableData.refresh = !this.tableData.refresh;
      });
    },
  },
  created() {},
};
</script>