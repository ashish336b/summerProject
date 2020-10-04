<template>
  <adminSidebar>
    <div class="customer-details mx-2 px-2">
      <div class="columns is-multiline">
        <div class="column is-10">
          <div class="has-text-primary is-size-4">Customer Details</div>
        </div>
        <div class="column is-2">
          <button class="button is-info" @click="createInvoice()">
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
        <div class="column is-4">
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
              <th>ProductName</th>
              <th>quantity</th>
              <th>Rate</th>
              <th>discount %</th>
              <th>total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in invoiceToSave.item"
              :key="`${item.productName}${item.rate}${item.quantity}`"
            >
              <th>1</th>
              <th>{{ item.productName }}</th>
              <th>{{ item.quantity }}</th>
              <th>{{ item.rate }}</th>
              <th>{{ item.discountRate }}</th>
              <th>{{ item.total }}</th>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="columns is-multiline">
        <div class="column is-4">
          <div class="field">
            <label class="label is-small">Product Name</label>
            <div class="control">
              <AutoComplete
                id="search"
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
        <div class="column is-1">
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
        <div class="column is-1">
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
        <div class="column is-1">
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
        <div class="column is-1">
          <div class="field">
            <label class="label is-small">Discount %</label>
            <div class="control">
              <input
                class="input"
                v-model="item.discountRate"
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
            <button class="button is-primary" @click="add()">Add</button>
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
            <label class="label is-small">Adjust Amount</label>
            <div class="control">
              <input
                class="input"
                v-model="invoiceToSave.discountAmt"
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
import AutoComplete from "../../../components/autocomplete";
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
      item: [],
      grandTotal: "",
      netTotal: "",
      discountAmt: "0",
    },
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
      this.invoiceToSave.item.push(this.item);
      this.calculateGrandTotal;
      this.refresh = !this.refresh;
      this.item = {
        productName: "",
        rate: "",
        quantity: "",
        total: "",
        totalAdjust: "",
        discountRate: "",
      };
    },
    createInvoice: function () {
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
        item: items,
        grandTotal: this.invoiceToSave.grandTotal,
        discountAmt: this.invoiceToSave.discountAmt,
      };
      console.log(invoiceDataToSave);
      this.$axios.post("/crm/invoice", this.invoiceToSave).then((result) => {
        Swal.fire(`Success!`, `Invoice Created`, "danger").then((result) => {
          this.$router.push("/admin/purchase");
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
  },
};
</script>

<style>
</style>