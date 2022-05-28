import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'firebase/database';

import App from './App.vue';
import router from './router';
import store from './store';
import messagePlugin from './services/message.plugin';

import './registerServiceWorker';

import 'materialize-css/dist/js/materialize.min';

initializeApp({
  apiKey: 'AIzaSyAkXN49oVAr7e_cfypDHsHiskoqpnUiQ08',
  authDomain: 'mycrm-a67ae.firebaseapp.com',
  projectId: 'mycrm-a67ae',
  storageBucket: 'mycrm-a67ae.appspot.com',
  messagingSenderId: '794021724602',
  appId: '1:794021724602:web:91bf1c47bf333e0cf1dd83',
});

const auth = getAuth();
let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(messagePlugin)
      .mount('#app');
  }
});
