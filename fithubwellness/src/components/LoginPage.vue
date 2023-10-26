<template>
    <div>
        <button @click="login">Login</button>
    </div>
</template>
  
<script>
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const { loginWithRedirect, isAuthenticated } = useAuth0();
        const router = useRouter();

        const login = () => {
            loginWithRedirect();
        };

        if (isAuthenticated) {
            router.push({ name: 'home' });
        }

        return {
            login,
            isAuthenticated,
        };
    },
};
</script>
  