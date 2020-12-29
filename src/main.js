import Vue from 'vue'
import App from './App.vue'
import 
  { MdButton, MdApp, MdField, MdElevation, MdIcon, MdContent, MdDivider, MdProgress, MdToolbar, MdList, MdTabs, MdCard, MdTooltip }
 from 
'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import router from './router'
import axios from 'axios'


Vue.prototype.$axios = axios
Vue.use(MdTooltip)
Vue.use(MdCard)
Vue.use(MdTabs)
Vue.use(MdButton)
Vue.use(MdApp)
Vue.use(MdField)
Vue.use(MdElevation)
Vue.use(MdIcon)
Vue.use(MdContent)
Vue.use(MdDivider)
Vue.use(MdProgress)
Vue.use(MdToolbar)
Vue.use(MdList)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
