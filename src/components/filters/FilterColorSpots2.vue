<template>
  <svg
    id="FilterColorSpots2"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <filter
      id="filter-color-spots-2"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="linearRGB"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.02 0.01"
        numOctaves="1"
        seed="2"
        stitchTiles="stitch"
        result="turbulence"
      >
        <animate
          attributeName="seed"
          from="1"
          to="100"
          dur="1s"
          repeatCount="indefinite"
        />
      </feTurbulence>
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 0 1"
        in="turbulence"
        result="colormatrix"
      />
      <feColorMatrix
        type="saturate"
        values="4"
        in="colormatrix"
        result="colormatrix1"
      />
      <feGaussianBlur
        stdDeviation="3 3"
        in="componentTransfer"
        edgeMode="none"
        result="blur"
      />
      <feComponentTransfer in="composite" result="componentTransfer">
        <feFuncR type="table" tableValues="1 0 -1" />
        <feFuncG type="table" tableValues="1 0 1" />
        <feFuncB type="table" tableValues="1 -1 1" />
        <feFuncA type="identity" />
      </feComponentTransfer>
      <feComposite
        in="componentTransfer"
        in2="SourceAlpha"
        operator="in"
        result="composite"
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
      filter="url(#filter-color-spots-2)"
      :d="p"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "FilterColorSpots2",
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
