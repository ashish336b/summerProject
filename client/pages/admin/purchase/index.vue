<template>
  <sidebar>
    <div class="has-text-centered has-text-primary is-size-2">Purchase Page</div>
  </sidebar>
</template>

<script>
export default {
  middleware: ["auth", "auth-admin"]
};
</script>

<style>
</style>