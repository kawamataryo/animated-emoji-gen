<template>
  <article class="message is-warning">
    <div class="message-header">
      <p>⚠️ {{ t("message.supportBrowserWarningTitle") }}</p>
    </div>
    <div class="message-body">
      {{ t("message.supportBrowserWarningMessage") }}
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "NotSupportMessage",
  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>

<style scoped lang="scss"></style>
