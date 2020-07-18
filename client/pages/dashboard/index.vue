<template>
  <div>
    <sidebar>
      <datatable
        endpoint="http://localhost:3000/api/enquiry/paginate"
        :columns="tableData.columns"
        :actions="tableData.actions"
        @pushEvent="editEvent($event)"
      ></datatable>
    </sidebar>
  </div>
</template>
<script>
import datatable from "../../components/datatable";
export default {
  components: {
    datatable
  },
  data: () => ({
    data: "Hello World",
    tableData: {
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
        }
      ]
    }
  }),
  methods: {
    editEvent: function(event) {
      console.log(event);
    }
  }
};
</script>