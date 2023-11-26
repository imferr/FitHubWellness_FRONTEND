<template>
  <div class="navbar-login">
    <div class="navbar-logo">
      <img src="../assets/logo.png" alt="logo" />
      <p>BIENVENIDO A FITHUB WELLNESS</p>
    </div>
    <div class="navbar-links">
      <a href="" @click="goHome()">Inicio</a>
      <a href="" @click="goGoal()">Objetivos y Personal Record</a>
      <a href="" @click="goEvaluation()">Evaluación</a>
      <div class="dropdown">
        <img @click="toggleDropdown" :src="user.picture" alt="User" class="user-photo" />
        <div v-if="showDropdown" class="dropdown-content">
          <a href="" @click="goPerfil()">Ver Perfil</a>
          <a @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  data() {
    return {
      showDropdown: false,
    };
  },
  setup() {
    const { isAuthenticated, user, logout } = useAuth0();

    return {
      isAuthenticated,
      user,
      logout
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    goHome() {
      this.$router.push({ name: "home", params: { userId: this.userId } });
    },
    goGoal() {
      this.$router.push({ name: "objetivos", params: { userId: this.userId } });
    },
    goEvaluation() {
      this.$router.push({ name: "newevaluation", params: { userId: this.userId } });
    },
    goPerfil() {
      this.$router.push({ name: "perfil", params: { userId: this.userId } });
    },
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
  justify-content: space-between;
  align-items: center;
  margin-right: 15px;
}

.navbar-links a {
  margin-right: 40px;
  color: white;
  text-decoration: none;
}

.navbar-links a:hover {
  text-decoration: underline;
  scale: 1.1;
  transition: 0.5s;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.user-photo {
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid white;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: black;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #575757;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
