<script setup lang="ts">
import { ref, toRef, defineProps } from "vue";
import { Pagination } from "swiper/modules";

import Carousel from "@components/Carousel.vue";

const props = defineProps({
  slides: {
    type: Array,
    required: true
  }
})

const modules = ref([Pagination]);
const slides = toRef(props.slides)
</script>

<template>
  <v-row class="d-flex align-center justify-center my-15">
    <p class="text-h2 text-font-title font-weight-bold text-truncate my-10">Hoạt Động Tiêu Biểu</p>

    <v-col class="d-flex justify-center align-center px-15 py-0 w-75" style="height:550px;box-sizing:content-box;">
      <div class="h-100 w-100">
        <carousel
          :slides="slides"
          :containerClass="'w-75'"
          :modules="modules"
          v-slot:content="{ slide, index }"
        >
          <div class="h-100 d-flex">
            <v-hover v-slot:default="{ isHovering, props }">
              <div
                v-bind="props"
                class="d-flex flex-column align-center justify-center fill-height position-relative"
                :id="`slide-${index}`"
              >
                <v-img 
                  class="w-100 position-absolute"
                  style="z-index:-1;height:420px;"
                  :src="slide.imageUrl"
                >
                  <v-overlay
                    v-model="(isHovering as boolean | undefined)"
                    activator="parent"
                    contained
                  ></v-overlay>
                </v-img>

                <span
                  class="text-truncate text-h3 font-weight-bold my-7"
                  style="text-shadow: 0px 5px rgba(0, 0, 0, 0.5);">
                  {{ slide.title }}
                </span>
                <pre class="w-75 text-truncate">
                  {{ slide.description }}
                </pre>
              </div>
            </v-hover>
          </div>
        </carousel>
      </div>
    </v-col>
  </v-row>
</template>