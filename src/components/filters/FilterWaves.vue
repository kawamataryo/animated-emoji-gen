<template>
  <svg
    id="FilterWaves"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <filter
      id="filter-wave"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="linearRGB"
    >
      <feTurbulence
        type="turbulence"
        baseFrequency="0.01 0.05"
        numOctaves="2"
        seed="2"
        stitchTiles="noStitch"
        result="turbulence"
      >
        <animate
          attributeName="seed"
          from="1"
          to="80"
          dur="1s"
          repeatCount="indefinite"
        />
      </feTurbulence>
      <feDisplacementMap
        in="SourceGraphic"
        in2="turbulence"
        scale="18"
        xChannelSelector="G"
        yChannelSelector="A"
        result="displacementMap"
      />
    </filter>
    <rect width="100%" height="100%" :fill="backgroundColor" />
    <path
      v-for="(p, i) in paths"
      :key="i"
      :stroke="color"
      stroke-width="1"
      :transform="transforms[i]"
      :fill="color"
      filter="url(#filter-wave)"
      :d="p"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "FilterWaves",
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
    backgroundColor: {
      type: String,
      default: "transparent",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss"></style>
