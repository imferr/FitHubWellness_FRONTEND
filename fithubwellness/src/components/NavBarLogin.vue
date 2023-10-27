<template>
    <div class="navbar-login">
        <div class="navbar__logo">
            <img src="../assets/logoauth.jpg" alt="logo" />
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
    background-color: steelblue;
    color: white;
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
}

</style>