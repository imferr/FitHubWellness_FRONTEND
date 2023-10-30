<template>
    <div class="home">
        <div v-if="loading">Cargando...</div>
        <div v-else>
            <div v-if="user">
                <h1>Hola {{ user.name }}</h1>
                <h2>{{ user.email }}</h2>
            </div>
            <div v-else>
                <h1>Hola, bienvenido a FitHub</h1>
                <p>Por favor, inicia sesión para continuar.</p>
            </div>
        </div>
    </div>
</template>

<script>

import { useAuth0 } from '@auth0/auth0-vue';

export default {
    setup() {
        const { loading, user } = useAuth0();

        return {
            loading,
            user
        };
    }
};

</script>
