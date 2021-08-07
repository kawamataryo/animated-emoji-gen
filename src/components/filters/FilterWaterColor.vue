<template>
  <svg
    id="FilterWaterColor"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <filter
      id="filter-water-color"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.05 0.05"
        numOctaves="5"
        seed="1"
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
      <feDiffuseLighting
        surfaceScale="0.5"
        diffuseConstant="3.2"
        lighting-color="#ffffff"
        in="turbulence"
        result="diffuseLighting"
      >
        <feDistantLight azimuth="150" elevation="16" />
      </feDiffuseLighting>
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.011 0.004"
        numOctaves="2"
        seed="3"
        stitchTiles="noStitch"
        result="turbulence1"
      />
      <feColorMatrix
        type="saturate"
        values="3"
        in="turbulence1"
        result="colormatrix"
      />
      <feColorMatrix
        type="matrix"
        values="2 0 0 0 0
0 1.5 0 0 0
0 0 2 0 0
0 0 0 2 0"
        in="colormatrix"
        result="colormatrix1"
      />
      <feBlend
        mode="multiply"
        in="diffuseLighting"
        in2="colormatrix1"
        result="blend"
      />
      <feComposite
        in="blend"
        in2="SourceAlpha"
        operator="in"
        result="composite1"
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
      filter="url(#filter-water-color)"
      :d="p"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "FilterWaterColor",
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
