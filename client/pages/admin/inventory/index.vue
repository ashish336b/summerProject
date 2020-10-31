<template>
  <adminSidebar>
    <div class="edit-container">
      <div class="modal" :class="{ 'is-active': model.isActive }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Inventory</p>
            <button
              class="delete"
              aria-label="close"
              @click="
                () => {
                  model.isActive = false;
                }
              "
            ></button>
          </header>
          <section class="modal-card-body">
            <div class="columns is-multiline">
              <div class="column is-4">
                <div class="field">
                  <label class="label">Product Name</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="model.modelData.productName"
                      placeholder="productName"
                    />
                  </div>
                </div>
              </div>
              <div class="column is-5">
                <div class="field">
                  <label class="label">Manufacturer</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="model.modelData.manufacturer"
                      placeholder="manufacturer"
                    />
                  </div>
                </div>
              </div>
              <div class="column is-3">
                <div class="field">
                  <label class="label">quantity</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="model.modelData.quantity"
                      placeholder="Quantity"
                    />
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="field">
                  <label class="label">PurchaseFrom</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="model.modelData.purchasedFrom"
                      placeholder="PurchasedFrom"
                    />
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="field">
                  <label class="label">mrp</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="model.modelData.mrp"
                      placeholder="MRP"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="editInventory(model.id)">
              Save changes
            </button>
            <button
              class="button"
              @click="
                () => {
                  model.isActive = false;
                }
              "
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
    <div>
      <div class="columns is-multiline">
        <div class="column is-11">
          <h1 class="has-text-info has-text-weight-bold is-size-4">
            Inventory Items
          </h1>
        </div>
      </div>
    </div>
    <datatable
      :endpoint="tableData.endpoint"
      :columns="tableData.columns"
      :actions="tableData.actions"
      @deleteEvent="deleteEvent($event)"
      :parameters="tableData.params"
      :refresh="tableData.refresh"
    >
      <template slot-scope="item">
        <a class="button is-info is-small" @click="showEditForm(item)">Edit</a>
      </template>
    </datatable>
  </adminSidebar>
</template>

<script>
import datatable from "@/components/datatable";
import Swal from "sweetalert2";
export default {
  components: {
    datatable,
  },
  data: () => ({
    model: {
      isActive: false,
      id: "",
      modelData: {
        productName: "",
        manufacturer: "",
        quantity: "",
        purchasedFrom: "",
        mrp: "",
      },
    },
    tableData: {
      params: null,
      refresh: true,
      endpoint: "http://localhost:3000/crm/inventory/paginate",
      columns: [
        {
          field: "productName",
          column: "ProductName",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "manufacturer",
          column: "Manufacturer",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "quantity",
          column: "Quantity",
          render: function (field) {
            return !field ? "<p class='has-text-danger'>No Stock</p>" : field;
          },
        },
        {
          field: "purchasedFrom",
          column: "Vendor",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "mrp",
          column: "mrp/unit",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
      ],
    },
  }),
  methods: {
    showEditForm: function ({ item }) {
      this.model.isActive = true;
      this.model.id = item._id;
      this.model.modelData.productName = item.productName;
      this.model.modelData.manufacturer = item.manufacturer;
      this.model.modelData.quantity = item.quantity;
      this.model.modelData.purchasedFrom = item.purchasedFrom;
      this.model.modelData.mrp = item.mrp;
    },
    editInventory: function (id) {
      this.$axios
        .put("/crm/inventory/" + id, { ...this.model.modelData })
        .then((result) => {
          this.model.isActive = false;
          Swal.fire(
            `Success!`,
            `Inventory Edited Successfully`,
            "success"
          ).then((result) => {
            this.tableData.refresh = !this.tableData.refresh;
          });
        });
    },
  },
};
</script>

<style>
</style>