export const state = () => ({
  isLoggedIn: false,
  loggedInUser: false
});
export const mutations = {
  setIsLoggedIn: function(state, payload) {
    state.isLoggedIn = payload;
  },
  setLoggedInUser: function(state, payload) {
    state.loggedInUser = payload;
  }
};
export const actions = {
  fetchName: function(contex, payload) {
    contex.commit("SET_NAME", payload);
  },
  makeAuth: async function(context, payload) {
    try {
      var res = await this.$axios.post("/api/auth/user/login", payload);
      localStorage.setItem("user.token", res.data.token);
      context.commit("setIsLoggedIn", true);
      await context.dispatch("fetchUser");
    } catch (e) {
      console.log("error");
    }
  },
  fetchUser: async function(context) {
    try {
      var user = await this.$axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user.token")}`
        }
      });
      context.commit("setLoggedInUser", user.data.user);
    } catch (err) {
      console.log(err);
    }
  }
};
export const getters = {};
