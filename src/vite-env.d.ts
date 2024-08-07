/// <reference types="vite/client" />
declare module '*.vue';
// declare module "/home/toni/projects/student-management/frontend/node_modules/vue-i18n/dist/vue-i18n";
// declare module '@vuelidate/core'
// declare module '@vuelidate/validators'

interface LoginFormDTO<Type = string> {
  [key: string]: Type;
  email: Type;
  password: Type;
}

interface SlideDTO<Type = string> {
  name: Type;
  imageUrl: Type;
  title: Type;
  description: Type;
}