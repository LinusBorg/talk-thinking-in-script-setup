<script>
export default {
  inheritAttrs: false,
};
</script>
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
  <label>
    {{ title }}
    <input type="text" v-bind="$attrs" v-model="model" />
  </label>
</template>
<style lang="postcss"></style>
