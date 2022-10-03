<script setup>
import ChildComponent from "./Comp.vue";
import { ref } from "vue";

const name = ref("");
</script>
<template>
  <ChildComponent title="First Name" v-model="name" />
</template>
