<template>
    <div>
        <p>Hola al home</p>
        <button @click="handleLogout">Logout</button>
    </div>
</template>

<script>

import { useAuth0 } from '@auth0/auth0-vue';

export default {
    setup() {
        const { logout } = useAuth0();

        const handleLogout = () => {
            logout({ returnTo: window.location.origin });
        };

        return {
            handleLogout,
        };
    },
};
</script>
