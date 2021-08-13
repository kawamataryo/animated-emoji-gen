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
        <label class="label">{{ t("labels.text") }}</label>
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
        <label class="label">{{ t("labels.color") }}</label>
        <div class="control">
          <ColorPanel v-model:color="inputColor" :colors="COLORS" />
        </div>
      </div>
    </div>
    <div class="panel-block">
      <div class="field is-fullwidth">
        <label class="label">{{ t("labels.fontFamily") }}</label>
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
        <label class="label">{{ t("labels.fontWeight") }}</label>
        <div class="control">
          <SelectButtons
            v-model:value="inputFontWeight"
            :options="fontWeightOptions"
          />
        </div>
      </div>
    </div>
    <div class="panel-block">
      <div class="field is-fullwidth">
        <label class="label">{{ t("labels.background") }}</label>
        <div class="control">
          <SelectButtons
            v-model:value="inputBackground"
            :options="backgroundOptions"
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
import { useI18n } from "vue-i18n";

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
    backgroundColor: {
      type: String,
      default: "transparent",
    },
  },
  emits: [
    "update:text",
    "update:color",
    "update:fontFamily",
    "update:fontWeight",
    "update:backgroundColor",
  ],
  setup(props, ctx) {
    const { t } = useI18n();

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

    const inputFontFamily = computed({
      get: () => props.fontFamily,
      set: (val) => {
        ctx.emit("update:fontFamily", val);
      },
    });

    const inputFontWeight = computed({
      get: () => props.fontWeight,
      set: (val) => {
        ctx.emit("update:fontWeight", val);
      },
    });

    const inputBackground = computed({
      get: () => props.backgroundColor,
      set: (val) => {
        ctx.emit("update:backgroundColor", val);
      },
    });

    return {
      inputText,
      inputColor,
      COLORS,
      inputFontFamily,
      inputFontWeight,
      inputBackground,
      t,
    };
  },
  computed: {
    backgroundOptions() {
      const { t } = useI18n();
      return [
        {
          label: t("selectButtonsOption.background.transparent"),
          value: "transparent",
        },
        { label: t("selectButtonsOption.background.white"), value: "#fff" },
        { label: t("selectButtonsOption.background.black"), value: "#000" },
      ];
    },
    fontFamilyOptions() {
      const { t } = useI18n();
      return [
        { label: t("selectButtonsOption.fontFamily.serif"), value: "serif" },
        { label: t("selectButtonsOption.fontFamily.sans"), value: "sans" },
      ];
    },
    fontWeightOptions() {
      const { t } = useI18n();
      return [
        { label: t("selectButtonsOption.fontWeight.bold"), value: "bold" },
        { label: t("selectButtonsOption.fontWeight.medium"), value: "medium" },
        { label: t("selectButtonsOption.fontWeight.light"), value: "light" },
      ];
    },
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
