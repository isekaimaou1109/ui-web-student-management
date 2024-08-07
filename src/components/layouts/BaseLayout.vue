<script setup lang="ts">
import { ref, inject } from "vue";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { smAndUp, xs } = useDisplay();
const dialog: any = inject("language_dialog");
const theme: any = inject("theme");
const isCheck = ref(false);
const items = ref([
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me 2" }
]);
const navBarList = ref([
  {
    title: t("$vuetify.buttons.dialog"),
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ]
  },
  {
    title: t("$vuetify.buttons.dialog"),
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ]
  },
  {
    title: t("$vuetify.buttons.dialog"),
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ]
  },
  {
    title: t("$vuetify.buttons.dialog"),
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ]
  }
]);
const isToggleDownNavBarList = ref(false);
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar
      color="surface-variant"
      class="px-lg-7 px-md-6 px-sm-5"
      :theme="theme.theme.global.name.value"
    >
      <template v-slot:prepend>
        <v-avatar class="cursor-pointer">
          <v-img
            alt="John"
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            size="x-large"
          ></v-img>
        </v-avatar>
      </template>

      <v-col v-if="smAndUp" class="d-flex justify-start">
        <v-menu
          transition="slide-x-transition"
          v-for="(navItem, navIndex) in navBarList"
          :key="`nav-${navItem.title}-${navIndex}`"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              class="v-btn--nav"
              >{{ navItem.title }}</v-btn
            >
          </template>

          <v-card class="mx-auto" max-width="300">
            <v-list
              :items="items"
              item-title="title"
              item-value="title"
            >
            </v-list>
          </v-card>
        </v-menu>
      </v-col>

      <v-col class="d-flex justify-end align-center">
        <v-btn
          variant="plain"
          icon="fa:fas fa-language"
          size="x-large"
          class="v-btn--nav"
          @click="
            () => dialog.ChangeStateLanguageDialog(true)
          "
        ></v-btn>
        <v-switch
          v-model="isCheck"
          color="primary"
          hide-details
          inset
          @update:modelValue="(state: boolean | null) => {
            theme.changeTheme(state)
          }"
        ></v-switch>
        <v-btn
          v-if="xs"
          variant="plain"
          icon="fa:fas fa-list"
          size="large"
          class="v-btn--nav"
          @click="
            isToggleDownNavBarList =
              !isToggleDownNavBarList
          "
        ></v-btn>
      </v-col>

      <template
        #extension
        v-show="xs && isToggleDownNavBarList"
      >
        <v-expand-transition>
          <v-list
            v-show="xs && isToggleDownNavBarList"
            class="w-100"
            :theme="theme.theme.global.name.value"
            :items="items"
          ></v-list>
        </v-expand-transition>
      </template>
    </v-app-bar>

    <v-main style="--v-layout-top:64px;">
      <div class="h-screen">
        <slot name="content"></slot>
      </div>
    </v-main>
  </v-layout>
</template>

<style>
.v-btn--nav {
  outline: none !important;
}
.v-toolbar__extension {
  height: auto !important;
}
</style>
