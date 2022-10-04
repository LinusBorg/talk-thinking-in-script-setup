---
theme: vuetiful
layout: cover
cover: alt
info: |
  ## Explaining script-setup implementation and usage tips
# persist drawings in exports and build
# download: '/slides-export.pdf'
drawings:
  persist: false
---

# What goes on in &lt;script setup&gt;?
A look under the hood

---
layout: big-points
---

* Why does `<script setup>` exist?
* How does it work under the hood?
* How to I structure my code optimally?

---
layout: section
---

# Why we got `<script setup>`

---
layout: full-image
image: GokuVsVegeta
title: 'Clash of the APIs'
---

<div class="flex h-full justify-around items-end w-full text-shadow-lg text-pink-400 font-bold ">
  <div class="pb-12 text-center backdrop-filter bg-transparent backdrop-blur-10">
    <h2 class="!text-7xl">Options <br> API</h2>
  </div>
  <div class="pb-12 text-center backdrop-filter bg-transparent backdrop-blur-10">
    <h2 class="!text-7xl">Composition <br> API</h2>
  </div>
</div>

---
cols: 1-1
title: 'Where we started: Options API'
titleRow: true
---

```html{all|5,10}
<script>
import ChildComponent from './Child.vue'

export defineComponent({
  data() {
    return {
      msg: 'Hello Vue.js Germany!'
    }
  },
  methods: {
    handler() { doSomething() }
  },
  components: {
    ChildComponent
  }
})
</script>
<template>
  <ChildComponent :msg="msg" @someEvent="handler" />
</template>
```

::right::

### Pros

* Exists more or less since Vue 1
* Approachable, easy to pick up
* Everything has "its place"

### Cons

* Sharing behaviour requires mixins
* Mixins have lots of issues
* Code is all over the place in big components

---
cols: 1-1
titleRow: true
title: 'The new way: Composition API'
---

```html{all|2,7,8,10,11}
<script>
import { ref } from 'vue'
import ChildComponent from './Child.vue'

export defineComponent({
  setup() {
    const msg = ref('Hello Vue.js Germany!')
    function handler() { doSomething() }
    return {
      msg,
      handler
    }
  },
  components: {
    ChildComponent
  }
})
</script>
<template>
  <ChildComponent :msg="msg" @someEvent="handler" />
</template>
```

::right::

### Pros

* Allows colocating code by feature
* Great behavior sharing with simple functions (composables)
### Cons

* Lack of discipline can result in spaghetti code
* new APIs to pick up
* indentation and big return objects

---
cols: '1-1'
titleRow: true
title: 'From setup() to <script setup>'
---

```html {all|2-3,7-12,18-20|2,3,7-8,18-20}
<script>
import { ref } from 'vue'
import ChildComponent from './Child.vue'

export defineComponent({
  setup() {
    const msg = ref('Hello Vue.js Germany!')
    function handler() { doSomething() }
    return {
      msg,
      handler
    }
  },
  components: {
    ChildComponent
  }
})
</script>
<template>
  <ChildComponent :msg="msg" @someEvent="handler" />
</template>
```

::right::

<v-click>

```html
<script setup>
import {ref } from 'vue'
import ChildComponent from './Child.vue'

const msg = ref('Hello Vue.js Germany!')
</script>
<template>
  <ChildComponent :msg="msg" />
</template>
```

</v-click>

<v-click>

* no deep nesting/indentation
* composition API code right on the first level
* no setup return value
* Components must not be registered
* Imports and top-level variables available in template

</v-click>

<h2 v-click class="text-2xl mt-4">Available in Vue <code>2.7</code>!</h2>

---
cols: '1-1'
titleRow: false
title: Vue vs. Svelte style
---

## Vue <code>&lt;script setup&gt;</code>

```html
<script setup>
import {ref } from 'vue'
import ChildComponent from './Child.vue'

const msg = ref('Hello Vue.js Germany!')
</script>
<template>
  <ChildComponent :msg="msg" />
</template>
```

::right::

<v-click>

## Svelte

```html
<script>
  import ChildComponent from './Child.svelte'

let msg = 'Hello Vue.js Germany!'
</script>

<ChildComponent msg={msg} />
```

</v-click>

<iframe v-click class="mt-12" src="https://giphy.com/embed/26DMTEijJDudzovvO" width="320" frameBorder="0" allowFullScreen></iframe>

---
layout: section
---

# What goes on under the hood?

---
title: 'Example 1: Basic Compilation'
layout: vue-repl
example: Simple
prod: true
outputMode: js
---

---
layout: quote
author: smart people in the audience
---

# but ... what about props?

---
cols: '1-1'
title: 'Compiler Hints: defineProps() / defineEmits()'
titleRow: true
---

```html{all|6-9|10|11-15|6-15}
<script>
import { defineComponent } from 'vue'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  props: {
    title: String,
    modelValue: String,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = useVModel(props, 'modelValue', emit)
    return {
      model
    }
  }
})
</script>
<template>
  <ChildComponent :title="title" v-model="model" />
</template>

```

::right::

<v-click at="4">

```html{all|4-7|9|11|all}
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
```

</v-click>

<v-click>
  <p>These are "compiler hints", they disappear during compilations</p>
</v-click>

---
title: 'Example 2: Compiler Hints'
layout: vue-repl
example: CompilerHints
prod: true
outputMode: js
---

---
cols: '1-1'
title: Accessing Slots & attrs
titleRow: true
---

