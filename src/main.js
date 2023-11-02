// create the app
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

// get the created router
import router from './router';
app.use(router);

//use store
import store from './store.js';
app.use(store);

// Add Global components
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

// // add font awesome component
// /* import the fontawesome core */
// import { library } from '@fortawesome/fontawesome-svg-core';

// /* import specific icons */
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
// import { faTwitter } from '@fortawesome/free-brands-svg-icons';
// /* add icons to the library */
// library.add(faUserSecret, faTwitter);

// /* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
