<script setup>
import { ref, watch } from "vue";
import ChildComponent from "./Comp.vue";

const componentRef = ref();

watch(componentRef, (component) => {
  console.log(component.message);
  console.log("message" in component);
});
</script>

<template>
  <label>
    <ChildComponent ref="componentRef" />
  </label>
</template>
