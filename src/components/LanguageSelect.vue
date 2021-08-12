<template>
  <div>
    <div class="buttons has-addons">
      <button
        class="button is-small"
        :class="{ selected: modelValue === 'en' }"
        @click="changeLocale('en')"
      >
        <TwemojiFlagForFlagUnitedStates />
        <span class="ml-1">{{ t("language.en") }} </span>
      </button>
      <button
        class="button is-small"
        :class="{ selected: modelValue === 'ja' }"
        @click="changeLocale('ja')"
      >
        <TwemojiFlagForFlagJapan /><span class="ml-1">{{
          t("language.ja")
        }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import TwemojiFlagForFlagJapan from "./icons/TwemojiFlagForFlagJapan.vue";
import TwemojiFlagForFlagUnitedStates from "./icons/TwemojiFlagForFlagUnitedStates.vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "LanguageSelect",
  components: {
    TwemojiFlagForFlagJapan,
    TwemojiFlagForFlagUnitedStates,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(_, ctx) {
    const { t } = useI18n();
    const changeLocale = (locale: string) => {
      ctx.emit("update:modelValue", locale);
    };
    return {
      t,
      changeLocale,
    };
  },
});
</script>

<style lang="scss" scoped>
.selected {
  background-color: #ededed;
}
</style>
