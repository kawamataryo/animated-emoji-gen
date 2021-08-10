import { createApp } from "vue";
import App from "./App.vue";
import "bulma";
import VueGtag from "vue-gtag";

createApp(App)
  .use(VueGtag, {
    config: { id: "G-1BEJBM42RD" },
  })
  .mount("#app");
