<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const years = ref([
  {
    color: 'cyan',
    year: '1960',
    title: '$vuetify.timeline.titles.in_dorf_establish',
    explaination: '$vuetify.timeline.descriptions.in_dorf_establish'
  },
  {
    color: 'green',
    year: '1970',
    title: '$vuetify.timeline.titles.second_school_upgrade',
    explaination: '$vuetify.timeline.descriptions.second_school_upgrade'
  },
  {
    color: 'pink',
    year: '1980',
    title: '$vuetify.timeline.titles.in_dorf_establish',
    explaination: '$vuetify.timeline.descriptions.in_dorf_establish'
  },
  {
    color: 'amber',
    year: '1990',
    title: '$vuetify.timeline.titles.second_school_upgrade',
    explaination: '$vuetify.timeline.descriptions.second_school_upgrade'
  },
  {
    color: 'orange',
    year: '2000',
    title: '$vuetify.timeline.titles.second_school_upgrade',
    explaination: '$vuetify.timeline.descriptions.second_school_upgrade'
  }
])
</script>

<template>
  <v-row class="px-12 my-15 justify-center">
    <p class="text-h2 font-weight-bold my-10">
      {{ t('$vuetify.titles.school_history') }}
    </p>

    <v-timeline align="start">
      <v-timeline-item
        v-for="(year, i) in years"
        :key="i"
        :dot-color="year.color"
        size="small"
      >
        <template v-slot:opposite>
          <div
            :class="`pt-1 headline font-weight-bold text-${year.color}`"
            v-text="year.year"
          ></div>
        </template>
        <div>
          <h2 :class="`mt-n1 headline font-weight-light mb-4 text-${year.color}`">
            {{ t(year.title) }}
          </h2>
          <div>
            {{ t(year.explaination) }}
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-row>
</template>