<template>
  <div class="login">
    <div v-if="isAuthenticated">
      <NavBarHome />
      <HomePage />
    </div>
    <div v-else>
      <div class="login-container">
        <NavBarLogin />
      </div>
    </div>
  </div>
</template>
  
<script>
import { useAuth0 } from '@auth0/auth0-vue';
import NavBarLogin from '../components/NavBarLogin.vue';
import NavBarHome from '../components/NavBarHome.vue';
import HomePage from './HomePage.vue';

export default {
  components: {
    NavBarLogin,
    NavBarHome,
    HomePage
},
  setup() {
    const { isAuthenticated } = useAuth0();

    return {
      isAuthenticated
    };
  }
};
</script>

<style>

body {
  margin: 0;
}

</style>
