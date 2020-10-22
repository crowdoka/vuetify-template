import "@/registerComponentHooks";
import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "@/App.vue";
import vuetify from "@/plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import { applyPolyfills, defineCustomElements } from "@bruit/component/loader";
import router from "@/router";
import store from "@/store";

Vue.use(Vuelidate);

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/bruit-w*/];

applyPolyfills().then(() => {
  defineCustomElements(window);
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
