<template>
  <div class="navbar-login">
    <div class="navbar-logo">
      <img src="../assets/logo.png" alt="logo" />
      <p>FITHUB WELLNESS<br>Bienvenido/a {{ user.name }}</p>
    </div>
    <div class="navbar-links">
      <a href="/inicio">INICIO</a>
      <a href="/imc">IMC</a>
      <a href="/mis-rutinas">MIS RUTINAS</a>
      <a href="/perfil">PERFIL</a>
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
    const { isAuthenticated, user } = useAuth0();

    return {
      isAuthenticated,
      user
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.navbar-login img {
  width: 60px;
  height: 60px;
  margin: 5px;
}

.navbar-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo p {
  font-size: 15px;
  font-weight: bold;
  color: white;
  padding-left: 5px;
}

.navbar-links {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 15px;
}

.navbar-links a {
  margin-right: 15px;
  color: white;
  text-decoration: none;
}

.navbar-links a:hover {
  text-decoration: underline;
  scale: 1.1;
  transition: 0.5s;
}

</style>
