<template>
  <NavBarHome />
  <div class="objetivos-container">
    <div class="objetivos-card">
      <h1>Objetivos</h1>
      <h3>Objetivos cumplidos</h3>
      <!--Contenido de los objetivos cumplidos-->
      <h3>Objetivos por cumplir</h3>
      <!--Contenido de los objetivos pendientes-->
      <div class="buttonAdd"><a href="/newobjetivo"><AddButton /></a></div>
    </div>
    <div class="objetivos-card">
      <h1>Personal Record</h1>
      <p>Registra tus mejores marcas, pesos y repeticiones!</p>
      <!--Contenido de los personal record-->
      <div class="buttonAdd1"><AddButton /></div>
    </div>
  </div>
</template>
  
<script>
import AddButton from '@/buttons/AddButton.vue';
import NavBarHome from '../components/NavBarHome.vue';

export default {
  components: { NavBarHome, AddButton },
};
</script>
  
<style>
.objetivos-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 2% 5%;
}

.objetivos-card {
  background-color: white;
  flex: 0 0 45%;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
  height: auto;
  border-radius: 20px;
}

@media (max-width: 500px) {
  .objetivos-card {
    flex: 0 0 90%;
    height: auto;
  }
}

.buttonAdd, .buttonAdd1 {
  display: flex;
  justify-content: flex-end;
}

</style>
  