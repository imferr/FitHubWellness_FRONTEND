<template>
    <NavBarHome />
    <div class="home">
        
    </div>
</template>

<script>

import { useAuth0 } from '@auth0/auth0-vue';
import NavBarHome from './NavBarHome.vue';

export default {
    setup() {
        const { loading, user } = useAuth0();
        return {
            loading,
            user
        };
    },
    components: { NavBarHome }
};

</script>
