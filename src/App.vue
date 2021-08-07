<template>
  <GitTag />
  <div class="container">
    <h1 class="title is-size-1 has-text-left">Slack Emoji Creator 🎨</h1>
    <div class="columns is-variable is-0-mobile">
      <div class="column is-one-fifth">
        <ParametersForm v-model:text="text" v-model:color="color" />
      </div>
      <div class="column is-four-fifths">
        <FilterGallery
          :text="text"
          :paths="paths"
          :color="color"
          :transforms="transforms"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useSvgPath } from "./composables/useSvgPath";
import ParametersForm from "./components/ParametersForm.vue";
import { COLORS } from "./utils/constants";
import FilterGallery from "./components/FilterGallery.vue";
import GitTag from "./components/GitTag.vue";

const VIEW_SIZE = 128;

export default defineComponent({
  name: "App",
  components: {
    ParametersForm,
    FilterGallery,
    GitTag,
  },
  setup() {
    const { paths, text, transforms } = useSvgPath("Emoji", VIEW_SIZE);
    const color = ref(COLORS[0]);
    const changeColor = (e: { hex: string }) => {
      color.value = e.hex;
    };

    return {
      paths,
      text,
      transforms,
      color,
      changeColor,
    };
  },
});
</script>

<style lang="scss">
.body,
html {
  height: 100%;
}

.body {
  background-color: #333;
  padding-top: 60px;
  background-image: url("/background-image.jpg");
  background-size: cover;
  background-color: rgba(255, 255, 255, 0.8);
  background-blend-mode: color-burn;
}
</style>
