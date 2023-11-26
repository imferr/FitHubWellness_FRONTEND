import { createRouter, createWebHistory } from 'vue-router';
import PrincipalPage from '../components/PrincipalPage.vue';
import PerfilPage from '../components/PerfilPage.vue';
import HomePage from '../components/HomePage.vue';
import ObjetivosPage from '../components/ObjetivosPage.vue';
import PersonalRecordPage from '../components/PersonalRecordPage.vue';
import NewEvaluationPage from '../components/NewEvaluationPage.vue';
import FirstEvaluationPage from '../components/FirstEvaluationPage.vue';

const routes = [
    {
        path: '/',
        name: 'principal',
        component: PrincipalPage,
    },
    {
        path: '/perfil/:id',
        name: 'perfil',
        component: PerfilPage,
    },
    {
        path: '/home/:id',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/objetivos/:id',
        name: 'objetivos',
        component: ObjetivosPage,
    },
    {
        path: '/record/:id',
        name: 'record',
        component: PersonalRecordPage,
    },
    {
        path: '/newevaluation/:id',
        name: 'newevaluation',
        component: NewEvaluationPage,
    },
    {
        path: '/firstevaluation',
        name: 'firstevaluation',
        component: FirstEvaluationPage,
    },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;