import { createApp } from "vue";
import App from "./App.vue";
import "bulma";
import VueGtag from "vue-gtag";

createApp(App)
  .use(VueGtag, {
    config: { id: "G-VYEK3D6BDN" },
  })
  .mount("#app");
