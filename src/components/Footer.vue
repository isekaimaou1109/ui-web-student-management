<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  links: {
    type: Array,
    default: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us',
    ]
  }
})

const links = ref(props.links)
</script>

<template>
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
</template>