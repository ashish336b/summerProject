<template>
  <adminSidebar>
    <div class="vendor-info mx-2 px-2">
      <div class="columns is-multiline">
        <div class="column is-5">
          <div class="has-text-info is-size-4">Vendor Info</div>
        </div>
        <div class="column is-5">
          <button class="button is-info is-small" @click="savePurchase()">
            Save Purchase
          </button>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">Vendor Name</label>
            <div class="control">
              <AutoComplete
                id="search"
                placeholder="Vendor Name"
                attr="label"
                value="label"
                api="/crm/vendor/search?searchText="
                @selected="selectVendor"
                @tab="$refs.phoneNumber.focus()"
                @newVal="
                  (val) => {
                    purchaseData.vendorName = val;
                  }
                "
              />
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">Phone Number</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="purchaseData.phoneNumber"
                placeholder="Phone Number"
                ref="phoneNumber"
              />
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">Address</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="purchaseData.address"
                placeholder="Address"
                ref="address"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">Pan Number</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="purchaseData.panNumber"
                placeholder="Pan Number"
                ref="panNumber"
              />
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">Invoice Number</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="purchaseData.invoiceNumber"
                placeholder="Invoice Number"
                ref="invoiceNumber"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order-details py-1 my-1 px-2 mx-2">
      <div class="is-text-center is-size-4 has-text-info">Order Details</div>
      <div class="table-container">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Manufacturer</th>
              <th>Unit</th>
              <th>Packaging</th>
              <th>Qty</th>
              <th>MRP</th>
              <th>MRP Amount</th>
              <th>CP</th>
              <th>CP Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!purchaseData.item.length">
              <td colspan="11" class="has-text-centered">Nothing Added Yet</td>
            </tr>
            <tr v-for="(item, i) in purchaseData.item" :key="item.productName">
              <td>{{ i + 1 }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.manufacturer }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.packaging }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.mrp }}</td>
              <td>{{ item.mrpAmount }}</td>
              <td>{{ item.cp }}</td>
              <td>{{ item.cpAmount }}</td>
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
    </div>
    <div class="order-form px-2 mx-2 py-1">
      <div class="columns is-multiline">
        <div class="column is-4">
          <div class="field">
            <label class="label is-small">Product Name</label>
            <div class="control">
              <AutoComplete
                id="search"
                placeholder="ProductName"
                attr="label"
                value="label"
                api="/crm/inventory/autoComplete?displayEmpty=Y&searchText="
                @selected="selectProduct($event)"
                @tab="$refs.manufacturer.focus()"
                :reset="refresh"
                :text="autoComplete.search"
                @newVal="
                  (val) => {
                    items.productName = val;
                  }
                "
              />
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label class="label is-small">Manufacturer</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="items.manufacturer"
                placeholder="Manufacturer"
                ref="manufacturer"
              />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">Unit</label>
            <div class="control">
              <input
                class="input"
                v-model="items.unit"
                type="text"
                placeholder="Unit"
              />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">Quantity/Packaging</label>
            <div class="control">
              <input
                class="input"
                v-model="items.packaging"
                type="text"
                placeholder="Packaging"
              />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">No. of Packaging</label>
            <div class="control">
              <input
                class="input"
                v-model="items.qty"
                type="text"
                placeholder="Quantity"
              />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">Mrp/qty</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="items.mrp"
                placeholder="Mrp"
              />
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="columns mb-0 mt-1">
            <div class="column pr-1 pl-3 py-0">
              <label class="label is-small">CP Amount &nbsp; &nbsp; OR</label>
            </div>
            <div class="column pr-1 pl-3 py-0">
              <label class="label is-small">CP/QTY</label>
            </div>
          </div>
          <div class="field has-addons">
            <div class="control">
              <input
                class="input"
                type="number"
                @input="getCp()"
                v-model="items.cpAmount"
                placeholder="Total CP"
              />
            </div>
            <div class="control">
              <input
                class="input"
                type="number"
                @input="getCpAmount()"
                v-model="items.cp"
                placeholder="CP/Qty"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="add-order-details">
        <button class="button is-small is-info" @click="add()">Add</button>
      </div>
      <div class="columns is-multiline">
        <div class="column is-10"></div>
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">Grand Total</label>
            <div class="control">
              <input
                class="input"
                type="text"
                readonly
                :value="purchaseData.grandTotal"
                placeholder="Grand Total"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-mulitline">
        <div class="column is-9"></div>
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
                v-model="purchaseData.discountRate"
                @input="calculateAdjustAmt()"
                type="number"
                placeholder="0"
              />
            </div>
            <div class="control">
              <input
                class="input"
                v-model="purchaseData.discountAmt"
                @input="calculateAdjustRate()"
                type="number"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-10"></div>
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">NetTotal</label>
            <div class="control">
              <input
                class="input"
                v-model="calculateNetTotal"
                type="text"
                placeholder="NetTotal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </adminSidebar>
