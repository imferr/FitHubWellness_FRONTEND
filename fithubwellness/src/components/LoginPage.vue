<template>
    <div class="login">
      <div v-if="isAuthenticated">
        <HomePage />
        <LogoutButton />
      </div>
      <div v-else>
        <LoginButton />
        <SignupButton />
      </div>
    </div>
  </template>
  
  <script>
  import { useAuth0 } from '@auth0/auth0-vue';
  import HomePage from '../components/HomePage.vue';
  import LoginButton from '../buttons/LoginButton.vue';
  import LogoutButton from '../buttons/LogoutButton.vue';
  import SignupButton from '../buttons/SignupButton.vue';
  
  export default {
    components: {
      HomePage,
      LoginButton,
      LogoutButton,
      SignupButton
    },
    setup() {
      const { isAuthenticated } = useAuth0();
  
      return {
        isAuthenticated
      };
    }
  };
  </script>
  