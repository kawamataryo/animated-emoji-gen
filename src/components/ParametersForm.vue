<template>
  <article class="panel has-background-white pb-3">
    <h1 class="panel-heading">
      <span
        ><mark style="color: #1da1f2">E</mark
        ><mark style="color: #2eb67d">m</mark
        ><mark style="color: #e01e5a">o</mark
        ><mark style="color: #ecb22e">ji</mark></span
      >
      generator
    </h1>
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
    <div class="panel-block">
      <div class="field is-fullwidth">
        <label class="label">font family</label>
        <div class="control">
          <SelectButtons
            v-model:value="inputFontFamily"
            :options="fontFamilyOptions"
          />
        </div>
      </div>
    </div>
    <div class="panel-block">
      <div class="field is-fullwidth">
        <label class="label">font weight</label>
        <div class="control">
          <SelectButtons
            v-model:value="inputFontWeight"
            :options="fontWeightOptions"
          />
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
import SelectButtons from "./SelectButtons.vue";

export default defineComponent({
  name: "ParametersForm",
  components: {
    ColorPanel,
    SelectButtons,
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
    fontFamily: {
      type: String,
      default: "",
    },
    fontWeight: {
      type: String,
      default: "",
    },
  },
  emits: [
    "update:text",
    "update:color",
    "update:fontFamily",
    "update:fontWeight",
  ],
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

    const fontFamilyOptions = [
      { label: "serif", value: "serif" },
      { label: "sans", value: "sans" },
    ];

    const inputFontFamily = computed({
      get: () => props.fontFamily,
      set: (val) => {
        ctx.emit("update:fontFamily", val);
      },
    });

    const fontWeightOptions = [
      { label: "bold", value: "bold" },
      { label: "medium", value: "medium" },
      { label: "light", value: "light" },
    ];

    const inputFontWeight = computed({
      get: () => props.fontWeight,
      set: (val) => {
        ctx.emit("update:fontWeight", val);
      },
    });

    return {
      inputText,
      inputColor,
      COLORS,
      fontFamilyOptions,
      inputFontFamily,
      fontWeightOptions,
      inputFontWeight,
    };
  },
});
</script>

<style scoped lang="scss">
.is-fullwidth {
  width: 100%;
}
.panel-heading {
  font-weight: 300;
  > span {
    font-size: 30px;
    font-weight: bold;
  }
  mark {
    background-color: transparent;
  }
}
</style>
