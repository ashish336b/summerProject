<template>
  <adminSidebar>
    <div class="container">
      <div class="invoice-container">
        <div class="invoice-header has-text-centered">
          <h1>{{ purchaseData.vendorName }}</h1>
          <p>{{ purchaseData.address }}</p>
          <p>Pan No : {{ purchaseData.panNumber }}</p>
        </div>
        <div class="invoice-date">
          <h1>Date : 10/5/2020</h1>
          <h1>invoice : {{ purchaseData.invoiceNumber }}</h1>
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
      console.log(result);
      this.purchaseData = result.data;
    });
    console.log(this.purchaseData);
  },
};
</script>

<style>
</style>