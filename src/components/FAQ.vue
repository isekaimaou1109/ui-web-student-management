<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const pairQuestionAndAnswer = ref([
  {
    question: '$vuetify.faq.questions.free_school_fee',
    answer: '$vuetify.faq.answers.free_school_fee'
  },
  {
    question: '$vuetify.faq.questions.free_school_fee',
    answer: '$vuetify.faq.answers.free_school_fee'
  },
  {
    question: '$vuetify.faq.questions.free_school_fee',
    answer: '$vuetify.faq.answers.free_school_fee'
  },
  {
    question: '$vuetify.faq.questions.free_school_fee',
    answer: '$vuetify.faq.answers.free_school_fee'
  },
  {
    question: '$vuetify.faq.questions.free_school_fee',
    answer: '$vuetify.faq.answers.free_school_fee'
  }
])
</script>

<template>
  <v-row class="px-12 my-15 justify-center">
    <p class="text-h2 font-weight-bold my-10">FAQ</p>

    <v-expansion-panels class="mb-6">
      <v-expansion-panel
        v-for="(pair, pairIndex) in pairQuestionAndAnswer"
        :key="`faq-pair-${pair}-${pairIndex}`"
      >
        <v-expansion-panel-title expand-icon="fas fa-plus" collapse-icon="fas fa-minus">
          {{ t(pair.question) }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          {{ t(pair.answer) }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>