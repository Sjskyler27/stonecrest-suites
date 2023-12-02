//import route specific components
import RoomSelectionPage from './pages/RoomSelectionPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CheckoutPage from './pages/CheckoutPage';

// add routing
import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/selection', component: RoomSelectionPage },
    { path: '/admin', component: AdminPage },
    {
      path: '/checkout',
      component: CheckoutPage,
      props: route => ({
        startTime: route.params.startTime,
        endTime: route.params.endTime,
        roomId: route.params.room_id,
      }),
    },
  ],
});
export default router;
