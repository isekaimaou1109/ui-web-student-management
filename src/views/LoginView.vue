<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useLocalStorage, onLongPress } from "@vueuse/core";
import QRCodeVue3 from "qrcode-vue3";

import BaseLayout from "@layouts/BaseLayout.vue";
import Modal from "@components/Modal.vue";
import {
  required,
  email,
  minLength,
  password
} from "@/validation_message";
import useForm from "@stores/form";
import Field from "@components/FieldInput.vue";
import logo from '@/assets/vue.svg?component&url'

const tab = ref(null)
const submitBtnRef = ref<HTMLElement>();
const clearBtnRef = ref<HTMLElement>();

const isHiddenModal = ref(false);

/** Handle refresh browser event */
const isBrowserRefresh = useLocalStorage("isRefresh", 0);
onBeforeMount(() => {
  window.addEventListener("beforeunload", (event: Event) => {
    event.preventDefault()
    isBrowserRefresh.value = 1;
  });
});
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', () => {})
})

/** Handle long press event */
const isLongPressed = ref(false);
function onLongPressCallback() {
  isLongPressed.value = true;
  isHiddenModal.value = true;
}
onLongPress(submitBtnRef, onLongPressCallback, {
  modifiers: {
    prevent: true
  }
});
onLongPress(clearBtnRef, onLongPressCallback, {
  modifiers: {
    prevent: true
  }
});

/** Router Information */
// const { query } = useRoute();
const { go, replace } = useRouter();
const { t } = useI18n();

/** Handle form */
const isSubmit = ref(false);
const { loginForm } = storeToRefs(useForm());
const loginFieldsDetail: any = ref([
  {
    name: "$vuetify.fields.form.login.email",
    key: "email"
  },
  {
    name: "$vuetify.fields.form.login.password",
    key: "password"
  }
]);
const rules = {
  email: { required, email },
  password: { required, password, minLength: minLength(12) }
};
const validator = useVuelidate(rules, loginForm);
function onClearForm() {
  validator.value.$reset();
  for (const [key] of Object.entries(loginForm.value)) {
    loginForm.value[key] = "";
  }
  go(0);
}
async function onValidateForm() {
  let isPass = await validator.value.$validate();
  if (!isPass) {
    alert("Not work");
    onClearForm();
  } else {
    isSubmit.value = true;
    let beforeNext = setTimeout(() => {
      isSubmit.value = false;
      isBrowserRefresh.value = 0;
      replace({ name: "home" });
      clearTimeout(beforeNext);
    }, 2000);
  }
}

</script>

<template>
  <base-layout v-slot:content>
    <div class="h-screen d-flex justify-center align-center">
      <v-card class="bg-transparent h-75 flex-grow-1" max-width="500px" max-height="350px">
        <v-tabs
          v-model="tab"
          align-tabs="center"
          color="deep-purple-accent-4"
        >
          <v-tab value="qrcode_login">
            <span class="text-truncate">
              {{ t('$vuetify.tabs.qrcode_login') }}
            </span>
          </v-tab>
          <v-tab value="form">
            <span class="text-truncate">
              {{ t('$vuetify.tabs.form') }}
            </span>
          </v-tab>
        </v-tabs>

        <v-card-text class="mt-5 d-flex justify-center">
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="qrcode_login">
              <QRCodeVue3
                :width="200"
                :height="200"
                :image="logo"
                value="https://scholtz.sk"
                :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                :imageOptions="{ hideBackgroundDots: false, imageSize: 0.4, margin: 0 }"
                :dotsOptions="{
                  type: 'dots',
                  color: '#26249a',
                  gradient: {
                    type: 'linear',
                    rotation: 0,
                    colorStops: [
                      { offset: 0, color: 'red' },
                      { offset: 1, color: '#26249a' },
                    ],
                  },
                }"
                :backgroundOptions="{ color: '#ffffff' }"
                :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
                :cornersDotOptions="{ type: undefined, color: '#000000' }"
                fileExt="png"
                :download="false"
                myclass="my-qur"
                imgclass="img-qr"
              /> 
            </v-tabs-window-item>

            <v-tabs-window-item value="form">
              <form>
                <Field
                  v-for="(field, index) in loginFieldsDetail"
                  type="login"
                  :key="`login-field-${field.name}-${index}`"
                  :name="field.name"
                  :property="field.key"
                  :isDisabled="isSubmit"
                  :isSubmit="isSubmit"
                  :errors="validator[field.key].$errors.map((e: any) => e.$message)"
                  @update_value="(newValue: any) => loginForm[field.key] = newValue"
                  @blur="validator[field.key].$touch"
                  @input="validator[field.key].$touch"
                  @press_enter="onValidateForm"
                />

                <v-btn-toggle class="mt-3 float-right">
                  <v-btn
                    ref="submitBtnRef"
                    class="me-4"
                    :loading="isSubmit"
                    :disabled="isSubmit"
                    @click="onValidateForm"
                  >
                    {{ t("$vuetify.buttons.submit") }}
                  </v-btn>
                  <v-btn
                    ref="clearBtnRef"
                    :loading="isSubmit"
                    :disabled="isSubmit"
                    @click="onClearForm"
                  >
                    {{ t("$vuetify.buttons.clear") }}
                  </v-btn>
                </v-btn-toggle>
              </form>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>

      <modal
        v-if="isHiddenModal"
        message="Please Check again"
        title="Inform"
        icon_name="fas fa-check"
        :isShow="isLongPressed"
        @disagree="
          () => {
            isLongPressed = false;
            isHiddenModal = false;
          }
        "
        @agree="
          () => {
            onValidateForm();
            isBrowserRefresh = 0;
            isHiddenModal = false;
          }
        "
      />
    </div>
  </base-layout>
</template>

<style>
.v-text-field .v-input__details {
  padding-inline: 0 !important;
}
</style>