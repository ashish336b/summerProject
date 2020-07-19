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
import axios from "axios";
export default {
  components: {
    datatable
  },
  data: () => ({
    tableData: {
      params: null,
      refresh: true,
      endpoint: "http://localhost:3000/api/enquiry",
      columns: [
        {
          field: "name",
          column: "name",
          render: function(field) {
            return !field ? "ok" : field;
          }
        },
        {
          field: "address",
          column: "address",
          render: function(field) {
            return !field ? "..." : field;
          }
        },
        {
          field: "email",
          column: "Email",
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
      axios
        .post("http://localhost:3000/api/enquiry/edit", { id: event.id })
        .then(res => {
          this.tableData.show = true;
          // this.tableData.endpoint = "http://localhost:3000/api/enquiry";
          /* include these below two line of code everytime for reactivity */
          this.tableData.params = event.params;
          this.tableData.refresh = !this.tableData.refresh; //just change value every time request is sent to refresh datatable
        });
    }
  }
};
</script>