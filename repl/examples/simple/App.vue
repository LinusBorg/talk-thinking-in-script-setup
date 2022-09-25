<script setup>
import { ref } from "vue";
const msg = ref("Hello Vuejs.de");
</script>
<template>
  <input type="text" v-model="msg" />
</template>
