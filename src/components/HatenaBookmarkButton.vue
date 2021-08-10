<template>
  <a
    href="https://b.hatena.ne.jp/entry/"
    class="hatena-bookmark-button"
    data-hatena-bookmark-layout="basic-label"
    data-hatena-bookmark-lang="en"
    title="このエントリーをはてなブックマークに追加"
    ><img
      src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
      alt="このエントリーをはてなブックマークに追加"
      width="20"
      height="20"
      style="border: none"
  /></a>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "HatenaBookmarkButton",
  setup() {
    return {};
  },
});
</script>
