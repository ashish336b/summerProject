<template>
  <div>
    <sidebar>
      <datatable :rows="tableData.rows">
        <div></div>
      </datatable>
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
      columns: ["SN", "Name", "Class", "Roll No", "Action"],
      rows: [
        {
          sn: "1",
          name: "Ashish",
          class: "12",
          rollNo: "12"
        },
        {
          sn: "2",
          name: "Ashish",
          class: "12",
          rollNo: "12"
        },
        {
          sn: "3",
          name: "Ashish",
          class: "12",
          rollNo: "12"
        },
        {
          sn: "4",
          name: "Ashish",
          class: "12",
          rollNo: "12"
        }
      ]
    }
  }),
  methods: {
    hello: function() {
      console.log("hello");
    }
  }
};
</script>