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
              <th>Sn</th>
              <th>ProductName</th>
              <th>Manufacturer</th>
              <th>Unit</th>
              <th>packaging</th>
              <th>quantity</th>
              <th>mrp</th>
              <th>mrpAmount</th>
              <th>cp</th>
              <th>cpAmount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in purchaseData.item" :key="item.productName">
              <td>1</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.manufacturer }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.packaging }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.mrp }}</td>
              <td>{{ item.mrpAmount }}</td>
              <td>{{ item.cp }}</td>
              <td>{{ item.cpAmount }}</td>
              <td></td>
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
                :text="autoComplete.text"
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
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">cp/qty</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="items.cp"
                placeholder="cp"
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
      <div class="columns is-multiline">
        <div class="column is-10"></div>
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">NetTotal</label>
            <div class="control">
              <input
                class="input"
                v-model="purchaseData.netTotal"
                type="text"
                placeholder="Mrp"
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
      text: "",
    },
    purchaseData: {
      invoiceNumber: "",
      vendorName: "",
      phoneNumber: "",
      address: "",
      panNumber: "",
      item: [],
      grandTotal: "",
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
    selectVendor: function (vendor) {
      this.purchaseData.vendorName = vendor.vendorName;
      this.purchaseData.phoneNumber = vendor.phoneNumber;
      this.purchaseData.address = vendor.address;
      this.purchaseData.panNumber = vendor.panNumber;
    },

    selectProduct: function (product) {
      this.autoComplete.text = product.productName;
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
  },
};
</script>

<style>
</style>