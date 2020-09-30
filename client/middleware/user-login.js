export default async function({ store, redirect, $auth, next }) {
  let user = $auth.$state.user;
  if (user && user.role == "user") {
    redirect("/user");
  }
  if (user && user.role == "admin") {
    redirect("/admin/dashboard");
  }
}
//one cannot access login page if they are already login
