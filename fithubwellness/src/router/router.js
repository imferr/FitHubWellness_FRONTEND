import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import HomePage from '../components/HomePage.vue';

const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;