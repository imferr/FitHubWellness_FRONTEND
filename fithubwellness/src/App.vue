<template>
  <div>
    <p>Hola</p>
    <button @click="login">Login</button>
  </div>
</template>

<script>

import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { loginWithPopup } = useAuth0();

    return {
      login: () => {
        loginWithPopup();
      }
    }
  }
}

</script>