import { createRouter, createWebHistory } from 'vue-router';
import PrincipalPage from '../components/PrincipalPage.vue';

const routes = [
    {
        path: '/',
        name: 'principal',
        component: PrincipalPage,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;