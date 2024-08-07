import { ref } from 'vue' 
import { defineStore } from 'pinia'

const useForm = defineStore('form', () => {
  /** States */
  let initialStateLoginForm: LoginFormDTO = {
    email: '',
    password: ''
  }

  let login = ref(initialStateLoginForm)

  let register = ref({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: ''
  })

  return {
    loginForm: login,
    registerForm: register
  }
}, {
  persist: {
    storage: sessionStorage,
    paths: ['loginForm', 'registerForm']
  }
})

export default useForm;