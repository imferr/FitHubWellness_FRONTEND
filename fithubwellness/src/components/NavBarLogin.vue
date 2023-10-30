<template>
    <div class="navbar-login">
        <div class="navbar__logo">
            <img src="../assets/logo.png" alt="logo" />
        </div>
        <div class="navbar__links">
            <LoginButton />
        </div>
    </div>
</template>


<script>

import LoginButton from '../buttons/LoginButton.vue';
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  components: {
    LoginButton,
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