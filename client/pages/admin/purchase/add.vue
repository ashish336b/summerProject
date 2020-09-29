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
              <input
                class="input"
                type="text"
                v-model="purchaseData.vendorName"
                placeholder="Vendor Name"
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
              <input
                class="input"
                type="text"
                v-model="items.productName"
                placeholder="Product Name"
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
                v-model="purchaseData.grandTotal"
                type="text"
                placeholder="Mrp"
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
export default {
  data: () => ({
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
    savePurchase: function () {
      this.$axios
        .post("/crm/purchase", this.purchaseData)
        .then((result) => {
          alert("success created Purchase");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>