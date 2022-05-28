import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import messagePlugin from './services/message.plugin';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

createApp(App)
  .use(store)
  .use(router)
  .use(messagePlugin)
  .mount('#app');
