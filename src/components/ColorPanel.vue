<template>
  <div class="grid">
    <div
      v-for="(c, i) in colors"
      :key="i"
      class="is-clickable"
      :style="`background-color: ${c}`"
      :class="{ selected: c === color }"
      @click="changeColor(c)"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  props: {
    color: {
      type: String,
      default: "",
    },
    colors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ["update:color"],
  setup(_, ctx) {
    const changeColor = (color: string) => {
      ctx.emit("update:color", color);
    };
    return {
      changeColor,
    };
  },
});
</script>

<style scoped lang="scss">
.selected {
  box-shadow: 0 0 5px gray;
}

.grid {
  width: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(25px, 1fr));
  grid-auto-rows: minmax(25px, auto);

  > div {
    &:hover {
      opacity: 0.8;
    }
    border-radius: 4px;
  }
}
</style>
