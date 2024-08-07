import { de, en, vi } from "vuetify/locale";
import { createI18n } from "vue-i18n";

import customDe from "@locales/de";
import customEn from "@locales/en";
import customVi from "@locales/vi";

const messages = {
  de: {
    $vuetify: {
      ...de,
      ...customDe
    }
  },
  en: {
    $vuetify: {
      ...en,
      ...customEn
    }
  },
  vi: {
    $vuetify: {
      ...vi,
      ...customVi
    }
  }
};

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: "vi",
  fallbackLocale: "en",
  messages
});

export default i18n;
