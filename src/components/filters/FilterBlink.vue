<template>
  <svg
    id="FilterWaterDrops"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <rect width="100%" height="100%" fill="#fff" />
    <path
      v-for="(p, i) in paths"
      :key="i"
      stroke="transparent"
      :transform="transforms[i]"
      :fill="color"
      :d="p"
    >
      <animate
        attributeName="fill"
        :from="color"
        to="transparent"
        dur="0.4"
        repeatCount="indefinite"
        calcMode="discrete"
      />
    </path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "FilterBlink",
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
