<script setup lang="ts">
import { ref, defineProps, inject } from "vue";
import { useI18n } from "vue-i18n"

import EmployeeBaseLayout from "@layouts/dashboards/employee/EmployeeBaseLayout.vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const { t } = useI18n()
const tab = ref(null);
const theme: any = inject('theme')
</script>

<template>
  <employee-base-layout>
    <template #extra-nav>
      <v-tabs v-model="tab" bg-color="primary" grow>
        <v-tab :theme="theme.theme.global.name" value="personal_information" :to="`/dashboard/employee/123/overview`">
          <span class="text-truncate">
            {{ t('$vuetify.tabs.personal_information') }}
          </span>
        </v-tab>
        <v-tab :theme="theme.theme.global.name" value="documents" :to="`/dashboard/employee/123/documents`">
          <span class="text-truncate">
            {{ t('$vuetify.tabs.documents') }}
          </span>
        </v-tab>
      </v-tabs>
    </template>

    <template #content>
      <div class="position-absolute container">
        <v-tabs-window v-model="tab" class="custom-window">
          <v-tabs-window-item
            class="flex-grow-1"
            :value="props.name"
          >
            <slot name="body"></slot>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </template>

    <!-- <div class="px-5 py-3 rounded-lg bg-grey-darken-1 progress-container position-fixed">
      <span class="text-white">Uploading...</span>
      <v-btn
        icon="fas fa-times"
        variant="plain"
        size="sm"
        class="float-right"
      ></v-btn>
      <v-progress-linear
        class="mt-3"
        model-value="50"
        color="blue-grey"
        height="25"
        striped
      >
        <template v-slot:default="{ value }">
          <strong>{{ Math.ceil(value) }}%</strong>
        </template>
      </v-progress-linear>
    </div> -->
  </employee-base-layout>
</template>

<style>
.custom-window {
  height: calc(100vh - var(--v-layout-top));
  overflow-y: auto !important;
  scroll-behavior: smooth;
}
.custom-window::-webkit-scrollbar {
  width: 0.5em;
}
.custom-window::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: transparent;
}
.custom-window::-webkit-scrollbar-thumb {
  background: rgba(171, 171, 171, 0.9);
  transition: background 1s ease;
  outline: 1px solid slategrey;
  border-radius: 10px;
}
.custom-window::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
}
.custom-window::-webkit-scrollbar-thumb:active {
  background: rgba(113, 112, 112, 1);
}
</style>