<script setup>
import { useVModel } from "@vueuse/core";

const props = defineProps({
  title: String,
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const model = useVModel(props, "modelValue", emit);
</script>
<template>
  <ChildComponent :title="title" v-model="model" />
</template>
