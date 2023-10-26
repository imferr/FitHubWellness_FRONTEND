<template>
    <div>
      <button @click="logoutUser">Cerrar sesión</button>
    </div>
  </template>
  
  <script>
  import { useAuth0 } from '@auth0/auth0-vue';
  
  export default {
    setup() {
      const { isAuthenticated, logout } = useAuth0();
  
      const logoutUser = async () => {
        if (isAuthenticated.value) {
          try {
            await logout({ returnTo: window.location.origin });
          } catch (error) {
            console.error('Error al cerrar sesión:', error);
          }
        }
      };
  
      return {
        logoutUser
      };
    }
  };
  </script>
  