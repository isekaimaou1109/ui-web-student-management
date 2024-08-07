<script setup lang="ts">
import { ref, toRef, defineProps } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  type: {
    type: String,
    default: "notification"
  },
  message: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  icon_name: {
    type: String,
    required: true
  },
  isShow: {
    required: true
  }
});
let isShow = toRef(() => props.isShow);
const { t, locale } = useI18n();
const supportedLanguages = ref(["de", "en", "vi"]);
const tempLanguage = ref(locale.value);
</script>

<template>
  <v-dialog v-model="isShow" max-width="400" persistent>
    <v-card
      :prepend-icon="
        props.type === 'notification' ? props.icon_name : ''
      "
    >
      <template #title>
        <div
          v-if="props.type === 'language'"
          class="text-center"
        >
          <span class="font-weight-bold text-h5">
            {{ t(props.title) }}
          </span>
        </div>
        <span v-else>{{ t(props.title) }}</span>
      </template>
      <template #text>
        <v-row
          v-if="props.type === 'language'"
          class="justify-space-between mt-3"
          style="gap:10px;"
          no-gutters
        >
          <v-col
            v-for="(
              language, languageIndex
            ) in supportedLanguages"
            :key="`supported-language-${language}-${languageIndex}`"
          >
            <v-btn
              class="w-100"
              variant="outlined"
              @click="() => (tempLanguage = language)"
            >
              <span class="text-truncate">
                {{
                  t(
                    `$vuetify.languages.${
                      language === "de"
                        ? "germany"
                        : language === "en"
                        ? "english"
                        : "vietnamese"
                    }`
                  )
                }}
              </span>
              <v-tooltip
                activator="parent"
                location="bottom"
              >
                {{
                  t(
                    `$vuetify.languages.${
                      language === "de"
                        ? "germany"
                        : language === "en"
                        ? "english"
                        : "vietnamese"
                    }`
                  )
                }}
              </v-tooltip>
            </v-btn>
          </v-col>
          <v-responsive width="100%"></v-responsive>
        </v-row>
        <span v-else>{{ props.message }}</span>
      </template>
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="() => $emit('disagree')">
          {{ t("$vuetify.buttons.close") }}
        </v-btn>

        <v-btn @click="() => $emit('agree', tempLanguage)">
          {{ t("$vuetify.buttons.agree") }}
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
