import { createRouter, createWebHistory } from 'vue-router';
import JoinPage from 'C:/VUE/dadok/src/components/JoinPage.vue';

const routes = [
  {
    path: '/JoinPage',
    name: 'JoinPage',
    component: JoinPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
