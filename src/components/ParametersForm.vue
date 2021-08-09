<template>
  <article class="panel has-background-white">
    <p class="panel-heading">Parameters</p>
    <div class="panel-block">
      <div class="field is-fullwidth">
        <label class="label">text</label>
        <div class="control">
          <textarea
            v-model="inputText"
            rows="2"
            class="textarea"
            placeholder="your emoji"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="panel-block">
      <div class="field is-fullwidth">
        <label class="label">color</label>
        <div class="control">
          <ColorPanel v-model:color="inputColor" :colors="COLORS" />
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { computed } from "vue";
import { COLORS } from "../utils/constants";
import ColorPanel from "./ColorPanel.vue";

export default defineComponent({
  name: "ParametersForm",
  components: {
    ColorPanel,
  },
  props: {
    color: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
  },
  emits: ["update:text", "update:color"],
  setup(props, ctx) {
    const inputText = computed({
      get: () => props.text,
      set: (val) => {
        ctx.emit("update:text", val);
      },
    });

    const inputColor = computed({
      get: () => props.color,
      set: (val) => {
        ctx.emit("update:color", val);
      },
    });

    return {
      inputText,
      inputColor,
      COLORS,
    };
  },
});
</script>

<style scoped lang="scss">
.is-fullwidth {
  width: 100%;
}
</style>
