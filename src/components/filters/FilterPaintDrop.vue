<template>
  <svg
    id="FilterPaintDrop"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <filter
      id="filter-paint-drop"
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
        baseFrequency="0.07 0.04"
        numOctaves="1"
        seed="4"
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
0 0 0 40 -3"
        in="turbulence"
        result="colormatrix"
      />
      <feGaussianBlur
        stdDeviation="2 7"
        in="colormatrix"
        edgeMode="none"
        result="blur"
      />
      <feComposite
        in="blur"
        in2="SourceAlpha"
        operator="in"
        result="composite"
      />
      <feSpecularLighting
        surfaceScale="25"
        specularConstant="1"
        specularExponent="20"
        lighting-color="#ffffff"
        in="composite"
        result="specularLighting"
      >
        <feDistantLight azimuth="45" elevation="150" />
      </feSpecularLighting>
      <feComposite
        in="specularLighting"
        in2="colormatrix"
        operator="in"
        result="composite1"
      />
      <feComposite
        in="composite1"
        in2="SourceGraphic"
        operator="in"
        result="composite2"
      />
      <feFlood :flood-color="color" flood-opacity="1" result="flood" />
      <feComposite
        in="flood"
        in2="colormatrix"
        operator="in"
        result="composite3"
      />
      <feComposite
        in="composite3"
        in2="SourceGraphic"
        operator="in"
        result="composite4"
      />
      <feMerge result="merge">
        <feMergeNode in="composite4" />
        <feMergeNode in="composite2" />
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
      filter="url(#filter-paint-drop)"
      :d="p"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "FilterPaintDrop",
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
