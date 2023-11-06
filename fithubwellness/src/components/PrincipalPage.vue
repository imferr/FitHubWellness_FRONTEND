<template>
  <div class="login">
    <div v-if="isAuthenticated"></div>
    <div v-else>
      <div class="login-container">
        <NavBarLogin />
      </div>
    </div>
  </div>
</template>
  
<script>
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';
import { watchEffect } from 'vue';
import NavBarLogin from '../components/NavBarLogin.vue';

export default {
  components: {
    NavBarLogin
  },
  setup() {
    const { isAuthenticated } = useAuth0();
    const router = useRouter();

    watchEffect(() => {
      if (isAuthenticated.value) {
        if (router.currentRoute.value.path !== '/home') {
          router.push('/home');
        }
      }
    });

    return {
      isAuthenticated
    };
  }
};
</script>

<style>

body {
  background-image: url('../assets/fondo.gif');
  margin: 0;
}
</style>
