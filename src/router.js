//import route specific components
import SelectionPage from './pages/SelectionPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

// add routing
import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/selection', component: SelectionPage },
    { path: '/admin', component: AdminPage },
  ],
});
export default router;
