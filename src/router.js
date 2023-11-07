//import route specific components
import RoomSelectionPage from './pages/RoomSelectionPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

// add routing
import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/selection', component: RoomSelectionPage },
    { path: '/admin', component: AdminPage },
  ],
});
export default router;
