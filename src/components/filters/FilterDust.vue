<template>
  <svg
    id="FilterDust"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <filter
      id="filter-dust"
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
        baseFrequency="0.8 0.8"
        numOctaves="4"
        seed="4"
        stitchTiles="stitch"
        result="turbulence"
      >
        <animate
          attributeName="seed"
          from="1"
          to="100"
          dur="10s"
          repeatCount="indefinite"
        />
      </feTurbulence>
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 -40 10"
        in="turbulence"
        result="colormatrix"
      />
      <feComposite
        in="colormatrix"
        in2="SourceAlpha"
        operator="in"
        result="composite"
      />
      <feTurbulence
        type="turbulence"
        baseFrequency="0.1 0.1"
        numOctaves="1"
        seed="2"
        stitchTiles="stitch"
        result="turbulence1"
      />
      <feDisplacementMap
        in="composite"
        in2="turbulence1"
        scale="20"
        xChannelSelector="R"
        yChannelSelector="B"
        result="displacementMap"
      />
    </filter>
    <rect width="100%" height="100%" fill="#fff" />
    <path
      v-for="(p, i) in paths"
      :key="i"
      :stroke="color"
      stroke-width="1"
      :transform="transforms[i]"
      :fill="color"
      filter="url(#filter-dust)"
      :d="p"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "FilterDust",
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
