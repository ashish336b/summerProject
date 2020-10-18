<template>
  <adminSidebar>
    <div class="invoice-details mx-2 px-2">
      <div class="customer-details">
        <div class="columns is-multiline">
          <div class="column is-10">
            <div class="has-text-primary is-size-4">Customer Details</div>
          </div>
          <div class="column is-2">
            <button
              class="button is-info"
              :disabled="!isValid"
              @click="returnInvoice()"
            >
              Return
            </button>
          </div>
        </div>
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="field">
              <label class="label is-small">Name</label>
              <div class="control">
                <input
                  type="text"
                  :value="invoiceData.name"
                  readonly
                  class="input"
                />
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label is-small">Address</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Address"
                  ref="address"
                  :value="invoiceData.address"
                  readonly
                />
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label is-small">PhoneNumber</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  :value="invoiceData.phoneNumber"
                  readonly
                  placeholder="Phone Number"
                  ref="phoneNumber"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column">
          <div class="is-size-4 has-text-info">Order Details</div>
        </div>
      </div>
      <div class="order-details table-container">
        <table class="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Sn</th>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Total</th>
              <th>discount</th>
              <th>Total Adjust</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in invoiceData.item" :key="i">
              <th>{{ i + 1 }}</th>
              <th>{{ item.productName }}</th>
              <th>{{ item.quantity }}</th>
              <th>{{ item.rate }}</th>
              <th>{{ item.total }}</th>
              <th>{{ item.discountRate ? item.discountRate : 0 }}</th>
              <th>{{ item.totalAdjust }}</th>
              <th>
                <a @click="edit(item, i)" class="has-text-primary">
                  <span
                    class="iconify"
                    data-icon="ant-design:edit-outlined"
                    data-inline="false"
                  ></span>
                </a>
                <a @click="remove(i)" class="has-text-danger">
                  <span
                    class="iconify"
                    data-icon="mdi:delete"
                    data-inline="false"
                  ></span>
                </a>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="columns is-multiline">
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">Product Name</label>
            <div class="control">
              <input
                type="text"
                class="input"
                v-model="item.productName"
                placeholder="ProductName"
              />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">Qty</label>
            <div class="control">
              <input
                class="input"
                v-model="item.quantity"
                type="number"
                placeholder="0"
                ref="qty"
              />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">Rate</label>
            <div class="control">
              <input
                class="input"
                v-model="item.rate"
                type="number"
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">Total</label>
            <div class="control">
              <input
                class="input"
                :value="item.quantity * item.rate"
                type="number"
                disabled
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="columns mb-0 mt-1">
            <div class="column pr-1 pl-3 py-0">
              <label class="label is-small">Disc. % &nbsp; or</label>
            </div>
            <div class="column pr-1 pl-3 py-0">
              <label class="label is-small">Disc. Amt</label>
            </div>
          </div>
          <div class="field has-addons">
            <div class="control">
              <input
                class="input"
                v-model="item.discountRate"
                @input="calculateDisAmt()"
                type="number"
                placeholder="0"
              />
            </div>
            <div class="control">
              <input
                class="input"
                v-model="item.discountAmt"
                @input="calculateDisRate()"
                type="number"
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">Total Adj</label>
            <div class="control">
              <input
                class="input"
                :value="totalAdjust"
                disabled
                type="number"
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="action mt-5">
            <button
              class="button is-primary"
              :disabled="!isDisabled"
              @click="add()"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-8"></div>
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">Grand Total</label>
            <div class="control">
              <input
                class="input"
                :value="invoiceData.grandTotal"
                disabled
                type="number"
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div class="column is-1"></div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-8"></div>
        <div class="column is-3">
          <div class="columns mb-0 mt-1">
            <div class="column pr-1 pl-3 py-0">
              <label class="label is-small"
                >Adjust In % &nbsp;&nbsp;&nbsp; or</label
              >
            </div>
            <div class="column pr-1 pl-3 py-0">
              <label class="label is-small">Adjust in Amt</label>
            </div>
          </div>
          <div class="field has-addons">
            <div class="control">
              <input
                class="input"
                v-model="invoiceData.discountAmt"
                @input="calculateAdjustRate()"
                type="number"
                placeholder="0"
              />
            </div>
            <div class="control">
              <input
                class="input"
                v-model="invoiceData.discountRate"
                @input="calculateAdjustAmt()"
                type="number"
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div class="column is-1"></div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-8"></div>
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">NetTotal</label>
            <div class="control">
              <input
                class="input"
                disabled
                :value="calculateNetTotal"
                type="number"
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div class="column is-1"></div>
      </div>
    </div>
  </adminSidebar>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data: () => ({
    invoiceData: "",
    item: {
      inventoryId: "",
      productName: "",
      rate: "",
      quantity: "",
      total: "",
      totalAdjust: "",
      discountRate: "",
    },
  }),
  methods: {
    add: function () {
      this.item.total = this.item.quantity * this.item.rate;
      this.item.totalAdjust = this.totalAdjust;
      this.invoiceData.item.push({ ...this.item });
      this.calculateGrandTotal;
      this.item = {
        inventoryId: "",
        productName: "",
        rate: "",
        quantity: "",
        total: "",
        totalAdjust: "",
        discountRate: "",
        discountAmt: "",
      };
    },
    edit: function (item, index) {
      this.item = { ...item };
      this.invoiceData.item.splice(index, 1);
      this.calculateGrandTotal;
    },
    remove: function (index) {
      this.invoiceData.item.splice(index, 1);
      this.calculateGrandTotal;
    },
    calculateDisAmt: function () {
      this.item.discountAmt = parseFloat(
        (this.item.total * this.item.discountRate) / 100
      ).toFixed(2);
    },
    calculateDisRate: function () {
      this.item.discountRate = parseFloat(
        (this.item.discountAmt / this.item.total) * 100
      ).toFixed(2);
    },
    calculateAdjustRate: function () {
      this.invoiceData.discountRate = parseFloat(
        (this.invoiceData.discountAmt / this.invoiceData.grandTotal) * 100
      ).toFixed(2);
    },
    calculateAdjustAmt: function () {
      let discountAmt =
        (this.invoiceData.discountRate * this.invoiceData.grandTotal) / 100;
      this.invoiceData.discountAmt = parseFloat(discountAmt).toFixed(2);
    },
    returnInvoice: function () {
      let item = this.invoiceData.item.map((el) => {
        return {
          inventoryId: el.inventoryId,
          productName: el.productName,
          rate: el.rate,
          quantity: el.quantity,
          discountRate: el.discountRate,
        };
      });
      let invoiceReturnData = {
        item: item,
        name: this.invoiceData.name,
        phoneNumber: this.invoiceData.phoneNumber,
        address: this.invoiceData.address,
        grandTotal: parseFloat(this.invoiceData.grandTotal),
        netTotal: parseFloat(this.invoiceData.netTotal),
        discountAmt: this.invoiceData.discountAmt,
      };
      this.$axios
        .post("/crm/invoice/return", invoiceReturnData)
        .then((result) => {
          Swal.fire(`Success!`, `Invoice Created`, "success").then((result) => {
            this.$router.push("/admin/invoice");
          });
        });
    },
  },
  computed: {
    totalAdjust: function () {
      this.item.total = this.item.quantity * this.item.rate;
      return this.item.total - this.item.total * (this.item.discountRate / 100);
    },
    calculateGrandTotal: function () {
      this.invoiceData.grandTotal = this.invoiceData.item.reduce(
        (acc, curr) => {
          return acc + parseFloat(curr.totalAdjust);
        },
        0
      );
    },
    calculateNetTotal: function () {
      if (this.invoiceData) {
        this.invoiceData.netTotal =
          this.invoiceData.grandTotal - this.invoiceData.discountAmt;
        return this.invoiceData.netTotal;
      }
    },
    isDisabled: function () {
      return (
        this.item.productName.length > 0 && this.item.quantity && this.item.rate
      );
    },
    isValid: function () {
      if (this.invoiceData.item) {
        return (
          this.invoiceData.name.length > 0 &&
          this.invoiceData.address.length > 0 &&
          this.invoiceData.phoneNumber.length > 0 &&
          this.invoiceData.item.length > 0
        );
      }
    },
  },
  async created() {
    let result = await this.$axios.get(
      `/crm/invoice/invoiceNumber/${this.$route.params.invoiceNumber}`
    );
    result.data.item.forEach((el) => {
      el.discountAmt = el.discountAmt ? el.discountAmt : 0;
      el.discountRate = parseFloat((el.discountAmt / el.total) * 100).toFixed(
        2
      );
    });
    result.data.discountAmt = !result.data.discountAmt
      ? 0
      : result.data.discountAmt;
    result.data.discountRate = parseFloat(
      (result.data.discountAmt / result.data.grandTotal) * 100
    ).toFixed(2);
    this.invoiceData = result.data;
  },
};
</script>

<style>
</style>