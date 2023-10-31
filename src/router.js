//import route specific components
import ExamplePage from './pages/ExamplePage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

// add routing
import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/examples', component: ExamplePage },
    { path: '/admin', component: AdminPage },
  ],
});
export default router;
