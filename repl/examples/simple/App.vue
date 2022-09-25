<script setup lang="ts">
const msg = "Hello Vuejs.de";
</script>
<template>
  <div>
    <h1>{{ msg }}</h1>
    <input type="text" v-model="msg" />
  </div>
</template>
<style lang="postcss"></style>
