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
      >
        <template slot-scope="item">
          <button @click="goToProfile(item)" class="button is-primary is-small">
            Profile
          </button>
        </template>
      </datatable>
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
    goToProfile: function (item) {
      this.$router.push(`/admin/customer/${item._id}`);
    },
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