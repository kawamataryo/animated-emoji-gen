<template>
  <svg
    id="FilterDancingStroke"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <defs>
      <filter
        id="filter-dance-stroke"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
        color-interpolation-filters="linearRGB"
      >
        <feMorphology
          operator="dilate"
          radius="4 4"
          in="SourceAlpha"
          result="morphology"
        />
        <feFlood :flood-color="color" flood-opacity="1" result="flood" />
        <feComposite
          in="flood"
          in2="morphology"
          operator="in"
          result="composite"
        />
        <feComposite
          in="composite"
          in2="SourceAlpha"
          operator="out"
          result="composite1"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01 0.02"
          numOctaves="1"
          seed="0"
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
        <feDisplacementMap
          in="composite1"
          in2="turbulence"
          scale="30"
          xChannelSelector="A"
          yChannelSelector="A"
          result="displacementMap"
        />
        <feMerge result="merge">
          <feMergeNode in="SourceGraphic" result="mergeNode" />
          <feMergeNode in="displacementMap" result="mergeNode1" />
        </feMerge>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="#fff" />
    <path
      v-for="(p, i) in paths"
      :key="i"
      stroke-width="1"
      :stroke="color"
      :transform="transforms[i]"
      :fill="color"
      filter="url(#filter-dance-stroke)"
      :d="p"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "FilterDancingStroke",
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
