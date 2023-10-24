//import route specific components
import ExamplePage from './pages/ExamplePage';
import HomePage from './pages/HomePage';

// add routing
import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/examples', component: ExamplePage },
  ],
});
export default router;
