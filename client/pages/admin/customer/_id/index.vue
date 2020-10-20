<template>
  <adminSidebar>
    <div class="container" v-if="profile.params">
      <div class="box">
        <h1 class="has-text-centered is-size-4 has-text-primary">Profile</h1>
        <div class="details-container py-3">
          <div class="columns is-multiline">
            <div class="column is-4">
              <p class="is-size-5">
                Name : {{ profile.params.customer.firstName }}
                {{ profile.params.customer.lastName }}
              </p>
            </div>
            <div class="column is-4">
              <p class="is-size-5">
                Phone : {{ profile.params.customer.phoneNumber }}
              </p>
            </div>
            <div class="column is-4">
              <p class="is-size-5">
                Address : {{ profile.params.customer.address }}
              </p>
            </div>
            <div class="column is-4">
              <p class="is-size-5">
                Credit Amount : Rs. {{ profile.params.credit }}
              </p>
            </div>
            <div class="column is-4">
              <p class="is-size-5">
                Total Paid : Rs. {{ profile.params.totalPaid }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="tab-container">
          <div class="tabs">
            <ul>
              <li :class="{ 'is-active': isActive && tabNumber == 1 }">
                <a @click="activeTab(1)">
                  <span>Invoice History</span>
                </a>
              </li>
              <li :class="{ 'is-active': isActive && tabNumber == 2 }">
                <a @click="activeTab(2)">
                  <span>Item History</span>
                </a>
              </li>
              <li :class="{ 'is-active': isActive && tabNumber == 3 }">
                <a @click="activeTab(3)">
                  <span>Return History</span>
                </a>
              </li>
              <li :class="{ 'is-active': isActive && tabNumber == 4 }">
                <a @click="activeTab(4)">
                  <span>Return Item</span>
                </a>
              </li>
            </ul>
          </div>
          <div v-if="tabNumber == 1">
            <table class="table is-fullwidth">
              <thead>
                <th>Date</th>
                <th>Amount</th>
                <th>Credit/Debit</th>
                <th>Paid Date</th>
                <th>Actions</th>
              </thead>
              <tbody>
                <tr v-for="(data, i) in profile.params.invoices" :key="i">
                  <td>{{ new Date(data.date).toLocaleDateString() }}</td>
                  <td>{{ data.netTotal }}</td>
                  <td>{{ data.isCredit ? "credit" : "Paid" }}</td>
                  <td>
                    {{
                      data.paidDate
                        ? new Date(data.paidDate).toLocaleDateString()
                        : "-"
                    }}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="tabNumber == 2">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Discount Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, i) in profile.params.allInvoiceItem" :key="i">
                  <td>{{ data.productName }}</td>
                  <td>{{ data.quantity }}</td>
                  <td>{{ data.rate }}</td>
                  <td>
                    {{
                      data.discountRate
                        ? `${data.discountRate.replace(".00", "")}%`
                        : "0%"
                    }}
                  </td>
                  <td>{{ data.totalAfterDiscount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="tabNumber == 3">
            <table class="table is-fullwidth">
              <thead>
                <th>Date</th>
                <th>Amount</th>
                <th>Credit/Debit</th>
                <th>Paid Date</th>
                <th>Actions</th>
              </thead>
              <tbody>
                <tr v-for="(data, i) in profile.params.returnInvoices" :key="i">
                  <td>{{ new Date(data.date).toLocaleDateString() }}</td>
                  <td>{{ data.netTotal }}</td>
                  <td>{{ data.isCredit ? "credit" : "Paid" }}</td>
                  <td>
                    {{
                      data.paidDate
                        ? new Date(data.paidDate).toLocaleDateString()
                        : "-"
                    }}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="tabNumber == 4">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Discount Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, i) in profile.params.allReturnItems" :key="i">
                  <td>{{ data.productName }}</td>
                  <td>{{ data.quantity }}</td>
                  <td>{{ data.rate }}</td>
                  <td>
                    {{
                      data.discountRate
                        ? `${data.discountRate.replace(".00", "")}%`
                        : "0%"
                    }}
                  </td>
                  <td>{{ data.totalAfterDiscount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </adminSidebar>
</template>

<script>
export default {
  data: () => ({
    isActive: true,
    tabNumber: 1,
    profile: "",
  }),
  methods: {
    activeTab: function (id) {
      this.tabNumber = id;
      this.isActive = true;
    },
  },
  async created() {
    let data = await this.$axios.get(
      `/crm/customer/profile/${this.$route.params.id}`
    );
    this.profile = data.data;
  },
};
</script>

<style>
</style>