<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  middleware: ["auth", "auth-admin"]
};
</script>

<style>
</style>