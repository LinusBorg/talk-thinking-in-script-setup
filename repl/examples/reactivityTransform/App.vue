<script setup lang="ts">
import ChildComponent from "./Comp.vue";
import { ref, computed } from "vue";

const message = ref("Hello Vue.js");
const loudMessage = computed(() => message.value.toUpperCase());
</script>

<template>
  <ChildComponent v-model="message" />
  <br />
  <h1>{{ loudMessage }}</h1>
</template>
<style lang="postcss"></style>
