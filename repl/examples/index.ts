import Simple from "./simple/App.vue?raw";
import CompilerHints from "./compilerHints/App.vue?raw";
import ChildComponent from "./compilerHints/Comp.vue?raw";
import secondScript from "./secondScript";
import expose from "./expose";
import reactivityTransform from "./reactivityTransform";
export default {
  Simple: {
    "App.vue": Simple,
  },
  CompilerHints: {
    "App.vue": CompilerHints,
    "Comp.vue": ChildComponent,
  },
  secondScript,
  expose,
  reactivityTransform,
};
