import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import './assets/styles.scss';
import vClickOutside from 'click-outside-vue3';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCbSHW9pIgFu2KNNWc7TpcdRSeM_wrpI8Q',
  authDomain: 'vue-kanban-b658e.firebaseapp.com',
  databaseURL: 'https://vue-kanban-b658e-default-rtdb.firebaseio.com',
  projectId: 'vue-kanban-b658e',
  storageBucket: 'vue-kanban-b658e.appspot.com',
  messagingSenderId: '1052415451271',
  appId: '1:1052415451271:web:17639ddd5942268c8c9822',
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  createApp(App).use(store).use(vClickOutside).mount('#app');
});
