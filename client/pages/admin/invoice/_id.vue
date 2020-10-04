<template>
  <adminSidebar>
    <div class="hero-container">
      <div class="invoice-container mx-6 my-2">
        <div class="invoive-header">
          <h1 class="has-text-centered is-size-5">
            Grocery Store Management System
          </h1>
          <p class="has-text-centered">6th Sem Summer Project</p>
          <p class="has-text-centered">Phone No. 124578963</p>
          <p class="has-text-centered">Pan No : 124578963</p>
        </div>
        <div class="invoice-date-and-number">
          <div class="columns">
            <div class="column is-3">
              <h1 class="has-text-left">
                To: <br />{{ invoiceData.name }},<br />{{ invoiceData.address }}
              </h1>
            </div>
            <div class="column is-6"></div>
            <div class="column is-3 has-text-right">
              <h1>Invoice Number : {{ invoiceData.invoiceNumber }}</h1>
              <h1>Date : {{ getDate(invoiceData.createdAt) }}</h1>
            </div>
          </div>
        </div>
        <div class="invoice-details py-1 my-1">
          <table class="table is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>SN</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Discount %</th>
                <th>Adjust Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in invoiceData.item"
                :key="i"
                class="product-details"
              >
                <td>{{ i + 1 }}</td>
                <td>{{ item.productName }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.rate }}</td>
                <td>{{ item.discountRate }}</td>
                <td>{{ item.totalAdjust }}</td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td>Grand Total</td>
                <td>{{ invoiceData.grandTotal }}</td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td>Adjust Amount</td>
                <td>{{ invoiceData.discountAmt }}</td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td>Net Total</td>
                <td>{{ invoiceData.netTotal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="invoice-footer py-2 my-2">
          <div class="has-text-right">
            <h1>
              Prepared By : {{ $auth.user.firstName }} {{ $auth.user.lastName }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </adminSidebar>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    invoiceData: "",
  }),
  async created() {
    let result = await this.$axios.get(`/crm/invoice/${this.$route.params.id}`);
    this.invoiceData = result.data;
  },
  methods: {
    getDate: function (date) {
      date = moment(date).format("YYYY/MM/DD");
      return date;
    },
  },
};
</script>

<style>
</style>