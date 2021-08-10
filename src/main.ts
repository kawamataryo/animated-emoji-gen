import { createApp } from "vue";
import App from "./App.vue";
import "bulma";
import VueGtag from "vue-gtag";
import { createI18n } from "vue-i18n";
import { jaMessages } from "./locales/ja";
import { enMessages } from "./locales/en";

const i18n = createI18n({
  legacy: false,
  locale: navigator.language.split("-")[0],
  fallbackLocale: "en",
  messages: {
    ja: jaMessages,
    en: enMessages,
  },
});

createApp(App)
  .use(VueGtag, {
    config: { id: "G-VYEK3D6BDN" },
  })
  .use(i18n)
  .mount("#app");
