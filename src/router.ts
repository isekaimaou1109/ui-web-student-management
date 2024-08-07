import { createRouter, createWebHistory, type Router } from 'vue-router'
// import { inject } from 'vue'
// import { VueCookies } from 'vue-cookies'

// import { Socket } from 'socket.io-client'
// import socketPlugin from './socket'

import HomeView from '@views/HomeView.vue'
import LoginView from '@views/LoginView.vue'
import EmployeeOverviewView from '@views/employee/DashboardOverviewView.vue'
import EmployeeDocumentView from '@views/employee/DashboardDocumentView.vue'

const routes = [
  { name: 'login', path: '/login', component: LoginView },
  { name: 'home', path: '/', component: HomeView },
  {
    path: '/dashboard',
    children: [
      { 
        path: 'employee/:uuid', 
        children: [
          {
            path: 'overview',
            name: 'employee_dashboard_overview', 
            component: EmployeeOverviewView,
          },
          {
            path: 'documents',
            name: 'employee_dashboard_documents', 
            component: EmployeeDocumentView,
          }
        ]
      }
    ], 
  },
  // { name: 'register', path: '/register', component: HelloWorld },
]

export const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach(async (from, to, next) => {
//   let accessToken, refreshToken;
//   const $cookies = inject<VueCookies>('$cookies'); 
//   $cookies && (accessToken = $cookies.get('accessToken'))
//   $cookies && (refreshToken = $cookies.get('refreshToken'))
  
//   if (to.name === 'login') {
//     if (accessToken && refreshToken) {
//       /** Đã đăng nhập rồi thì 100% có access và refresh token nên check
//        *  xem. Nếu hợp lệ thì redirect về trang "home", nếu không hợp lệ
//        *  thì request lên server để lấy xsrf token rồi mới next tới trang
//        *  "login"
//        */
//     } else {
//       /** Chưa có access và refresh token hoặc có 1 trong 2 cái token nên 
//        *  gửi 1 request lên server để lấy xsrf token rồi mới next tới trang
//        *  "login"
//        */
//     }
//   }
// })