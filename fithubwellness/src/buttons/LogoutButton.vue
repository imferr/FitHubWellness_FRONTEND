<template>
  <div>
    <button @click="logoutUser" class="logoutbutton">LOG OUT</button>
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

<style>

.logoutbutton {
    font-weight: bold;
    background-color: black;
    border: 2px solid white;
    color: white;
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
    cursor: pointer;
}

.logoutbutton:hover {
    background-color: white;
    color: black;
    scale: 1.1;
    transition: 0.5s;
}

</style>
  