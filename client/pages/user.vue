<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  middleware: "auth-user"
};
</script>

<style>
</style>