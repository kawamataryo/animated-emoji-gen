<template>
  <GitTag />
  <div class="container">
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

export default defineComponent({
  name: "App",
  components: {
    GitTag,
    MainPage,
    Footer,
    NotSupportMessage,
  },
  setup() {
    const isNotSupportedBrowser = ref(false);

    onMounted(() => {
      const browser = detect();
      if (browser && browser.name !== "chrome") {
        isNotSupportedBrowser.value = true;
      }
    });

    return {
      isNotSupportedBrowser,
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
