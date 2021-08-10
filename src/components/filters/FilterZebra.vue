<template>
  <svg
    id="FilterZebra"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <filter
      id="filter-zebra"
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
        baseFrequency="0.071 0.01"
        numOctaves="2"
        seed="15"
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
0 0 0 70 -12"
        in="turbulence"
        result="colormatrix1"
      />
      <feFlood :flood-color="color" flood-opacity="1" result="flood" />
      <feComposite
        in="flood"
        in2="colormatrix1"
        operator="in"
        result="composite"
      />
      <feComposite
        in="composite"
        in2="SourceGraphic"
        operator="in"
        result="composite1"
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
      filter="url(#filter-zebra)"
      :d="p"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "FilterZebra",
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
