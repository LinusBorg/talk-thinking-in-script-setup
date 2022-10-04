<script setup>
import { ref, readonly } from "vue";
const message = ref("Hello Vue.js Germany");
</script>

<template>
  <label>
    <input type="text" v-model="message" />
  </label>
</template>
