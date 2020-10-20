<template>
  <adminSidebar>
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-5">
          <div class="box">
            <div class="title-container">
              <div class="columns">
                <div class="column is-8">
                  <h1 class="is-size-5 has-text-dark">Top Selling Products</h1>
                </div>
                <div class="column is-4">
                  <select
                    @change="change($event)"
                    class="input is-small is-fullwidth"
                  >
                    <option value="lastMonth">Last 30 Days</option>
                    <option value="lastWeek">Last 7 Days</option>
                    <option value="today">Today</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="table-container">
              <table class="table is-fullwidth is-striped">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in data" :key="i">
                    <td>{{ item.productName }}</td>
                    <td>{{ item.quantity }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </adminSidebar>
</template>

<script>
export default {
  data: () => ({
    type: "lastMonth",
    data: {},
  }),
  methods: {
    fetchTopSellingItem: function (type) {
      this.$axios
        .get(`/crm/invoice/groupBy/topSaledItem/${type}`)
        .then(({ data }) => {
          this.data = data;
        });
    },
    change: function (event) {
      this.type = event.target.value;
      this.fetchTopSellingItem(this.type);
    },
  },
  created() {
    this.fetchTopSellingItem(this.type);
  },
};
</script>

<style>
</style>