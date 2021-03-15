import Vue from 'vue'
import VueRouter from 'vue-router'
import toyApp from '../views/toy-app.vue'
import toyEdit from '../views/toy-edit.vue'
import toyHome from '../views/toy-home.vue'
import toyDetails from '../views/toy-details.vue'
import dashboard from '../views/dashboard.vue'
import userLogin from '../views/user-login.vue'
import reviewPage from '../views/review-page.vue'
import userDetails from '../views/user-details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: toyHome
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/review',
    name: 'review',
    component: reviewPage
  },
  {
    path: '/toy',
    name: 'toyApp',
    component: toyApp
  },
  {
    path: '/toy/edit/:toyId?',
    name: 'toyEdit',
    component: toyEdit
  },
  {
    path: '/toy/:toyId',
    name: 'toyDetails',
    component: toyDetails
  },
  {
    path: '/login',
    name: 'userLogin',
    component: userLogin
  },
  {
    path: '/user/:userId',
    name: 'userDetails',
    component: userDetails
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