</template>

<script>
import AutoComplete from "../../../components/autocomplete";
import Swal from "sweetalert2";
export default {
  components: {
    AutoComplete,
  },
  data: () => ({
    refresh: false,
    autoComplete: {
      search: "",
    },
    purchaseData: {
      invoiceNumber: "",
      vendorName: "",
      phoneNumber: "",
      address: "",
      panNumber: "",
      item: [],
      grandTotal: "",
      discountAmt: "",
      discountRate: "",
      netTotal: "",
    },
    items: {
      productName: "",
      manufacturer: "",
      unit: "",
      packaging: "",
      qty: "",
      mrp: "",
      cp: "",
      mrpAmount: "",
      cpAmount: "",
    },
  }),
  methods: {
    getCp: function () {
      this.items.cp =
        this.items.cpAmount / (this.items.packaging * this.items.qty);
      if (!isFinite(this.items.cp)) {
        this.items.cp = 0;
      } else {
        this.items.cp = parseFloat(this.items.cp).toFixed(2);
      }
    },
    calculateAdjustRate: function () {
      this.purchaseData.discountRate = parseFloat(
        (this.purchaseData.discountAmt / this.purchaseData.grandTotal) * 100
      ).toFixed(2);
    },
    calculateAdjustAmt: function () {
      let discountAmt =
        (this.purchaseData.discountRate * this.purchaseData.grandTotal) / 100;
      this.purchaseData.discountAmt = parseFloat(discountAmt).toFixed(2);
    },
    getCpAmount: function () {
      this.items.cpAmount =
        this.items.packaging * this.items.qty * this.items.cp;
    },
    add: function () {
      let quantity = this.items.packaging * this.items.qty;
      let cpAmount = this.items.cp * quantity;
      let mrpAmount = this.items.mrp * quantity;
      this.items["quantity"] = quantity;
      this.items["cpAmount"] = cpAmount;
      this.items["mrpAmount"] = mrpAmount;
      this.purchaseData.item.push(this.items);
      this.grandTotal;
      this.refresh = !this.refresh;
      this.autoComplete.search = "";
      this.items = {
        productName: "",
        manufacturer: "",
        unit: "",
        packaging: "",
        qty: "",
        mrp: "",
        cp: "",
        mrpAmount: "",
        cpAmount: "",
      };
    },
    edit: function (item, index) {
      this.autoComplete.search = this.purchaseData.item[index].productName;
      this.items = { ...this.purchaseData.item[index] };
      this.purchaseData.item.splice(index, 1);
      this.grandTotal;
    },
    remove: function (index) {
      this.purchaseData.item.splice(index, 1);
      this.grandTotal;
    },
    selectVendor: function (vendor) {
      this.purchaseData.vendorName = vendor.vendorName;
      this.purchaseData.phoneNumber = vendor.phoneNumber;
      this.purchaseData.address = vendor.address;
      this.purchaseData.panNumber = vendor.panNumber;
    },

    selectProduct: function (product) {
      this.autoComplete.search = product.productName;
      this.items.productName = product.productName;
      this.items.manufacturer = product.manufacturer;
      this.items.unit = product.unit;
    },
    savePurchase: function () {
      this.$axios
        .post("/crm/purchase", this.purchaseData)
        .then((result) => {
          Swal.fire(
            `Success!`,
            `Invoice number #${this.purchaseData.invoiceNumber} Created`,
            "success"
          ).then((result) => {
            this.$router.push("/admin/purchase");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    grandTotal: function () {
      this.purchaseData.grandTotal = this.purchaseData.item.reduce(
        (acc, curr) => {
          if (!acc) {
            return parseInt(curr.cpAmount);
          }
          return acc + parseInt(curr.cpAmount);
        },
        0
      );
    },
    calculateNetTotal: function () {
      return (this.purchaseData.netTotal = parseFloat(
        this.purchaseData.grandTotal - this.purchaseData.discountAmt
      ).toFixed(2));
    },
  },
};
</script>

<style>
</style>