<template>
  <div>
    <sidebar>
      <datatable
        :endpoint="tableData.endpoint"
        :columns="tableData.columns"
        :actions="tableData.actions"
        @deleteEvent="deleteEvent($event)"
        :parameters="tableData.params"
        :refresh="tableData.refresh"
      ></datatable>
    </sidebar>
  </div>
</template>
<script>
import datatable from "../../components/datatable";
export default {
  middleware: ["auth", "auth-admin"],
  components: {
    datatable
  },
  data: () => ({
    tableData: {
      params: null,
      refresh: true,
      endpoint: "http://localhost:3000/api/auth/list",
      columns: [
        {
          field: "firstName",
          column: "FirstName",
          render: function(field) {
            return !field ? "ok" : field;
          }
        },
        {
          field: "lastName",
          column: "LastName",
          render: function(field) {
            return !field ? "..." : field;
          }
        },
        {
          field: "address",
          column: "Address",
          render: function(field) {
            return !field ? "<p class='has-text-primary'>No Email</p>" : field;
          }
        },
        {
          field: "username",
          column: "UserName",
          render: function(field) {
            return !field ? "<p class='has-text-primary'>No Email</p>" : field;
          }
        }
      ],
      actions: [
        {
          event: "editEvent",
          class: "is-white has-text-primary px-2 py-0 mx-0 my-0",
          value: `<span class="iconify" data-icon="ant-design:edit-filled" data-inline="false"></span>`
        },
        {
          event: "deleteEvent",
          class: "is-white has-text-danger px-2 py-0 mx-0 my-0",
          value: `<span class="iconify" data-icon="ant-design:delete-filled" data-inline="false"></span>`
        }
      ]
    }
  }),
  methods: {
    deleteEvent: function(event) {
      this.$axios.post("api/auth/delete", { id: event.id }).then(res => {
        this.tableData.params = event.params;
        this.tableData.refresh = !this.tableData.refresh;
      });
    }
  },
  created() {
    console.log(this.$auth.state.user);
  }
};
</script>