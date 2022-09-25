---
theme: vuetiful
layout: cover
info: |
  ## Bridging the Gap - Building cross-compatible Vue Components with confidence
  Presentation slides for Vuejs Amsterdam, June 2nd-3rd 2022.
# persist drawings in exports and build
# download: '/slides-export.pdf'
drawings:
  persist: false
---

# The right perspective for &lt;script setup&gt;

---
layout: full-image
image: GokuVsVegeta
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

<iframe 
  src="http://localhost:5173?example=Simple"
  class="w-full h-full overflow-y-scroll"
  frameborder="0" 
  marginheight="0" 
  marginwidth="0"
  width="100%" 
  height="100%" 
  scrolling="auto"
>
</iframe>

---

# Where we started: Options API


```html
<script>
import ChildComponent from './Child.vue'

export defineComponent({
  data() {
    return {
      msg: 'Hello Vue.js Germany!'
    }
  },
  components: {
    ChildComponent
  }
})
</script>
<template>
  <ChildComponent :msg="msg" />
</template>
```

---

# The new way: Composition API

```html
<script>
import { ref } from 'vue'
import ChildComponent from './Child.vue'

export defineComponent({
  setup() {
    const msg = ref('Hello Vue.js Germany!')
    return {
      msg,
    }
  },
  components: {
    ChildComponent
  }
})
</script>
<template>
  <ChildComponent :msg="msg" />
</template>
```
---
cols: '1-1'
titleRow: true
title: 'Comparison: setup() vs <script setup>'
---

```html {all|2-3,7-10,18-20} 
<script>
import {ref } from 'vue'
import ChildComponent from './Child.vue'

export defineComponent({
  setup() {
    const msg = ref('Hello Vue.js Germany!')
    
    return {
      msg
    }
  },
  components: {
    ChildComponent
  }
})
</script>
<template>
  <ChildComponent :msg="msg" />
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

---
cols: '1-1'
titleRow: false
clicks: 1
---

## Svelte

```html
<script>
import ChildComponent from './Child.svelte'

let msg = 'Hello Vue.js Germany!'
</script>

<ChildComponent msg={msg} />
```

::right::

## Vue <code>&lt;script setup&gt;</code>

<template v-if="$slidev.nav.clicks === 0">

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

</template>
<template v-else>

```html
<script setup>
import ChildComponent from './Child.vue'

const msg = $ref('Hello Vue.js Germany!')
</script>
<template>
  <ChildComponent :msg="msg" />
</template>
```

</template>
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