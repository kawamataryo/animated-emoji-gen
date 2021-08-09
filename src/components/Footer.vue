<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        © 2021
        <a href="https://github.com/kawamataryo" target="_blank"
          >Ryo Kawamata</a
        >
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Footer",
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.footer {
  background-color: transparent;
}
</style>
