<template>
  <div>
    <button @click="login" class="loginbutton">Iniciar sesión</button>
  </div>
</template>
  
<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { loginWithRedirect } = useAuth0();

    const login = () => {
      loginWithRedirect();
    };

    return {
      login
    };
  }
};
</script>

<style>

.loginbutton {
  background-color: steelblue;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
}

</style>