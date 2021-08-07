<template>
  <svg
    id="FilterShadow"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <filter
      id="filter-shadow"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="linearRGB"
    >
      <feOffset dx="16" dy="10" in="SourceAlpha" result="offset">
        <animate
          attributeName="dx"
          from="-20"
          to="20"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="dy"
          from="-20"
          to="20"
          dur="1s"
          repeatCount="indefinite"
        />
      </feOffset>
      <feGaussianBlur stdDeviation="5 5" in="offset" result="blur" />
      <feFlood flood-color="#172841" flood-opacity="0.7" result="flood" />
      <feComposite in="flood" in2="blur" operator="in" result="composite" />
      <feMerge result="merge">
        <feMergeNode in="composite" result="mergeNode" />
        <feMergeNode in="SourceGraphic" result="mergeNode1" />
      </feMerge>
    </filter>
    <rect width="100%" height="100%" fill="#fff" />
    <path
      v-for="(p, i) in paths"
      :key="i"
      :stroke="color"
      stroke-width="1"
      :transform="transforms[i]"
      :fill="color"
      filter="url(#filter-shadow)"
      :d="p"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "FilterShadow",
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
