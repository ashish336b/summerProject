<template>
  <div>
    <sidebar>
      <datatable
        :endpoint="tableData.endpoint"
        :columns="tableData.columns"
        :actions="tableData.actions"
        @pushEvent="editEvent($event)"
        v-if="show"
        :parameters="params"
        :val="tableData.val"
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
    params: null,
    show: true,
    tableData: {
      val: true,
      endpoint: "http://localhost:3000/api/enquiry",
      columns: [
        { field: "name", column: "name" },
        { field: "address", column: "address" },
        { field: "email", column: "Email" }
      ],
      actions: [
        {
          event: "pushEvent",
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
    editEvent: function(event) {
      // this.show = false;
      axios
        .post("http://localhost:3000/api/enquiry/edit", { id: event.id })
        .then(res => {
          // this.show = true;
          this.tableData.val = !this.tableData.val;
          this.params = event.params;
          this.endpoint = "http://localhost:3000/api/enquiry";
        });
    },
    computed: {
      incrementKey: function() {
        return this.tableData.key++;
      }
    }
  }
};
</script>