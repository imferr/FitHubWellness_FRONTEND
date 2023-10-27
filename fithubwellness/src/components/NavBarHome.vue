
import LogoutButton from '@/buttons/LogoutButton.vue';
<template>
    <div class="navbar">
        <div class="navbar__logo">
            <img src="../assets/logoauth.jpg" alt="logo" />
        </div>
        <div class="navbar__links">
            <LogoutButton />
        </div>
    </div>
</template>

<script>

import LogoutButton from '../buttons/LogoutButton.vue';
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  components: {
    LogoutButton,
  },
  setup() {
    const { isAuthenticated } = useAuth0();

    return {
      isAuthenticated
    };
  }
};

</script>