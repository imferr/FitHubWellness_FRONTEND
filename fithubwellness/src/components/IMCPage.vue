<template>
    <NavBarHome/>
    <div class="imc-container">
        <div class="imc-card">
            <!-- Contenido de la tarjeta izquierda -->
        </div>
        <div class="imc-card">
            <!-- Contenido de la tarjeta derecha -->
        </div>
    </div>
  </template>
  
  <script>
  import NavBarHome from '../components/NavBarHome.vue';
  
  export default {
    components: { NavBarHome },
  };
  </script>
  
  <style>
  .imc-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 2% 5%; 
  }
  
  .imc-card {
    background-color: white;
    flex: 0 0 45%;
    margin: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 4px;
    padding: 20px;
    height: 300px;
  }
  
  @media (max-width: 500px) {
    .imc-card {
      flex: 0 0 90%;
      height: auto;
    }
  }
  </style>
  