<script setup lang="ts">
import { useVModel } from "@vueuse/core";
const props = defineProps<{
  modelValue: string;
}>();

const emits = defineEmits<{
  (e: "modelValue", v: string): void;
}>();

const model = useVModel(props, "modelValue", emits);
</script>

<template>
  <label> Message: <input type="text" v-model="model" /> </label>
</template>
<style lang="postcss"></style>
