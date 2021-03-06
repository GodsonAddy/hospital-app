import Vue from 'vue'
import App from './App.vue'
import 
  { MdButton, MdApp, MdField, MdElevation, MdIcon, MdContent,
    MdDivider, MdProgress, MdToolbar, MdList, MdTabs, MdCard,
    MdTooltip, MdDialog,MdDrawer,MdTable,MdEmptyState, MdCheckbox, MdRipple
  }
 from 
'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import router from './router'
import firebase from 'firebase'
import 'firebase/database'
import DateSettings from './filter/date'
import VueSimpleAlert from "vue-simple-alert";

Vue.config.productionTip = false

Vue.use(VueSimpleAlert, { reverseButtons: true });
Vue.filter('date', DateSettings)
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
Vue.use(MdDialog)
Vue.use(MdDrawer)
Vue.use(MdTable)
Vue.use(MdEmptyState)
Vue.use(MdCheckbox)
Vue.use(MdRipple)
Vue.filter('str_limit', function (value, size) {
  if (!value) return '';
  value = value.toString();

  if (value.length <= size) {
    return value;
  }
  return value.substr(0, size) + '...';
});


var firebaseConfig = {
  apiKey: "AIzaSyDemDglePalyarBdMmfiaoREG73Dyw2rJw",
  authDomain: "hospital-app-d0b27.firebaseapp.com",
  databaseURL: "https://hospital-app-d0b27-default-rtdb.firebaseio.com",
  projectId: "hospital-app-d0b27",
  storageBucket: "hospital-app-d0b27.appspot.com",
  messagingSenderId: "525162436655",
  appId: "1:525162436655:web:d42a973c4ec06e84ceceda",
  measurementId: "G-YB027JLENJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.database()


let app;
firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      router, 
      render: h => h(App)
    }).$mount('#app')
    console.log(user)

  }
})
