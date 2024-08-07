<script setup lang="ts">
import { defineProps, toRef } from 'vue'

const props = defineProps({
  isPagination: {
    type: Boolean,
    default: true
  },
  isNavigation: {
    type: Boolean,
    default: false
  },
  spaceBetween: {
    type: Number,
    default: 0
  },
  modules: {
    type: Array,
    default: []
  },
  slides: {
    type: Array,
    required: true
  },
  containerClass: {
    type: String,
    default: ''
  }
})

const slides = toRef(() => props.slides)
</script>

<template>
  <swiper
    :class="['cursor-pointer', props.containerClass]"
    style="height:420px;"
    :spaceBetween="props.spaceBetween"
    :pagination="{
      clickable: props.isPagination,
    }"
    :navigation="props.isNavigation"
    :modules="props.modules"
  >
    <swiper-slide 
      v-for="(slide, slideIndex) in slides"
      :key="`slide-${slide}-${slideIndex}`"
    >
      <slot name="content" :slide="slide" :index="slideIndex"></slot>
    </swiper-slide>
  </swiper>
</template>