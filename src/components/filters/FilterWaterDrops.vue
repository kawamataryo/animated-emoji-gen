<template>
  <svg
    id="FilterWaterDrops"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <filter
      id="filter-water-drops"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feTurbulence
        type="turbulence"
        baseFrequency="0.05 0.05"
        numOctaves="1"
        seed="25"
        stitchTiles="stitch"
        result="turbulence"
      >
        <animate
          attributeName="seed"
          from="1"
          to="60"
          dur="1s"
          repeatCount="indefinite"
        />
      </feTurbulence>
      <feComposite
        in="turbulence"
        in2="SourceGraphic"
        operator="in"
        result="composite"
      />
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 50 -2"
        in="composite"
        result="colormatrix"
      />
      <feComposite
        in="SourceGraphic"
        in2="colormatrix"
        operator="in"
        result="composite1"
      />
      <feGaussianBlur
        stdDeviation="3 3"
        in="composite1"
        edgeMode="none"
        result="blur"
      />
      <feSpecularLighting
        surfaceScale="2"
        specularConstant="1"
        specularExponent="20"
        lighting-color="#fffffd"
        in="blur"
        result="specularLighting"
      >
        <feDistantLight azimuth="-90" elevation="150" />
      </feSpecularLighting>
      <feSpecularLighting
        surfaceScale="2"
        specularConstant="1"
        specularExponent="20"
        lighting-color="#cae1fe"
        in="blur"
        result="specularLighting1"
      >
        <feDistantLight azimuth="90" elevation="150" />
      </feSpecularLighting>
      <feSpecularLighting
        surfaceScale="7"
        specularConstant="1"
        specularExponent="35"
        lighting-color="#fcfeff"
        in="blur"
        result="specularLighting2"
      >
        <fePointLight x="150" y="50" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specularLighting"
        in2="composite1"
        operator="in"
        result="composite2"
      />
      <feComposite
        in="specularLighting2"
        in2="composite1"
        operator="in"
        result="composite3"
      />
      <feComposite
        in="specularLighting1"
        in2="composite1"
        operator="in"
        result="composite4"
      />
      <feBlend
        mode="multiply"
        in="composite4"
        in2="SourceGraphic"
        result="blend"
      />
      <feBlend mode="color-dodge" in="composite2" in2="blend" result="blend1" />
      <feBlend mode="soft-light" in="composite3" in2="blend1" result="blend2" />
    </filter>
    <rect width="100%" height="100%" fill="#fff" />
    <path
      v-for="(p, i) in paths"
      :key="i"
      :stroke="color"
      stroke-width="1"
      :transform="transforms[i]"
      :fill="color"
      filter="url(#filter-water-drops)"
      :d="p"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "FilterWaterDrops",
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
