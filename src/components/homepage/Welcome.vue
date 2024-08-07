<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <v-row class="position-relative align-center justify-center">
    <v-parallax style="z-index:-1;filter:blur(5px);">
      <v-img max-height="500px" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
    </v-parallax>
    <div class="position-absolute">
      <p class="text-h3 text-font-title font-weight-bold text-shadow text-truncate">
        {{ t('$vuetify.titles.welcome') }}
      </p>
      <pre class="text-center text-font-body mt-3 position-absolute text-shadow text-truncate w-100">
        {{ t('$vuetify.titles.welcome_subtitle') }}
      </pre>
    </div>
  </v-row>
</template>