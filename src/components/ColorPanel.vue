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
  <label class="label is-size-7"
    >custom
    <input
      type="color"
      class="input-color"
      :value="color"
      @input="changeInputColor"
    />
  </label>
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
    const changeInputColor = (e: any) => {
      changeColor(e.target.value);
    };

    const changeColor = (color: string) => {
      ctx.emit("update:color", color);
    };
    return {
      changeColor,
      changeInputColor,
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

.input-color {
  margin-top: 10px;
}
</style>
