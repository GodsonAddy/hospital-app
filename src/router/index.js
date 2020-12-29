import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LogIn from '../views/LogIn.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import ComposeMessage from '@/components/NavigationTabs/ComposeMessage'
import Inbox from '@/components/NavigationTabs/Inbox'




Vue.use(VueRouter)

const routes = [
  {
    path : '/',
    name: 'Home',
    component: Home
  },
  {
    path : '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path : '/register',
    name: 'Register',
    component: Register
  },
 
  {
    path: '/user',
    name: 'user',
    component: MainPage
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    
  },
  {
    path: '/compose',
    name: 'ComposeMessage',
    component: ComposeMessage
  },
  {
    path: '/inbox',
    name: 'Inbox',
    component: Inbox
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
