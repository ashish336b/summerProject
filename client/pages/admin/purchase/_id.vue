<template>
  <adminSidebar>
    <div class="container">
      <div class="button-container">
        <nuxt-link
          v-if="!purchaseData.isReturn"
          :to="`/admin/purchase/return/${$route.params.id}`"
          class="button is-primary"
          >Return</nuxt-link
        >
      </div>
      <div class="invoice-container">
        <div class="invoice-header has-text-centered">
          <h1 class="is-size-4 is-dark has-text-weight-bold">{{ purchaseData.vendorName }}</h1>
          <p class="is-size-5">{{ purchaseData.address }}</p>
          <p class="is-size-5">Pan No : {{ purchaseData.panNumber }}</p>
        </div>
        <div class="invoice-date">
          <h1 class="has-text-weight-semibold">Date : 10/5/2020</h1>
          <h1 class="has-text-weight-semibold">invoice : {{ purchaseData.invoiceNumber }}</h1>
        </div>
        <div class="invoice-details">
          <table class="table is-fullwidth is-stripped">
            <thead>
              <tr>
                <th>SN</th>
                <th>ProductName</th>
                <th>Manufacturer</th>
                <th>UNIT</th>
                <th>No. Of Packaging</th>
                <th>Quantity</th>
                <th>CP Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in purchaseData.item" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ item.productName }}</td>
                <td>{{ item.manufacturer }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.packaging }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.cpAmount }}</td>
              </tr>
              <tr>
                <td colspan="5"></td>
                <td>Grand Total</td>
                <td>{{ purchaseData.grandTotal }}</td>
              </tr>
              <tr>
                <td colspan="5"></td>
                <td>Discount Amt</td>
                <td>{{ purchaseData.grandTotal - purchaseData.netTotal }}</td>
              </tr>
              <tr>
                <td colspan="5"></td>
                <td>Total Amt</td>
                <td>{{ purchaseData.netTotal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </adminSidebar>
</template>

<script>
export default {
  data: () => ({
    purchaseData: "",
  }),
  created() {
    this.$axios.get(`/crm/purchase/${this.$route.params.id}`).then((result) => {
      this.purchaseData = result.data;
    });
  },
};
</script>

<style>
</style>