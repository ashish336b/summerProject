<template>
  <adminSidebar>
    <div class="vendor-info mx-2 px-2">
      <div class="columns is-multiline">
        <div class="column is-5">
          <div class="has-text-info is-size-4">Vendor Info</div>
        </div>
        <div class="column is-5">
          <button class="button is-info is-small" @click="savePurchaseReturn()">
            Save Purchase Return
          </button>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">Vendor Name</label>
            <div class="control">
              <input
                type="text"
                :value="purchaseData.vendorName"
                class="input"
                readonly
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
                :value="purchaseData.phoneNumber"
                placeholder="Phone Number"
                ref="phoneNumber"
                readonly
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
                :value="purchaseData.address"
                placeholder="Address"
                ref="address"
                readonly
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
                :value="purchaseData.panNumber"
                placeholder="Pan Number"
                ref="panNumber"
                readonly
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
                :value="purchaseData.invoiceNumber"
                placeholder="Invoice Number"
                ref="invoiceNumber"
                readonly
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
            <tr v-for="(item, i) in purchaseData.item" :key="i">
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
              <input
                type="text"
                placeholder="Product Name"
                v-model="items.productName"
                class="input"
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
export default {
  data: () => ({
    purchaseData: {},
    purchaseBatchItem: [],
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
    edit: function (item, index) {
      this.items = {
        productName: item.productName,
        manufacturer: item.manufacturer,
        unit: item.unit,
        packaging: item.packaging,
        qty: item.qty,
        mrp: item.mrp,
        cp: item.cp,
      };
      this.purchaseData.item.splice(index, 1);
      this.grandTotal;
    },
    remove: function (index) {
      this.purchaseData.item.splice(index, 1);
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
    savePurchaseReturn() {
      let item = this.purchaseData.item.map((el) => {
        return {
          productName: el.productName,
          manufacturer: el.manufacturer,
          unit: el.unit,
          packaging: el.packaging,
          qty: el.qty,
          quantity: el.quantity,
          mrp: el.mrp,
          cp: el.cp,
          mrpAmount: el.mrpAmount,
          cpAmount: el.cpAmount,
          inventoryId: el._id,
        };
      });
      let purchaseReturnData = {
        invoiceNumber: this.purchaseData.invoiceNumber,
        vendorName: this.purchaseData.vendorName,
        phoneNumber: this.purchaseData.phoneNumber,
        address: this.purchaseData.address,
        panNumber: this.purchaseData.panNumber,
        grandTotal: this.purchaseData.grandTotal,
        netTotal: this.purchaseData.netTotal,
        item: item,
      };
      this.$axios
        .post(`/crm/purchase/return`, purchaseReturnData)
        .then((result) => {
          alert("success");
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
  async created() {
    let result = await this.$axios.get(
      `/crm/purchase/${this.$route.params.id}`
    );
    let invResult = await this.$axios.get(
      `/crm/inventory/${this.$route.params.id}`
    );
    result.data.item = invResult.data;
    this.purchaseData = result.data;
  },
};
</script>

<style>
</style>