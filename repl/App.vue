<script setup lang="ts">
import { Repl, ReplStore } from "@vue/repl";
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

// example && store.setFiles(example.files, example.App);
</script>

<template>
  <Repl :store="store" style="min-height: 450px" />
</template>
