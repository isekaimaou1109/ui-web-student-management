<script setup lang="ts">
import { defineProps, toRef } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  type: {
    required: true,
    type: String || null,
    default: null,
    validator(value: any, _props) {
      return [null, 'login', 'register'].includes(value)
    }
  },
  name: {
    required: true,
    type: String
  },
  property: {
    required: true,
    type: String
  },
  errors: {
    required: false,
    default: [],
    type: Array<any>
  },
  isDisabled: {
    type: Boolean,
    required: true,
    default: false
  },
  isSubmit: {
    type: Boolean,
    required: true,
    default: false
  },
  variant: {
    default: 'filled',
    type: String
  },
  inputType: {
    default: 'text',
    type: String
  }
})

let isDisabled = toRef(() => props.isDisabled)
let isSubmit = toRef(() => props.isSubmit)
</script>

<template>
  <v-text-field
    width="300px"
    :label="t(props.name)"
    :error-messages="$props.errors"
    :disabled="isDisabled"
    :variant="props.variant"
    :type="props.inputType"
    @update:model-value="(value: any) => $emit('update_value', value)"
    @blur="() => $emit('blur')"
    @input="() => $emit('input')"
    @keypress.enter="() => $emit('press_enter')"
    required
    clearable
  >
    <template v-slot:append-inner>
      <v-fade-transition leave-absolute>
        <v-progress-circular
          v-if="isSubmit"
          color="info"
          size="24"
          indeterminate
        ></v-progress-circular>
      </v-fade-transition>
    </template>
  </v-text-field>
</template>