```html{all|5}
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, { slots, attrs }) {
    const title = computed(() => slots.default ?? 'Default Title')
    const id = computed(
     () => attrs.id ?? 'myid-' + Math.round((Math.random() * 10000))
    )
    
    return { 
      title,
      id,
    }
  }
})
</script>
<template>
  <ChildComponent :title="title" :id="id">
    <slot />
  </ChildComponent>
</template>
```

::right::

<v-click>

```html{all|2,4,5}
<script setup>
import { useSlots, useAttrs } from "vue";

const slots = useSlots()
const attrs = useAttrs()

const title = computed(() => slots.default ?? 'Default Title')
const id = computed(
  () => attrs.id ?? 'myid-' + Math.round((Math.random() * 10000))
)
</script>
<template>
  <ChildComponent :title="title" :id="id">
    <slot />
  </ChildComponent>
</template>
```

</v-click>

<p v-click>These are runtime composables, not compiler hints</p>


---
cols: '1-1'
titleRow: true
title: 'Closed by default'
clicks: 3
---

* `<script setup>` does not expose its setup state on the instance
* It can't be accessed by i.e. the parent through a template ref

<template v-if="$slidev.nav.clicks >= 3">
  <p class="block !mt-8 border-bottom"><code>defineExpose()</code> allows to declare exposed state</p>

* Allows authors to declare truly internal state
* Prevents users from accidentally using internal state
</template>


::right::

<template v-if="$slidev.nav.clicks >= 1 && $slidev.nav.clicks < 3 ">

```html{all|5,8,12}
<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
});

const message = ref('')

</script>
<template>
  <ChildComponent :title="title" v-model="message" />
</template>
```
</template>

<v-click at="3">

```html{5,8,10-12,16}
<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
});

const message = ref('')

defineExpose({
  message,
})

</script>
<template>
  <ChildComponent :title="title" v-model="message" />
</template>
```
</v-click>

---
layout: vue-repl
example: expose
prod: true
title: 'Example 3: Closed by Default'
---

---
layout: big-points
---
# A place for everything else?


<style>
.slidev-vclick-target {
  transition: all 500ms ease;
}

[data-xzibit].slidev-vclick-hidden {
  @apply -bottom-full
}
</style>
* more exotic options like `inheritAttrs: false`?
* helpers?
* exports?

<h2 v-click class="!text-6xl mt-12 font-bold">Another script block!</h2>

<img v-after src="/xzibit.jpg" data-xzibit class="w-52 block mx-auto -bottom-6 absolute left-[50%]">

---
layout: vue-repl
example: secondScript
title: "Example 4: Second Script Block"
titleRow: false
prod: true
---

---
layout: section
---

# Improvements up ahead

<!--  
* We have a compiler
* so we can do more crazy cool things
* improve TS support
* get rid of ref's .value
* reactive props destructuring
-->

---
layout: big-points
title: Improvements up ahead
titleRow: true
---


* Type-based props & events
* Reactivity Transform

---
layout: big-points
title: Takeaways
---

1. `<script setup>` is **not** a new third API
2. It's a more ergonomic way to use Composition API
3. It's more performant
4. Further cpomiler-based optimizations in the future

---
layout: outro
preload: false
title: Outro
twitter: '@Linus_Borg'
repository: 'github.com/linusborg'
# hostedSlides: ''
---

<div class="absolute left-12 top-[200px] right-12 text-center text-light-600">
  <p class="text-4xl !leading-[1.5em]">You made it! We're done!</p>
  <p class="text-4xl !leading-[1.5em]">Questions?</p>
</div>
<div 
  class="absolute bottom-6 right-6 w-[200px] p-3 bg-white light:bg-vblue rounded-lg bg-opacity-50 mr-0 light:bg-opacity-40 mr-0 text-vblue light:text-white"
  v-motion
  :initial="{ x: 250 }"
  :enter="{ x: 0, transition: { delay: 500 } }"
  >

<a href="https://www.sli.dev" target="blank" rel="noopener">
  <img src="/slidev-logo.png" alt="Slidev Logo" class="w-36">
</a>

<p class="text-sm !mt-0">This talk was built with Slidev</p>

<a class="text-sm" href="https://sli.dev" target="_blank" rel="noopener">https://sli.dev</a>

</div>
---
layout: section
---

# How to structure your code

---
layout: big-points
title: 'Structure guidelines'
---

1. Start with imports, props, emits
2. Then call composables to setup core behaviors
3. Comments are your friend.
4. Extract into functions to cut down on number of lines.

<p v-click>Generally, follow your gut</p>



---
layout: big-points
title: Links Collection
---

<div class="grid grid-rows-3 grid-cols-[150px,1fr] gap-y-8 gap-x-2">
  <span>Docs</span>
  <span>
    <a href="https://vue-bridge.docs.netlify.app" target="blank" rel="noopener">
      https://vue-bridge.docs.netlify.app
    </a>
  </span>
  <span>Repo</span>
  <span>
    <a href="https://github.com/vue-bridge/vue-bridge" target="blank" rel="noopener">
      https://github.com/vue-bridge/vue-bridge
    </a>
  </span>
  <span>Template</span>
  <span>
    <a href="https://github.com/vue-bridge/template-monorepo" target="blank" rel="noopener">
      https://github.com/vue-bridge/template-monorepo
    </a>
  </span>
  <span>Twitter</span>
  <span>
    <a href="https://twitter.com/VueBridge" target="blank" rel="noopener">
      https://twitter.com/VueBridge
    </a>
  </span>
</div>
