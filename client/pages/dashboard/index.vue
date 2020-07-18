<template>
  <div>
    <sidebar>
      <datatable endpoint="http://localhost:3000/api/medicine" :columns="tableData.columns">
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
      columns: ["Composition", "Group", "Discount", "Name", "Action"],
    }
  }),
  methods: {
    hello: function() {
      console.log("hello");
    }
  }
};
</script>