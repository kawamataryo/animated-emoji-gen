<template>
  <GitTag />
  <div class="container">
    <LanguageSelect v-model="locale" />
    <template v-if="isNotSupportedBrowser">
      <NotSupportMessage />
    </template>
    <MainPage />
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import GitTag from "./components/GitTag.vue";
import MainPage from "./pages/MainPage.vue";
import Footer from "./components/Footer.vue";
import NotSupportMessage from "./components/NotSupportMessage.vue";
import { detect } from "detect-browser";
import { useI18n } from "vue-i18n";
import LanguageSelect from "./components/LanguageSelect.vue";

export default defineComponent({
  name: "App",
  components: {
    GitTag,
    MainPage,
    Footer,
    NotSupportMessage,
    LanguageSelect,
  },
  setup() {
    const isNotSupportedBrowser = ref(false);
    const { locale } = useI18n({ useScope: "global" });

    onMounted(() => {
      const browser = detect();
      if (browser && browser.name !== "chrome") {
        isNotSupportedBrowser.value = true;
      }
    });

    return {
      isNotSupportedBrowser,
      locale,
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
  background-color: #f9f9f9;
  padding-top: 60px;
  position: relative;

  @media screen and (max-width: 768px) {
    padding-top: 25px;
  }
}

.container {
  @media screen and (max-width: 768px) {
    padding: 0 15px;
  }
}

.label {
  font-weight: 300 !important;
}
</style>
