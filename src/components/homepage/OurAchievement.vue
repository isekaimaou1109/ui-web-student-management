<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const achievements: any = ref([
  {
    title: "$vuetify.cards.titles.experience",
    description: 
      "$vuetify.cards.descriptions.experience"
    ,
    prepend_icon: "fas fa-graduation-cap"
  },
  {
    title: "$vuetify.cards.titles.facility",
    description: "$vuetify.cards.descriptions.facility",
    prepend_icon: "fas fa-laptop"
  },
  {
    title: "$vuetify.cards.titles.activity",
    description: "$vuetify.cards.descriptions.activity",
    prepend_icon: "fas fa-snowboarding"
  },
  {
    title: "$vuetify.cards.titles.e_learning",
    description: 
      "$vuetify.cards.descriptions.e_learning"
    ,
    prepend_icon: "fas fa-chalkboard-teacher"
  }
]);
</script>

<template>
  <v-row class="px-12 my-15 justify-center">
    <p class="text-h2 font-weight-bold my-10">
      {{ t("$vuetify.titles.achievements") }}
    </p>

    <v-row class="justify-center" no-gutters style="gap:20px;">
      <v-col
        v-for="(
          achievement, achievementIndex
        ) in achievements"
        :key="`achievement-${achievement.title}-${achievementIndex}`"
        cols="5"
        :class="{
          'd-flex justify-end': achievementIndex % 2 === 0
        }"
      >
        <v-tooltip
          width="40%"
          location="bottom"
          :text="t(achievement.description)"
          v-slot:activator="{ props }"
        >
          <v-card
            v-bind="props"
            max-width="80%"
            append-icon="mdi-check"
            class="d-flex flex-column justify-center pa-6 cursor-pointer"
            :title="t(achievement.title)"
          >
            <template v-slot:prepend>
              <v-icon
                color="primary"
                :icon="achievement.prepend_icon"
              ></v-icon>
            </template>
            <template v-slot:append>
              <v-icon
                color="success"
                icon="fas fa-check"
              ></v-icon>
            </template>

            <v-card-text
              v-bind="props"
              class="text-truncate"
            >
              {{ t(achievement.description) }}
            </v-card-text>
          </v-card>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-row>
</template>
