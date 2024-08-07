import * as validators from '@vuelidate/validators'
import i18n from '@/i18n'

const { createI18nMessage } = validators
const messagePath = ({ $validator }: any) => `$vuetify.validations.${$validator}`
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n), messagePath })

export const required = withI18nMessage(validators.required)
export const minLength = withI18nMessage(validators.minLength, { withArguments: true })
export const maxLength = withI18nMessage(validators.maxLength(10))
export const email = withI18nMessage(validators.email)
export const password = withI18nMessage(validators.helpers.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/))