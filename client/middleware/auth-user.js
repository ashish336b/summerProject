export default async function({ store, redirect, $auth, next }) {
  let user = $auth.$state.user;
  if (user && user.role == "user") {
  } else {
    redirect("/");
  }
}
