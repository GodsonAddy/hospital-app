import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import LogIn from '../views/LogIn.vue'
import Home from '../views/Home.vue'
import ComposeMessage from '@/components/NavigationTabs/ComposeMessage'
import Inbox from '@/components/NavigationTabs/Inbox'
import SentMessages from '@/components/NavigationTabs/SentMessages'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path : '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresGuest: true
    }
  },
  {
    path : '/login',
    name: 'LogIn',
    component: LogIn,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: `/user`,
    name: 'user',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
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
  },
  {
    path: '/sentMessages',
    name: 'SentMessages',
    component: SentMessages
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else{
      next()
    }
  }
  else if(to.matched.some(record => record.meta.requiresGuest)) {
    if(firebase.auth().currentUser) {
      next({
        path:  '/user',
        query: {
          redirect: to.fullPath
        }
      })
    }
    else{
      next()
    }
  }
  else {
    next()
  }
})
export default router
