<template>
  <div>
    <section class="hero bg-color is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-5-widescreen">
              <div class="box">
                <h1 class="has-text-centered has-text-info-dark is-size-4">
                  Admin Login Page
                </h1>
                <div
                  class="notification is-danger px-3 py-3 my-2"
                  v-if="isError"
                >
                  <button class="delete" @click="hide()"></button>
                  <div v-for="(item, i) in errorMessage" :key="i">
                    <p>{{ item }}</p>
                  </div>
                </div>
                <div class="field">
                  <label for class="label">Username</label>
                  <div class="control has-icons-left">
                    <input
                      type="text"
                      placeholder="e.g. ashish336b"
                      v-model="form.username"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i
                        class="iconify"
                        data-icon="ant-design:user-add-outlined"
                        data-inline="false"
                      ></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for class="label">Password</label>
                  <div class="control has-icons-left">
                    <input
                      type="password"
                      v-model="form.password"
                      placeholder="*******"
                      class="input"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i
                        class="iconify"
                        data-icon="ri:lock-password-fill"
                        data-inline="false"
                      ></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <button class="button is-success" @click="login()">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data: () => ({
    form: {
      username: "",
      password: "",
    },
    isError: false,
    errorMessage: [],
  }),
  methods: {
    login: async function () {
      if (!this.form.username || !this.form.password) {
        this.isError = true;
        this.errorMessage.push("All field is Required");
        return;
      }
      try {
        this.errorMessage = [];
        await this.$auth.loginWith("admin", { data: this.form });
      } catch (e) {
        this.isError = true;
        this.errorMessage.push("Username or Password does not match");
        this.$router.push("/login");
      }
    },
    hide: function () {
      this.errorMessage = [];
      this.isError = false;
    },
  },
};
</script>

<style>
.bg-color{
  background : rgb(200, 220, 222) !important;
}
</style>