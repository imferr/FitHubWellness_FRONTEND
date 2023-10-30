<template>
  <div class="navbar-login">
      <div class="navbar__logo">
          <img src="../assets/logo.png" alt="logo" />
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

<style>

.navbar-login {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    color: white;
    padding: 10px;
}

.navbar-login img {
    width: 60px;
    height: 60px;
    margin: 5px;
}

</style>