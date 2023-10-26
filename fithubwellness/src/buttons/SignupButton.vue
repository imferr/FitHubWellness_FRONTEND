<template>
  <div>
    <button @click="signup" class="signupbutton">Registrarse</button>
  </div>
</template>
  
<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { loginWithRedirect } = useAuth0();

    const signup = async () => {
      try {
        // Utiliza loginWithRedirect para redirigir al usuario a la página de registro de Auth0
        await loginWithRedirect({
          screen_hint: 'signup' // Esto redirige directamente a la página de registro
        });
      } catch (error) {
        console.error('Error al iniciar el registro:', error);
      }
    };

    return {
      signup
    };
  }
};
</script>

<style>

.signupbutton {
  background-color: lightgray;
  border: none;
  padding: 10px;
  border-radius: 20px;
  margin: 5px;
}

</style>