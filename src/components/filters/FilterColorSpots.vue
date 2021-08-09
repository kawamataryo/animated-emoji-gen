<template>
  <svg
    id="FilterColorSpots"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <defs>
      <filter
        id="filter-color-spots"
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
          baseFrequency="0.015 0.015"
          numOctaves="3"
          seed="8"
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
        <feMorphology
          operator="dilate"
          radius="35 35"
          in="turbulence"
          result="morphology"
        />
        <feColorMatrix
          type="matrix"
          :values="colorMatrix"
          in="morphology"
          result="colormatrix"
        />
        <feColorMatrix
          type="saturate"
          values="10"
          in="colormatrix"
          result="colormatrix1"
        />
        <feComposite
          in="colormatrix1"
          in2="SourceAlpha"
          operator="in"
          result="composite"
        />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="#fff" />
    <path
      v-for="(p, i) in paths"
      :key="i"
      :stroke="color"
      stroke-width="1"
      :transform="transforms[i]"
      :fill="color"
      filter="url(#filter-color-spots)"
      :d="p"
    ></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { computed } from "vue";
import hexRgb from "hex-rgb";
import { hex2colorMatrix } from "../../utils/hex2colorMatrix";

export default defineComponent({
  name: "FilterColorSpots",
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
  setup(props) {
    const colorMatrix = computed(() =>
      hex2colorMatrix(props.color, "0 0 0 10 0")
    );
    return {
      colorMatrix,
    };
  },
});
</script>

<style scoped lang="scss"></style>
