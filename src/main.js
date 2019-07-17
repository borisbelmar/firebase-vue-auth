import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Bootstrap Vue
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// Fin Bootstrap Vue
// Vuelidate
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
//Fin Vuelidate

var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = require('./config/firebase');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase.firestore();

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    store.dispatch('detectarUsuario', {email: user.email, uid: user.uid});
  } else {
    store.dispatch('detectarUsuario', null);
  }
  //Instancia padre de vue
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});
