import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// create the app
import App from './App.vue';
const app = createApp(App);

//import route specific components
import ExamplePage from './pages/ExamplePage';
import HomePage from './pages/HomePage';

// add routing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ExamplePage },
    { path: '/examples', component: ExamplePage },
  ],
});
app.use(router);

// Global components
import BaseCard from './components/UI/BaseCard.vue';
import TheHeader from './components/layouts/TheHeader';
import BaseButton from './components/UI/BaseButton';
import BaseUl from './components/UI/BaseUl';
import FaqCard from './components/UI/FaqCard';
app.component('BaseUl', BaseUl);
app.component('BaseButton', BaseButton);
app.component('BaseCard', BaseCard);
app.component('TheHeader', TheHeader);
app.component('FaqCard', FaqCard);

app.mount('#app');
