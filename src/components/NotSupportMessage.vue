<template>
  <article class="message is-warning">
    <div class="message-header">
      <p>⚠️ Your browser does not support</p>
    </div>
    <div class="message-body">
      Sorry. This app only supports the latest Chrome browser. Please try again
      with Chrome browser.
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "NotSupportMessage",
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss"></style>
