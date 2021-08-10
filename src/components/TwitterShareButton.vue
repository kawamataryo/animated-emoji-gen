<template>
  <a
    href="https://twitter.com/share?url=https%3A%2F%2Fwww.animated-emoji-gen.com%2F&text=Animated%20custom%20emoji%20generator&hashtags=animated_emoji_gen"
    target="_blank"
    class="share-button"
    ><i><MdiTwitter /></i>Tweet</a
  >
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import MdiTwitter from "./icons/MdiTwitter.vue";

export default defineComponent({
  name: "TwitterShareButton",
  components: {
    MdiTwitter,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.share-button {
  background-color: #1da1f2;
  color: #fff;
  padding: 0 10px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  max-width: 80px;

  > i {
    margin-right: 4px !important;
    margin-top: 4px;
  }
}
</style>
