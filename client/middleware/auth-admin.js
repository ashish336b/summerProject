export default async function({ store, redirect, $auth, next }) {
  let user = $auth.$state.user;
  if (user && user.role == "admin") {
    //if user variable is set
    //but as admin this block will run else it verify the request is not send by admin hence block it
  } else {
    //first User logged in to his dashbaord which means user variable is set and role="user" not admin
    //second if he try to access admin page /admin he should be redirected to "/user"
    redirect("/user");
  }
}
