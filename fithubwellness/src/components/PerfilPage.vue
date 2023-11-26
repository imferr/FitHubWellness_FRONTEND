<template>
  <NavBarHome />
  <div class="container-perfil">
    <div class="perfil-left"></div>
    <div class="historial-right"></div>
  </div>
</template>

<script>
import NavBarHome from "../components/NavBarHome.vue";

export default {
  components: { NavBarHome },
};
</script>

<style>

.container-perfil {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 2% 5%;
  overflow: auto;
  height: 75vh;
}

.perfil-left {
  background-color: rgba(255, 255, 255, 0.486);
  flex: 0 0 45%;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
  height: auto;
  border-radius: 20px;
}

.historial-right {
  background-color: white;
  flex: 0 0 45%;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
  height: auto;
  border-radius: 20px;
}

@media screen and (min-width: 500px) {
  .historial-right, .perfil-left {
    flex: 0 0 40%;
  }
}

@media (max-width: 850px) {
  .historial-right, .perfil-left {
    flex: 0 0 90%;
  }
}

</style>
