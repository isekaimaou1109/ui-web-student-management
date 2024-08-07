<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from 'vue-i18n'
import { useDate } from "vuetify";
import { useDropZone } from "@vueuse/core";

import EmployeeLayout from '@layouts/dashboards/employee/EmployeeLayout.vue'

const date = useDate();
const { t } = useI18n()

const filesData: any = ref([]);
const endOfList = ref(10);
const dropZoneRef = ref<HTMLDivElement>();
const displayFilesType = ref(1);
const increaseOrDecrease = ref(0);
const fileProperties = ref([
  "name",
  "updatedAt"
]);

function onDrop(files: File[] | null) {
  files?.forEach((file) => {
    const now = date
      .format(new Date(), "keyboardDateTime24h")
      .split(" ");
    file.updatedAt = now[1].concat(" ").concat(now[0]);
    filesData.value.push(file);
  });
}
useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["application/pdf"]
});

function onDeleteFile() {}

function onDownloadFile() {}
</script>

<template>
  <employee-layout name="documents">
    <template #body>
      <div
        class="pa-2 bg-white d-flex justify-space-between"
      >
        <div class="w-50 option--left d-flex align-center flex-grow-1">
          <v-select
            max-width="200px"
            :label="t('$vuetify.fields.property')"
            :items="fileProperties"
            hide-details
          ></v-select>
          <v-btn-toggle
            v-model="increaseOrDecrease"
            class="ml-3"
          >
            <v-btn
              @click="() => (increaseOrDecrease = 0)"
            >
              <v-icon
                icon="fas fa-sort-amount-up"
              ></v-icon>
            </v-btn>
            <v-btn
              @click="() => (increaseOrDecrease = 1)"
            >
              <v-icon
                icon="fas fa-sort-amount-down"
              ></v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-text-field
            class="ml-5"
            max-width="250px"
            prepend-inner-icon="fas fa-search"
            variant="underlined"
            auto-complete="off"
            spellcheck="false"
            :label="t('$vuetify.fields.search')"
            hide-details
          ></v-text-field>
        </div>

        <v-btn-toggle v-model="displayFilesType">
          <v-btn
            @click="() => (displayFilesType = 0)"
          >
            <v-icon icon="fas fa-th-large"></v-icon>
          </v-btn>
          <v-btn
            @click="() => (displayFilesType = 1)"
          >
            <v-icon icon="fas fa-list"></v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
      <div ref="dropZoneRef" class="fill-height">
        
        <v-row
          v-if="
            filesData.length && displayFilesType === 0
          "
          no-gutters
          class="pa-5"
        >
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-col
                v-bind="props"
                cols="2"
                v-for="(
                  file, fileIndex
                ) in filesData.slice(0, endOfList)"
                :key="`file-${file.name}-${fileIndex}`"
                class="d-flex flex-column align-center my-3 cursor-pointer file bg-transparent pa-2"
              >
                <v-icon
                  icon="far fa-file-pdf"
                  size="5rem"
                ></v-icon>
                <span
                  class="w-50 mt-3 text-body-1 text-truncate"
                  >{{ file.name }}</span
                >
                <v-btn-toggle>
                  <v-btn
                    v-if="isHovering"
                    icon="fas fa-download"
                    variant="plain"
                    size="sm"
                    class="mr-3 text-white"
                    @click="onDownloadFile"
                  ></v-btn>
                  <v-btn
                    v-if="isHovering"
                    icon="fas fa-times"
                    variant="plain"
                    size="sm"
                    class="text-white"
                    @click="onDeleteFile"
                  ></v-btn>
                </v-btn-toggle>
                <v-tooltip
                  v-if="isHovering"
                  activator="parent"
                  location="bottom"
                >
                  <p class="m-0">
                    <span class="font-weight-bold">Name: </span> 
                    {{ file.name }}
                  </p>
                  <p class="m-0">
                    <span class="font-weight-bold">Updated At: </span> 
                    {{ file.updatedAt }}
                  </p>
                  <p class="m-0">
                    <span class="font-weight-bold">Type: </span> 
                    {{ file.type }}
                  </p>
                </v-tooltip>
              </v-col>
            </template>
          </v-hover>
        </v-row>
        
        <div
          v-if="
            filesData.length && displayFilesType === 1
          "
          class="pa-5"
        >
          <div
            v-for="(
              file, fileIndex
            ) in filesData.slice(0, endOfList)"
            :key="`file-${file.name}-${fileIndex}`"
            class="file bg-transparent cursor-pointer my-2 pa-2 d-flex items-center justify-space-between"
          >
            <div class="info--left d-flex w-50">
              <v-icon icon="far fa-file-pdf"></v-icon>
              <span
                class="ml-2 text-body-1 text-truncate"
                >{{ file.name }}</span
              >
            </div>
            <div class="info--right">
              <span class="mr-3 text-body-1">{{
                file.updatedAt
              }}</span>
              <v-btn
                icon="fas fa-download"
                variant="plain"
                size="sm"
                class="mr-3"
                @click="onDownloadFile"
              ></v-btn>
              <v-btn
                icon="fas fa-times"
                variant="plain"
                size="sm"
                @click="onDeleteFile"
              ></v-btn>
            </div>
          </div>
        </div>
        <v-btn
          v-if="filesData.length >= 10"
          variant="plain"
          class="mt-5 w-100 font-weight-bold"
          @click="() => (endOfList += 10)"
          >See more</v-btn
        >
        <v-empty-state v-if="filesData.length === 0">
          <template #media>
            <v-icon
              icon="mb-5 fas fa-ban"
              size="5rem"
              color="white"
            />
          </template>
          <template #text>
            <span class="text-h3 font-weight-bold">
              {{ t('$vuetify.messages.no_files') }}
            </span>
          </template>
        </v-empty-state>
      </div>
    </template>
  </employee-layout>
</template>

<style scoped>
html {
  overflow-y: hidden;
}

.progress-container {
  width: 300px;
  right: 10px;
  bottom: 10px;
}
.container {
  height: calc(100% - (var(--v-layout-top) * 2)) !important;
  width: -webkit-fill-available;
  top: var(--v-layout-top);
  left: var(--v-layout-left);
}
.file {
  user-select: none;
}
.file:hover {
  background: #78909c !important;
}
</style>
