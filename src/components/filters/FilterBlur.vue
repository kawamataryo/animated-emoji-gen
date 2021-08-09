<template>
  <svg
    id="FilterBlur"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <filter
      id="filter-blur"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="linearRGB"
    >
      <feGaussianBlur
        id="hue1feGaussianBlur"
        in="SourceGraphic"
        stdDeviation="0 0"
      >
        <animate
          attributeName="stdDeviation"
          from="0 0"
          to="25 0"
          dur="1s"
          repeatCount="indefinite"
        />
      </feGaussianBlur>
    </filter>
    <rect width="100%" height="100%" fill="#fff" />
    <path
      v-for="(p, i) in paths"
      :key="i"
      :stroke="color"
      stroke-width="5"
      stroke-dasharray="1237"
      :transform="transforms[i]"
      :fill="color"
      filter="url(#filter-blur)"
      :d="p"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "FilterBlur",
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
