<template>
  <div class="columns is-variable is-0-mobile">
    <div class="column is-one-fifth">
      <ParametersForm
        v-model:text="text"
        v-model:color="color"
        v-model:fontFamily="fontType.family"
        v-model:fontWeight="fontType.weight"
        v-model:backgroundColor="backgroundColor"
      />
      <div class="share-buttons">
        <TwitterShareButton />
        <HatenaBookmarkButton />
      </div>
    </div>
    <div class="column is-four-fifths">
      <FilterGallery
        :text="text"
        :paths="paths"
        :color="color"
        :background-color="backgroundColor"
        :transforms="transforms"
      />
    </div>
  </div>
  <transition appear>
    <Loading v-if="loading" />
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import ParametersForm from "../components/ParametersForm.vue";
import { COLORS } from "../utils/constants";
import FilterGallery from "../components/FilterGallery.vue";
import Loading from "../components/Loading.vue";
import TwitterShareButton from "../components/TwitterShareButton.vue";
import { useGenerateFontPath } from "../composables/useGenerateFontPath";
import HatenaBookmarkButton from "../components/HatenaBookmarkButton.vue";
import { useI18n } from "vue-i18n";

const VIEW_SIZE = 128;

export default defineComponent({
  name: "MainPage",
  components: {
    Loading,
    ParametersForm,
    FilterGallery,
    TwitterShareButton,
    HatenaBookmarkButton,
  },
  setup() {
    const { paths, text, transforms, fontType, loading, loadFonts } =
      useGenerateFontPath("Emoji", VIEW_SIZE);
    const color = ref(COLORS[0]);
    const backgroundColor = ref("transparent");

    const { locale } = useI18n();

    watch(
      locale,
      async (l) => {
        // FIXME
        // l の型推論はWritableComputedRef<T>だが、実際にはrefでwrapされない生のstringが渡ってきている
        await loadFonts(l as unknown as string);
      },
      {
        immediate: true,
      }
    );

    return {
      paths,
      text,
      transforms,
      color,
      fontType,
      loading,
      backgroundColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.share-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  > a {
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>
