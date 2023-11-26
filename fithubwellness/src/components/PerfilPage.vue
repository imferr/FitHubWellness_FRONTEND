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
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem;
  height: 75vh;
}

.perfil-left {
  width: 70%;
  background-color: rgba(255, 255, 255, 0.486);
  border-radius: 20px;
  padding: 15px;
  overflow: auto;
}

.historial-right {
  width: 25%;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  overflow: auto;
}

@media (max-width: 1068px) {   
  .perfil-left {
    margin-right: 15px;
  }
}

@media (max-width: 750px) {
  .container-perfil {
    flex-direction: column;
    align-items: flex-start;
  }

  .perfil-left {
    width: auto;
    margin-bottom: 20px;
  }

  .historial-right {
    width: auto;
  }
}

</style>
