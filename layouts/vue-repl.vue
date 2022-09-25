<script setup>
import Default from "slidev-theme-vuetiful/layouts/default.vue";
import { default as _props } from "slidev-theme-vuetiful/utils/props";
import pick from "lodash-es/pick";
import { computed } from "vue";

const props = defineProps({
  ..._props,
  example: {
    type: String,
    required: true,
  },
  outputMode: {
    type: String,
    default: "preview",
  },
  prod: {
    type: Boolean,
  },
  href: {
    type: String,
    default: import.meta.env.DEV ? "http://localhost:5173" : "/repl/index.html",
  },
});

const DefaultProps = computed(() => pick(props, Object.keys(_props)));

const src = () =>
  `${props.href}?example=${props.example}&outputMode=${props.outputMode}${
    props.prod ? "&prod" : ""
  }`;
</script>
<template>
  <Default v-bind="DefaultProps">
    <iframe
      :src="src()"
      class="w-full h-full overflow-y-scroll"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      width="100%"
      height="100%"
      scrolling="auto"
      data-vue-repl
    >
    </iframe>
  </Default>
</template>
<style lang="postcss"></style>
