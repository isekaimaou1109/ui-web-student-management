<script setup lang="ts">
import { ref, inject } from 'vue'
import { useI18n } from 'vue-i18n'

import Logo from '@/assets/vue.svg?component'

const { t } = useI18n()
const isMini = ref(true)
const listItems = ref([
  { title: 'overview', icon: "fas fa-info-circle" },
  { title: 'management', icon: "fas fa-tasks" },
  { title: 'overview', icon: "fas fa-info-circle" }
])
const dialog: any = inject('language_dialog')
const theme: any = inject('theme')
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer :width="isMini ? 64 : 256" color="grey-darken-2" permanent>
      <div class="d-flex flex-column align-center py-5 cursor-pointer">
        <v-avatar :size="isMini ? '48px' : '5rem'" class="elevation-8">
          <v-img
            alt="John"
            src="https://cdn.vuetifyjs.com/images/john.jpg"
          ></v-img>
        </v-avatar>
        <p v-if="!isMini" class="mt-3 text-center">
          <p class="text-truncate font-weight-bold">Sandra Adams</p>
          <pre class="text-truncate text-grey-lighten-1">sandra_a88@gmail.com</pre>
        </p>
      </div>

      <v-divider></v-divider>

      <v-list class="flex-grow-1" density="compact" nav>
        <v-list-item
          v-for="(listItem, listItemIndex) in listItems"
          :key="`list-item-option-${listItem.title}-${listItemIndex}`"
          :class="['my-3 cursor-pointer', {
            'd-flex align-center justify-center pa-2': isMini
          }]"
          v-slot:default="{ isSelected, select }"
          selectable
        >
          <div @click="() => select(true)" :class="['d-flex', {
            'text-white': isSelected,
            'text-grey-lighten-1': !isSelected
          }]">
            <v-icon :icon="listItem.icon"></v-icon>
            <span v-if="!isMini" class="ml-3">{{ t(`$vuetify.titles.${listItem.title}`) }}</span>
          </div>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-btn class="w-100 pa-3" icon="fas fa-cogs" variant="plain"></v-btn>
    </v-navigation-drawer>

    <v-app-bar
      color="grey-lighten-2"
      class="d-flex"
      flat
    >
      <div class="flex-grow-1">
        <Logo class="cursor-pointer" />
      </div>
      <v-btn
        variant="plain"
        icon="fa:fas fa-language"
        size="x-large"
        class="v-btn--nav mr-3"
        @click="() => dialog.ChangeStateLanguageDialog(true)"
      ></v-btn>
      <v-switch
        v-model="theme.isDarkMode"
        color="primary"
        class="mr-3"
        hide-details
        inset
        @update:modelValue="(state: boolean | null) => {
          theme.changeTheme(state)
        }"
      ></v-switch>
      <v-btn @click="isMini = !isMini" icon="fa:fas fa-list"></v-btn>
      <template #extension>
        <slot name="extra-nav"></slot>
      </template>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center pt-0">
      <slot name="content"></slot>
    </v-main>
  </v-layout>
</template>

<style>
.v-toolbar__content {
  padding-right: 12px !important;
  padding-left: 12px !important;
}
.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
}
</style>