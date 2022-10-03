<script setup lang="ts">
import { Repl, ReplStore, SFCOptions } from "@vue/repl";
import "@vue/repl/style.css";

import examples from "./examples";

// const location = useBrowserLocation();
const query = new URLSearchParams(window.location.search!);
// retrieve some configuration options from the URL
const exampleKey = query.get("example")! as keyof typeof examples | null;
const example = (exampleKey && examples[exampleKey]) ?? "";

const store = new ReplStore({
  // initialize repl with previously serialized state
  serializedState: btoa(JSON.stringify(example)) || undefined,

  // starts on a different tab on the output pane if the URL has a outputMode query
  // and default to the "preview" tab
  outputMode: query.get("outputMode") || "preview",

  // specify the default URL to import Vue runtime from in the sandbox
  // default is the CDN link from unpkg.com with version matching Vue's version
  // from peerDependency
  // defaultVueRuntimeURL: "cdn link to vue.runtime.esm-browser.js",
});

store.setImportMap({
  imports: {
    vue: "https://unpkg.com/vue/dist/vue.runtime.esm-browser.js",
    "@vueuse/core": "https://unpkg.com/@vueuse/core@9.2.0/index.mjs",
    "@vueuse/shared": "https://unpkg.com/@vueuse/shared@9.2.0/index.mjs",
    "vue-demi": "https://unpkg.com/vue-demi@0.13.11/lib/index.mjs",
  },
});

const sfcOptions: SFCOptions = {
  script: {
    inlineTemplate: !!query.has("prod"),
    reactivityTransform: true,
  },
};

// example && store.setFiles(example.files, example.App);
</script>

<template>
  <Repl
    :store="store"
    :sfcOptions="sfcOptions"
    style="height: 470px; font-size: 10px"
  />
</template>

<style>
.vue-repl .file {
  font-size: 10px;
}
.vue-repl .tab-buttons span {
  font-size: 10px;
}

.vue-repl .CodeMirror {
  line-height: 1.8;
}
</style>
