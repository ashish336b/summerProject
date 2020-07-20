<template>
  <div>
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-5-widescreen">
              <div class="box">
                <h1 class="has-text-centered has-text-info is-size-4">User Login Page</h1>
                <div class="field">
                  <label for class="label">Username</label>
                  <div class="control has-icons-left">
                    <input
                      type="text"
                      placeholder="UserName"
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
                      <i class="iconify" data-icon="ri:lock-password-fill" data-inline="false"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for class="checkbox">
                    <input type="checkbox" />
                    Remember me
                  </label>
                </div>
                <div class="field">
                  <button class="button is-success" @click="login()">Login</button>
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
import { mapState } from "vuex";
export default {
  data: () => ({
    form: {
      username: "",
      password: ""
    }
  }),
  methods: {
    login: async function() {
      await this.$store.dispatch("userAuth/makeAuth", this.form);
      // await this.$store.dispatch("userAuth/fetchUser");
      console.log(this.$store.state.userAuth.loggedInUser);
    }
  },
  computed: {
    ...mapState({
      loggedInUser: state => state.userAuth.loggedInUser
    })
  },
  created() {
    console.log(this.$store.state.userAuth.loggedInUser);
    // this.$store.dispatch("userAuth/fetchName", "Ashish");
    // console.log("name", this.name);
    // console.log("user", this.$auth.loggedIn);
  }
};
</script>

<style>
</style>