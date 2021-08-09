<template>
  <GitTag />
  <div class="container">
    <div class="columns is-variable is-0-mobile">
      <div class="column is-one-fifth">
        <ParametersForm
          v-model:text="text"
          v-model:color="color"
          v-model:fontFamily="fontType.family"
          v-model:fontWeight="fontType.weight"
        />
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
  <Footer />
  <transition appear>
    <Loading v-if="loading" />
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useSvgPath } from "./composables/useSvgPath";
import ParametersForm from "./components/ParametersForm.vue";
import { COLORS } from "./utils/constants";
import FilterGallery from "./components/FilterGallery.vue";
import GitTag from "./components/GitTag.vue";
import Footer from "./components/Footer.vue";
import Loading from "./components/Loading.vue";

const VIEW_SIZE = 128;

export default defineComponent({
  name: "App",
  components: {
    Loading,
    ParametersForm,
    FilterGallery,
    GitTag,
    Footer,
  },
  setup() {
    const { paths, text, transforms, fontType, loading } = useSvgPath(
      "Emoji",
      VIEW_SIZE
    );
    const color = ref(COLORS[0]);

    return {
      paths,
      text,
      transforms,
      color,
      fontType,
      loading,
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
  background-color: rgba(255, 255, 255, 0.8);
  background-blend-mode: lighten;
  background-position: center 0;
  background-size: cover;
  position: relative;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
