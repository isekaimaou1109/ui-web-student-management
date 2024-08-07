<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const missions = ref([
  {
    title: '$vuetify.missions.titles.provide_good_students',
    description: '$vuetify.missions.descriptions.provide_good_students'
  },
  {
    title: '$vuetify.missions.titles.provide_good_students',
    description: '$vuetify.missions.descriptions.provide_good_students'
  },
  {
    title: '$vuetify.missions.titles.provide_good_students',
    description: '$vuetify.missions.descriptions.provide_good_students'
  }
])
</script>

<template>
  <v-row class="px-12 my-15 justify-center" style="row-gap:50px;">
    <p class="text-h2 font-weight-bold">
      {{ t('$vuetify.titles.our_mission') }}
    </p>

    <v-col
      v-for="(mission, missionIndex) in missions" 
      cols="12" 
      class="d-flex cursor-pointer" 
      style="column-gap:50px;"
    >
      <v-img 
        maxWidth="70%"
        :class="['flex-grow-1', { 'order-2': missionIndex % 2 !== 0 }]"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      />
      <div class="flex-grow-1 w-0">
        <v-tooltip
          width="fit-content"
          location="top"
          :text="t(mission.title)"
          v-slot:activator="{ props }"
        >
          <p v-bind="props" class="text-h4 mb-3 font-weight-bold text-truncate">{{ t(mission.title) }}</p>
        </v-tooltip>
        <v-tooltip
          width="50%"
          location="bottom"
          :text="t(mission.description)"
          v-slot:activator="{ props }"
        >
        <pre v-bind="props" class="text-truncate">{{ t(mission.description) }}</pre>
        </v-tooltip>
      </div>
    </v-col>
  </v-row>
</template>