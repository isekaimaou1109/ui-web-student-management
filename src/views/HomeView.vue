<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { ref } from "vue";

import BaseLayout from "@layouts/BaseLayout.vue";
import Welcome from '@components/homepage/Welcome.vue'
import ActivityShow from '@components/homepage/ActivityShow.vue'
import OurMission from '@components/homepage/OurMission.vue'
import OurAchievement from '@components/homepage/OurAchievement.vue'
import CongratulateTeachers from "@/components/homepage/CongratulateTeachers.vue";
import SchoolHistory from '@components/homepage/SchoolHistory.vue'
import Faq from '@components/FAQ.vue'
// import Footer from '@components/Footer.vue'

const { t } = useI18n();
useTitle(t("$vuetify.pages.homepage"));
const slides = ref<Array<SlideDTO>>([
  {
    name: "event-1",
    title: "Fire Camping with Us",
    description:
      "You can go up with good feeling and passion to anothers and dance around the firecamp",
    imageUrl:
      "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
  },
  {
    name: "event-2",
    title: "Fire Camping with Us",
    description:
      "You can go up with good feeling and passion to anothers and dance around the firecamp",
    imageUrl:
      "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
  },
  {
    name: "event-3",
    title: "Fire Camping with Us",
    description:
      "You can go up with good feeling and passion to anothers and dance around the firecamp",
    imageUrl:
      "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
  }
]);
const links = ref([
  'Home',
  'About Us',
  'Team',
  'Services',
  'Blog',
  'Contact Us',
])
</script>

<template>
  <base-layout v-slot:content>
    <welcome />
    <congratulate-teachers :slides="slides" />
    <activity-show :slides="slides" />
    <our-mission />
    <our-achievement />
    <school-history />
    <faq />
    <v-footer class="bg-grey-lighten-1">
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="`footer-${link}`"
          class="mx-2"
          color="white"
          rounded="xl"
          variant="text"
        >
          {{ link }}
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
  </base-layout>
</template>

<style>
.f {
  mask-image: url('../assets/wave.svg');
  mask-repeat: no-repeat;
}
</style>
