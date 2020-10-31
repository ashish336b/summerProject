<template>
  <adminSidebar>
    <div class="edit-container">
      <div class="modal" :class="{ 'is-active': model.isActive }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Vendor</p>
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
              <div class="column is-6">
                <div class="field">
                  <label class="label">VendorName</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="model.modelData.vendorName"
                      placeholder="Vendor Name"
                    />
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="field">
                  <label class="label">PhoneNumber</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="model.modelData.phoneNumber"
                      placeholder="PhoneNumber"
                    />
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="field">
                  <label class="label">PAN Number</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="model.modelData.panNumber"
                      placeholder="PAN Number"
                    />
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="field">
                  <label class="label">Address</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="model.modelData.address"
                      placeholder="Address"
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
          <h1 class="has-text-info has-text-weight-bold is-size-4">Vendors</h1>
        </div>
        <div class="column is-1">
          <nuxt-link to="/admin/purchase/add" class="button is-small is-primary"
            >Add</nuxt-link
          >
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
        <a class="button is-primary is-small" @click="goToProfile(item)">
          Profile
        </a>
        <a class="button is-info is-small" @click="showForm(item)"> Edit </a>
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
        vendorName: "",
        phoneNumber: "",
        address: "",
        panNumber: "",
      },
    },
    tableData: {
      params: null,
      refresh: true,
      endpoint: "/crm/vendor/paginate",
      columns: [
        {
          field: "vendorName",
          column: "Name",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "phoneNumber",
          column: "Phone No.",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "address",
          column: "Address",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "panNumber",
          column: "panNumber",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
      ],
    },
  }),
  methods: {
    goToProfile: function ({ item }) {
      this.$router.push("/admin/vendor/" + item._id);
    },
    showForm: function ({ item }) {
      this.model.isActive = true;
      this.model.id = item._id;
      this.model.modelData.vendorName = item.vendorName;
      this.model.modelData.phoneNumber = item.phoneNumber;
      this.model.modelData.address = item.address;
      this.model.modelData.panNumber = item.panNumber;
    },
    editInventory: function (id) {
      this.$axios
        .put(`/crm/vendor/${id}`, { ...this.model.modelData })
        .then((result) => {
          this.model.isActive = false;
          Swal.fire(`Success!`, `Vendor Edit Successfully`, "success").then(
            (result) => {
              this.tableData.refresh = !this.tableData.refresh;
            }
          );
        });
    },
  },
};
</script>

<style>
</style>