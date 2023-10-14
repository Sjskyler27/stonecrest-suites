import { createApp } from 'vue';
import App from './App.vue';
import BaseCard from './components/UI/BaseCard.vue';
import TheHeader from './components/layouts/TheHeader';
import BaseButton from './components/UI/BaseButton';
import BaseUl from './components/UI/BaseUl';
import FaqCard from './components/UI/FaqCard';

const app = createApp(App);
app.component('BaseUl', BaseUl);
app.component('BaseButton', BaseButton);
app.component('BaseCard', BaseCard);
app.component('TheHeader', TheHeader);
app.component('FaqCard', FaqCard);
app.mount('#app');
