<script setup lang="ts">
import { toRef, defineProps } from "vue";

const props = defineProps({
  slides: {
    type: Array,
    required: true
  }
})

const slides = toRef(props.slides)
</script>

<template>
  <v-row class="px-12 my-15 justify-center">
    <p class="text-h2 font-weight-bold my-10">Đội Ngũ Giáo Viên Ưu Tú</p>

    <v-carousel
      height="400"
      progress="primary"
      direction="vertical"
      vertical-delimiters="left"
      hide-delimiter-background
      :show-arrows="false"
      :interval="1500"
      cycle
    >
      <v-carousel-item
        v-for="(slide, i) in 3"
        :key="i"
      >
        <v-sheet
          height="100%"
        >
          <div class="d-flex fill-height justify-center align-center">
            <div class="text-h2">
              {{ slide }} Slide
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-row>
</template>