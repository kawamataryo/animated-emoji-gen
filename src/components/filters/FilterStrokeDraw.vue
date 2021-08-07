<template>
  <svg
    id="FilterStrokeDraw"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <path
      v-for="(p, i) in paths"
      :key="i"
      :stroke="color"
      stroke-width="5"
      stroke-dasharray="1237"
      :transform="transforms[i]"
      fill="transparent"
      :d="p"
    >
      <rect width="100%" height="100%" fill="#fff" />
      <animate
        attributeName="stroke-dashoffset"
        from="1237px"
        to="0"
        dur="3s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "FilterStrokeDraw",
  props: {
    transforms: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    paths: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    color: {
      type: String,
      default: "",
    },
    viewBoxSize: {
      type: Number,
      default: 128,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss"></style>
