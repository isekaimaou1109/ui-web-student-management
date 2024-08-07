<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import EmployeeLayout from '@layouts/dashboards/employee/EmployeeLayout.vue'
import Field from '@components/FieldInput.vue'

const { t } = useI18n()
const fields: any = ref([
  {
    name: "$vuetify.fields.form.login.email",
    key: "email",
    isDisabled: true
  },
  {
    name: "$vuetify.fields.form.login.password",
    key: "password",
    type: "password"
  },
  {
    name: "$vuetify.fields.username",
    key: "username",
    isDisabled: true
  },
  {
    name: "$vuetify.fields.phone",
    key: "phone"
  },
  {
    name: "$vuetify.fields.address",
    key: "address",
    isDisabled: true
  },
  {
    name: "$vuetify.fields.position",
    key: "position",
    isDisabled: true
  },
  {
    name: "$vuetify.fields.tax_id",
    key: "tax_id",
    isDisabled: true
  },
  {
    name: "$vuetify.fields.gender",
    key: "gender",
    isDisabled: true
  },
  {
    name: "$vuetify.fields.first_name",
    key: "first_name",
    isDisabled: true
  },
  {
    name: "$vuetify.fields.last_name",
    key: "last_name",
    isDisabled: true
  },
  {
    name: "$vuetify.fields.id",
    key: "id",
    isDisabled: true
  }
])
const snackbar: any = ref(true)
const hiddenImageFileInput: any = ref(null)
const previewImage: any = ref(null)

function onCreateTempImageFile(file: File | File[]) {
  const url = URL.createObjectURL(file)
  previewImage.value = url
}
</script>

<template>
  <employee-layout name="personal_information">
    <template #body>
      <v-row class="pa-15" no-gutters>
        <v-col class="d-flex flex-column align-center" cols="4">
          <v-file-input
            ref="hiddenImageFileInput"
            type="file"
            accept="image/png, image/jpeg, image/bmp"
            style="display:none;"
            @update:modelValue="(file: File | File[]) => onCreateTempImageFile(file)"
          ></v-file-input>
          <v-avatar
            size="15rem"
            class="cursor-pointer"
          >
            <v-img
              alt="Avatar"
              :src="previewImage"
            ></v-img>
          </v-avatar>

          <div class="d-flex align-center mt-8">
            <v-btn class="mr-3" variant="elevated" @click="() => hiddenImageFileInput.click()">
              {{ t('$vuetify.buttons.upload') }}
            </v-btn>

            <v-btn variant="elevated" @click="() => console.log('a')">
              {{ t('$vuetify.buttons.apply') }}
            </v-btn>
          </div>
        </v-col>

        <v-col cols="8">
          <v-row no-gutters>
            <v-col 
              v-for="(field, index) in fields"
              :key="`login-field-${field.name}-${index}`"
              cols="6"
            >
              <Field
                :name="field.name"
                :variant="'underlined'"
                :inputType="field?.type"
                :property="field.key"
                :isSubmit="false"
                :isDisabled="field.isDisabled"
                :errors="[]"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-snackbar
        v-model="snackbar"
        :timeout="3000"
      >
        <span class="text-white">
          Update successfully
        </span>
        <template v-slot:actions>
          <v-btn
            color="blue"
            variant="text"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </employee-layout>
</template>