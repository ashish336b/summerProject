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
              @click="createInvoice()"
            >
              Add Invoice
            </button>
          </div>
        </div>
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="field">
              <label class="label is-small">Name</label>
              <div class="control">
                <AutoComplete
                  id="search"
                  placeholder="Name"
                  attr="label"
                  value="label"
                  api="/crm/customer/autocomplete?searchText="
                  @selected="selectCustomer($event)"
                  @tab="$refs.address.focus()"
                  @newVal="
                    (val) => {
                      invoiceToSave.name = val;
                    }
                  "
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
                  v-model="invoiceToSave.address"
                  placeholder="Address"
                  ref="address"
                />
              </div>
            </div>
          </div>
          <div class="column is-2">
            <div class="field">
              <label class="label is-small">PhoneNumber</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="invoiceToSave.phoneNumber"
                  placeholder="Phone Number"
                  ref="phoneNumber"
                />
              </div>
            </div>
          </div>
          <div class="column is-2">
            <div class="field">
              <label class="label is-small">Cash/Credit</label>
              <div class="control">
                <div class="select">
                  <select v-model="invoiceToSave.isCredit">
                    <option value="false">Cash</option>
                    <option value="true">credit</option>
                  </select>
                </div>
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
              <th>#</th>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Total</th>
              <th>Discount(Rs.)</th>
              <th>Total Adj</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="invoiceToSave.item.length == 0">
              <td colspan="8" class="has-text-centered">Nothing Added Yet</td>
            </tr>
            <tr v-else v-for="(item, i) in invoiceToSave.item" :key="i">
              <td>{{ i + 1 }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.rate }}</td>
              <td>{{ item.total }}</td>
              <td>{{ item.discountRate }}</td>
              <td>{{ item.totalAdjust }}</td>
              <td>
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="columns is-multiline">
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">Product Name</label>
            <div class="control">
              <AutoComplete
                id="searchItem"
                ref="productName"
                placeholder="Name"
                attr="label"
                value="label"
                api="/crm/inventory/autocomplete?searchText="
                @selected="selectProduct($event)"
                @tab="$refs.qty.focus()"
                :reset="refresh"
                :text="autoComplete.text"
                @newVal="
                  (val) => {
                    item.productName = val;
                  }
                "
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
      </div>
      <div class="columns is-multiline">
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
              :disabled="isDisabled"
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
                :value="invoiceToSave.grandTotal"
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
                v-model="invoiceToSave.discountRate"
                @input="calculateAdjustAmt()"
                type="number"
                placeholder="0"
              />
            </div>
            <div class="control">
              <input
                class="input"
                v-model="invoiceToSave.discountAmt"
                @input="calculateAdjustRate()"
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
import AutoComplete from "@/components/autocomplete";
export default {
  components: {
    AutoComplete,
  },
  data: () => ({
    refresh: false,
    autoComplete: {
      text: "",
    },
    invoiceToSave: {
      name: "",
      phoneNumber: "",
      address: "",
      isCredit: "true",
      item: [],
      grandTotal: "",
      netTotal: "",
      discountAmt: "0",
      discountRate: "0",
    },
    item: {
      inventoryId: "",
      productName: "",
      rate: "",
      quantity: "",
      total: "",
      totalAdjust: "",
      discountRate: "",
      discountAmt: "",
    },
  }),
  methods: {
    edit: function (item, index) {
      this.autoComplete.text = this.invoiceToSave.item[index].productName;
      this.item = { ...this.invoiceToSave.item[index] };
      this.invoiceToSave.item.splice(index, 1);
      this.calculateGrandTotal;
    },
    remove: function (index) {
      this.invoiceToSave.item.splice(index, 1);
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
      this.invoiceToSave.discountRate = parseFloat(
        (this.invoiceToSave.discountAmt / this.invoiceToSave.grandTotal) * 100
      ).toFixed(2);
    },
    calculateAdjustAmt: function () {
      let discountAmt =
        (this.invoiceToSave.discountRate * this.invoiceToSave.grandTotal) / 100;
      this.invoiceToSave.discountAmt = parseFloat(discountAmt).toFixed(2);
    },
    selectCustomer: function (customer) {
      this.invoiceToSave.name = customer.label;
      this.invoiceToSave.address = customer.address;
      this.invoiceToSave.phoneNumber = customer.phoneNumber;
    },
    selectProduct: function (product) {
      this.autoComplete.text = product.productName;
      this.item.rate = product.mrp;
      this.item.inventoryId = product.inventoryId;
    },
    add: function () {
      this.item.total = this.item.quantity * this.item.rate;
      this.item.totalAdjust = this.totalAdjust;
      this.invoiceToSave.item.push({ ...this.item });
      this.calculateGrandTotal;
      this.refresh = !this.refresh;
      this.autoComplete.text = "";
      this.item = {
        productName: "",
        rate: "",
        quantity: "",
        total: "",
        totalAdjust: "",
        discountRate: "",
      };
      document.getElementById("searchItem").focus();
    },
    createInvoice: function () {
      this.calculateGrandTotal;
      this.calculateNetTotal;
      let items = this.invoiceToSave.item.map((el) => {
        return {
          inventoryId: el.inventoryId,
          productName: el.productName,
          quantity: el.quantity,
          rate: el.rate,
          discountRate: el.discountRate,
        };
      });
      let invoiceDataToSave = {
        name: this.invoiceToSave.name,
        phoneNumber: this.invoiceToSave.phoneNumber,
        address: this.invoiceToSave.address,
        isCredit: this.invoiceToSave.isCredit,
        item: items,
        grandTotal: this.invoiceToSave.grandTotal,
        discountAmt: this.invoiceToSave.discountAmt,
      };
      this.$axios.post("/crm/invoice", this.invoiceToSave).then((result) => {
        Swal.fire(`Success!`, `Invoice Created`, "success").then((result) => {
          this.$router.push("/admin/invoice");
        });
      });
    },
  },
  computed: {
    totalAdjust: function () {
      this.item.total = this.item.quantity * this.item.rate;
      return parseFloat(
        this.item.total - this.item.total * (this.item.discountRate / 100)
      ).toFixed(2);
    },
    calculateGrandTotal: function () {
      this.invoiceToSave.grandTotal = this.invoiceToSave.item.reduce(
        (acc, curr) => {
          return acc + parseFloat(curr.totalAdjust);
        },
        0
      );
    },
    calculateNetTotal: function () {
      this.invoiceToSave.netTotal =
        this.invoiceToSave.grandTotal - this.invoiceToSave.discountAmt;
      return this.invoiceToSave.netTotal;
    },
    isDisabled: function () {
      return !(
        this.item.productName.length > 0 &&
        this.item.quantity &&
        this.item.rate
      );
    },
    isValid: function () {
      return (
        this.invoiceToSave.name.length > 0 &&
        this.invoiceToSave.address.length > 0 &&
        this.invoiceToSave.phoneNumber.length > 0 &&
        this.invoiceToSave.item.length > 0
      );
    },
  },
};
</script>

<style>
</style>