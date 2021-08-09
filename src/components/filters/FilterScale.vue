<template>
  <svg
    id="FilterScale"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <rect width="100%" height="100%" fill="#fff" />
    <path
      v-for="(p, i) in paths"
      :key="i"
      :stroke="color"
      stroke-width="1"
      :transform="transforms[i]"
      :fill="color"
      :d="p"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="scale"
        from="0.1 0.1"
        :to="scaleParams[i]"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { computed } from "vue";

export default defineComponent({
  name: "FilterScale",
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
    const scaleParams = computed(() => {
      return props.transforms.map((t) => {
        return t.replace(/scale\((.+),\s+(.+)\)/, "$1 $2");
      });
    });
    return {
      scaleParams,
    };
  },
});
</script>

<style scoped lang="scss"></style>
