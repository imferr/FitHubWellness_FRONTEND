<template>
    <div class="login">
        <div v-if="isAuthenticated">
            <HomePage />
            <button @click="logout">Cerrar sesión</button>
        </div>
        <div v-else>
            <button @click="login">Iniciar sesión</button>
        </div>
    </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import HomePage from './HomePage.vue';

export default {
    components: {
        HomePage
    },
    setup() {
        const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
        
        return {
            login: () => {
                loginWithRedirect();
            },
            logout: () => {
                logout();
            },
            isAuthenticated
        };
    }
};
</script>
