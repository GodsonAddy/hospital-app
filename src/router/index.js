import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users.vue'
import LogIn from '../views/LogIn.vue'
import Home from '../views/Home.vue'
import ComposeMessage from '@/components/Users/ComposeMessage'
import Inbox from '@/components/Users/Inbox'
import SentMessages from '@/components/Users/SentMessages'
import firebase from 'firebase'
import Admin from '../views/Admin.vue'
import Comments from '@/components/Users/Comments'
import AdminInbox from '@/components/Admin/AdminInbox'
import AdminSentMail from '@/components/Admin/AdminSentMail'
import AdminComment from '@/components/Admin/AdminComment'

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
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user',
    name: 'Users',
    component: Users,
    meta: {
      requiresAuth: true
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    
  },
  {
    path: '/user/compose',
    name: 'ComposeMessage',
    component: ComposeMessage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/comments',
    name: 'Comments',
    component: Comments,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/inbox',
    name: 'Inbox',
    component: Inbox,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/sentMessages',
    name: 'SentMessages',
    component: SentMessages,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/inbox',
    name: 'AdminInbox',
    component: AdminInbox,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mail',
    name: 'AdminSentMail',
    component: AdminSentMail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/comments',
    name: 'AdminComment',
    component: AdminComment,
    meta: {
      requiresAuth: true
    }
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
        path:  '/user/compose',
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
    if(firebase.auth().currentUser.email === 'admin@admin.com') {
      next({
        path:  '/admin',
       
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
