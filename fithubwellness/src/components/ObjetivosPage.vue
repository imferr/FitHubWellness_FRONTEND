<template>
  <NavBarHome />
  <div class="objetivos-container">
    <div class="objetivo-card">
      <div>
        <h1>Objetivos</h1>
        <h3>Objetivos cumplidos</h3>
        <h3>Objetivos por cumplir</h3>
      </div>
    </div>

    <div class="objetivos-card">
      <div class="encabezado">
        <img src="../assets/logo-dark.png" alt="" height="70" width="70" />
        <h1>Nuevo Objetivo</h1>
      </div>
      <form class="formulario-goal">
        <label for="typegoal">Quiero:</label>
        <select id="typegoal" name="typegoal">
          <option v-for="typegoal in typeGoalList" :key="typegoal.typeGoal" :value="typegoal.typeGoal">
            {{ typegoal.typeGoal }}
          </option>
        </select>

        <label for="weightOrReps">Peso / repeticiones / kilos:</label>
        <input type="text" id="weightOrReps" name="weightOrReps" placeholder="Ingrese una cantidad">

        <label for="exercise">Ejercicio:</label>
        <select id="exercise" name="exercise">
          <option v-for="exercise in exerciseList" :key="exercise.name" :value="exercise.name">
            {{ exercise.name }}
          </option>
        </select>

        <div class="save-data">
          <router-link to="/">
            <SaveButton />
          </router-link>
          <a href="" @click="goGoal()">
            <VolverButton />
          </a>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import NavBarHome from '../components/NavBarHome.vue';
import VolverButton from '../buttons/VolverButton.vue';
import SaveButton from '../buttons/SaveButton.vue';

export default {
  components: {
    NavBarHome,
    VolverButton,
    SaveButton
  },
  methods: {
    goGoal() {
      this.$router.push(`/home/${this.userId}`);
    },
    async getExerciseList() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/exercise');
        this.exerciseList = response.data;
      } catch (error) {
        console.error('Error al obtener la lista de ejercicios', error);
      }
    },
    async getTypeGoalList() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/typegoal');
        this.typeGoalList = response.data;
      } catch (error) {
        console.error('Error al obtener la lista de tipos de objetivos', error);
      }
    }
  },
  data() {
    return {
      userId: null,
      typeGoalList: [],
      exerciseList: []
    };
  },
  mounted() {
    this.userId = this.$route.params.id;
    this.getExerciseList();
    this.getTypeGoalList();
  }
}
</script>
  
<style>
.objetivos-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 2% 5%;
  overflow: auto;
  height: 75vh;
}

.objetivo-card {
  background-color: white;
  flex: 0 0 45%;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 20px;
  height: 65vh;
  display: flex;
  flex-direction: column;
}

.objetivos-card {
  background-color: white;
  flex: 0 0 45%;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 20px;
  height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media screen and (min-width: 500px) {

  .objetivos-card,
  .objetivo-card {
    flex: 0 0 40%;
  }
}

@media (max-width: 850px) {

  .objetivos-card,
  .objetivo-card {
    flex: 0 0 90%;
  }
}

.buttonAdd,
.buttonAdd1 {
  display: flex;
  justify-content: flex-end;
}


.formulario-goal {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.formulario-goal label {
  display: block;
  margin: 10px;
  font-weight: bold;
}

.formulario-goal input,
.formulario-goal select {
  width: 100%;
  padding: 15px;
  margin-bottom: 5px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid #ccc;
}

.save-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>
