<template>
  <div>
    <adminSidebar>
      <div class="edit-container">
        <div class="modal" :class="{ 'is-active': model.isActive }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Edit Customer</p>
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
                    <label class="label">First Name</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="model.modelData.firstName"
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                </div>
                <div class="column is-5">
                  <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="model.modelData.lastName"
                        placeholder="LastName"
                      />
                    </div>
                  </div>
                </div>
                <div class="column is-3">
                  <div class="field">
                    <label class="label">Role</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="model.modelData.role"
                        placeholder="Role"
                      />
                    </div>
                  </div>
                </div>
                <div class="column is-6">
                  <div class="field">
                    <label class="label">UserName</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="model.modelData.username"
                        placeholder="username"
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
              <button class="button is-success">Save changes</button>
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
      <datatable
        :endpoint="tableData.endpoint"
        :columns="tableData.columns"
        :actions="tableData.actions"
        @deleteEvent="deleteEvent($event)"
        :parameters="tableData.params"
        :refresh="tableData.refresh"
      >
        <template slot-scope="item">
          <a @click="goToProfile(item)" class="button is-primary is-small">
            Profile
          </a>
          <a
            @click="editCustomer(item, params)"
            class="button is-info is-small"
          >
            Edit
          </a>
        </template>
      </datatable>
    </adminSidebar>
  </div>
</template>
<script>
import datatable from "@/components/datatable";
export default {
  components: {
    datatable,
  },
  data: () => ({
    model: {
      isActive: false,
      modelData: {
        firstName: "",
        lastName: "",
        address: "",
        username: "",
        role: "",
      },
    },
    tableData: {
      params: null,
      refresh: true,
      endpoint: "/crm/list",
      columns: [
        {
          field: "firstName",
          column: "First Name",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "lastName",
          column: "Last Name",
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
          field: "username",
          column: "UserName",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
        {
          field: "role",
          column: "Role",
          render: function (field) {
            return !field ? "-" : field;
          },
        },
      ],
    },
  }),
  methods: {
    goToProfile: function ({ item }) {
      this.$router.push(`/admin/customer/${item._id}`);
    },
    editCustomer: function ({ item, params }) {
      console.log(item);
      console.log(params);
      this.model.isActive = true;
      this.model.modelData.firstName = item.firstName;
      this.model.modelData.lastName = item.lastName;
      this.model.modelData.address = item.address;
      this.model.modelData.username = item.username;
      this.model.modelData.role = item.role;
    },
    saveEditedCustomer: function ({ item }) {
      this.$axios.put(`/crm/customer/${item._id}`).then((result) => {});
    },
    deleteEvent: function (event) {
      this.$axios.post("api/auth/delete", { id: event.id }).then((res) => {
        this.tableData.params = event.params;
        this.tableData.refresh = !this.tableData.refresh;
      });
    },
  },
  created() {},
};
</script>