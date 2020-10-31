<template>
  <adminSidebar>
    <div>
      <div class="columns is-multiline">
        <div class="column is-11">
          <h1 class="has-text-info has-text-weight-bold is-size-4">
            Purchased Items
          </h1>
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
    >
      <template slot-scope="item">
        <a class="button is-primary is-small" @click="goToinfo(item)"> Info </a>
        <a
          v-if="item.item.isCredit"
          class="button is-primary is-small"
          @click="mark(item)"
          >Mark As Paid</a
        >
        <a v-else class="button is-small is-danger" @click="mark(item)"
          >Mark As Credit</a
        >
      </template>
    </datatable>
  </adminSidebar>
</template>

<script>
import datatable from "@/components/datatable";
import Swal from "sweetalert2";
export default {
  components: {
    datatable,
  },
  data: () => ({
    tableData: {
      params: null,
      refresh: true,
      endpoint: "/crm/purchase/paginate",
      columns: [
        {
          field: "invoiceNumber",
          column: "#",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "createdAt",
          column: "Date",
          render: function (field) {
            return !field ? "-" : new Date(field).toLocaleDateString();
          },
        },
        {
          field: "vendorName",
          column: "Vendor",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "netTotal",
          column: "Amount",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "paidDate",
          column: "Paid Date",
          render: function (field) {
            return !field
              ? `<span class="tag is-link is-rounded">credit</span>`
              : new Date(field).toLocaleDateString();
          },
        },
      ],
    },
  }),
  methods: {
    goToinfo: function ({ item }) {
      this.$router.push(`/admin/purchase/${item._id}`);
    },
    mark: function ({ item }) {
      if (item.paidDate) {
        Swal.fire({
          title: `Mark #${item.invoiceNumber} as Credit`,
          showCancelButton: true,
          width: "350px",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, continue.",
        }).then((result) => {
          if (result.value) {
            this.$axios
              .put(`/crm/purchase/unmarkAsPaid/${item._id}`, {
                date: "1998/2/13",
              })
              .then(({ data }) => {
                if (!data.error)
                  this.tableData.refresh = !this.tableData.refresh;
              });
          }
        });
      } else {
        Swal.fire({
          title: `Mark #${item.invoiceNumber} as Paid`,
          html: `
            <input type="date" class="input" id="datepicker">
          `,
          showCloseButton: false,
          width: "350px",
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: "Mark as Paid",
          confirmButtonColor: "#3085d6",
          cancelButtonText: "Cancel",
          cancelButtonColor: "#d33",
          onOpen: () => {
            document.getElementById(
              "datepicker"
            ).value = new Date().toISOString().split("T")[0];
          },
        }).then((result) => {
          if (result.value) {
            this.date = document.getElementById("datepicker").value;
            this.$axios
              .put(`/crm/purchase/markAsPaid/${item._id}`, {
                date: this.date,
              })
              .then(({ data }) => {
                if (!data.error)
                  this.tableData.refresh = !this.tableData.refresh;
              });
          }
        });
      }
    },
  },
};
</script>

<style>
</style>