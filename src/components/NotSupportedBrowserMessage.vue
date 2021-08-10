<template>
  <article class="message is-danger">
    <div class="message-header">
      <p>⚠️ Not supported browser</p>
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
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss"></style>
