import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";
import 'swiper/css';
import 'swiper/css/pagination';
  import 'swiper/css/navigation';
import "./style.css";

import { createApp, App as Application } from "vue";
import { createVuetify } from "vuetify";
import { useI18n } from "vue-i18n";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { aliases, fa } from "vuetify/iconsets/fa";
import { createPinia } from "pinia";
import { storePlugin } from 'pinia-plugin-store';
import { Swiper, SwiperSlide } from 'swiper/vue';
import cookies from "vue-cookies";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import CryptoJS from 'crypto-js'

// import socket from '@/socket';
import App from "@components/App.vue";
import { router } from "@/router";
import i18n from "@/i18n";

const app: Application<Element> = createApp(App);
app.component('swiper', Swiper)
app.component('swiper-slide', SwiperSlide)

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark"
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  },
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa
    }
  }
});

function encrypt(value: string): string {
  return CryptoJS.AES.encrypt(value, import.meta.env.VITE_PUBLIC_KEY).toString();
}

function decrypt(value: string): string {
  return CryptoJS.AES.decrypt(value, import.meta.env.VITE_PUBLIC_KEY).toString(CryptoJS.enc.Utf8)
}

const extraFunctionPinia = storePlugin({
  stores: [{ name: 'form', storage: sessionStorage }],
  encrypt,
  decrypt
});


app.use(createPinia().use(piniaPluginPersistedstate).use(extraFunctionPinia));
app.use(cookies);
// app.use(socket)
app.use(i18n);
app.use(vuetify);
app.use(router);
app.mount("#app");
