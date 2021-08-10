<template>
  <div class="grid">
    <div
      v-for="(o, i) in options"
      :key="i"
      class="is-clickable button is-small"
      :class="{ selected: o.value === value }"
      @click="onChange(o.value)"
    >
      {{ o.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

type Options = {
  label: string;
  value: string;
};

export default defineComponent({
  name: "SelectButtons",
  props: {
    value: {
      type: String,
      default: "",
    },
    options: {
      type: Array as PropType<Options[]>,
      default: () => [],
    },
  },
  emits: ["update:value"],
  setup(_, ctx) {
    const onChange = (value: string) => {
      ctx.emit("update:value", value);
    };
    return {
      onChange,
    };
  },
});
</script>

<style scoped lang="scss">
.selected {
  background-color: #ededed;
  &:hover {
    color: #fff;
  }
}

.grid {
  width: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  grid-auto-rows: minmax(25px, auto);

  > div {
    transition: background-color ease 0.1s;
    border-radius: 4px !important;
    &:not(.selected) {
      &:hover {
        background-color: rgba(#4a154b, 0.1);
      }
    }
  }
}
</style>
