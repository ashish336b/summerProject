<template>
  <div>
    <section class="hero is-primary is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-5-widescreen">
          <form action="" class="box">
          <h1 class="has-text-centered has-text-info is-size-4">Login Page</h1>
            <div class="field">
              <label for="" class="label">Username</label>
              <div class="control has-icons-left">
                <input type="text" placeholder="e.g. ashish336b" class="input" required>
                <span class="icon is-small is-left">
                  <i class="iconify" data-icon="ant-design:user-add-outlined" data-inline="false"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="*******" class="input" required>
                <span class="icon is-small is-left">
                  <i class="iconify" data-icon="ri:lock-password-fill" data-inline="false"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="checkbox">
                <input type="checkbox">
               Remember me
              </label>
            </div>
            <div class="field">
              <button class="button is-success">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>