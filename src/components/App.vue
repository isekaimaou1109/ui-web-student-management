<script setup lang="ts">
import { provide, ref } from "vue";
import { useTheme, useDisplay } from "vuetify";
import { useI18n } from 'vue-i18n'

import Modal from '@components/Modal.vue'

const { mobile, platform } = useDisplay()
const { locale } = useI18n()
const theme = useTheme();
const isDarkMode = ref(theme.global.current.value.dark);
const isOpenedLanguageDialog = ref(false);
function changeTheme(state: boolean) {
  isDarkMode.value = state;
  if (isDarkMode.value) {
    theme.global.name.value = "dark";
  } else {
    theme.global.name.value = "light";
  }
}
function ChangeStateLanguageDialog(
  state: boolean,
  callback?: Function
) {
  isOpenedLanguageDialog.value = state;
  callback && callback();
}
provide("theme", {
  theme,
  isDarkMode,
  changeTheme
});
provide("language_dialog", {
  isOpenedLanguageDialog,
  ChangeStateLanguageDialog
});
</script>

<template>
  <router-view v-if="mobile"></router-view>
  <div v-else>
    <p class="text-warning text-h2">
      We dont support for mobile
    </p>
  </div>
  <modal
    v-if="isOpenedLanguageDialog"
    type="language"
    message="Language"
    title="$vuetify.titles.languages"
    icon_name="fas fa-check"
    :isShow="isOpenedLanguageDialog"
    @disagree="
      () => {
        isOpenedLanguageDialog = false
      }
    "
    @agree="
      (newLanguage: string) => {
        isOpenedLanguageDialog = false
        locale = newLanguage
      }
    "
  />
</template>
