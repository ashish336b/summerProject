export default async function({ store, redirect, $auth, next }) {
  let user = $auth.$state.user;
  console.log(user);
  if (user && user.role == "admin") {
    //
  } else {
    //yedi admin lay hoena banee chai tyo obviously user lay hunxa ra tyo user lai user login page ma redirect garnee
    redirect("/");
  }
}
