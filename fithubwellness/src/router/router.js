import { createRouter, createWebHistory } from 'vue-router';
import PrincipalPage from '../components/PrincipalPage.vue';
import PerfilPage from '../components/PerfilPage.vue';
import HomePage from '../components/HomePage.vue';
import ObjetivosPage from '../components/ObjetivosPage.vue';
import NewObjetivoPage from '../components/NewObjetivoPage.vue';

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
    {
        path: '/home',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/objetivos',
        name: 'objetivos',
        component: ObjetivosPage,
    },
    {
        path: '/newobjetivo',
        name: 'newobjetivo',
        component: NewObjetivoPage,
    },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;