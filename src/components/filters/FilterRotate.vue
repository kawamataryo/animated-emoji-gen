<template>
  <svg
    id="FilterRotate"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    :width="viewBoxSize"
    :height="viewBoxSize"
  >
    <rect width="100%" height="100%" :fill="backgroundColor" />
    <path
      v-for="(p, i) in paths"
      :key="i"
      :stroke="color"
      stroke-width="1"
      :fill="color"
      :d="p"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="scale"
        :from="scaleParams[i]"
        :to="scaleParams[i]"
        dur="1s"
        additive="sum"
        repeatCount="indefinite"
      />
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        to="0 120 120"
        from="360 120 120"
        dur="1s"
        additive="sum"
        repeatCount="indefinite"
      />
    </path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { computed } from "vue";

export default defineComponent({
  name: "FilterRotate",
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
