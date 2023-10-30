import { createRouter, createWebHistory } from 'vue-router';
import PrincipalPage from '../components/PrincipalPage.vue';
import PerfilPage from '../components/PerfilPage.vue';

const routes = [
    {
        path: '/',
        name: 'principal',
        component: PrincipalPage,
    },
    {
        path: '/perfil',
        name: 'perfil',
        component: PerfilPage,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;