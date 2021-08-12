import { createApp } from "vue";
import App from "./App.vue";
import "bulma";
import VueGtag from "vue-gtag";
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ja from "./locales/ja.json";

const i18n = createI18n({
  legacy: false,
  locale: navigator.language.split("-")[0],
  fallbackLocale: "en",
  messages: {
    en,
    ja,
  },
});

createApp(App)
  .use(VueGtag, {
    config: { id: "G-VYEK3D6BDN" },
  })
  .use(i18n)
  .mount("#app");
