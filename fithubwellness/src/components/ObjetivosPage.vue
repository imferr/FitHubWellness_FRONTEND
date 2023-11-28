<template>
  <NavBarHome />
  <div class="objetivos-container">
    <div class="objetivo-card">
      <div>
        <h1>Objetivos</h1>
        <h3>Objetivos Cumplidos</h3>
        <ul>
          <li v-for="goal in completedGoals" :key="goal.goalId">
            • {{ goal.typeGoalId.typeGoal }} ({{ goal.quantity }} <span
              v-if="goal.typeGoalId.typeGoalId === 1 || goal.typeGoalId.typeGoalId === 3">Kg</span><span
              v-else-if="goal.typeGoalId.typeGoalId === 2">Reps</span>) <span v-if="goal.typeGoalId.typeGoalId !== 3">en
              {{ goal.exerciseName }}</span>
          </li>
        </ul>
      </div>
      <div>
        <h3>Objetivos por Cumplir</h3>
        <div class="goalFalse">
          <ul>
            <li v-for="goal in uncompletedGoals" :key="goal.goalId">
              • {{ goal.typeGoalId.typeGoal }} ({{ goal.quantity }} <span
                v-if="goal.typeGoalId.typeGoalId === 1 || goal.typeGoalId.typeGoalId === 3">Kg</span><span
                v-else-if="goal.typeGoalId.typeGoalId === 2">Reps</span>) <span v-if="goal.typeGoalId.typeGoalId !== 3">en
                {{ goal.exerciseName }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="objetivos-card">
      <div class="encabezado">
        <img src="../assets/logo-dark.png" alt="" height="70" width="70" />
        <h1>Nuevo Objetivo</h1>
      </div>
      <form class="formulario-goal" @submit.prevent="submitGoal">
        <label for="typegoal">Quiero:</label>
        <select v-model="selectedTypeGoalId" id="typegoal" name="typegoal">
          <option v-for="typegoal in typeGoalList" :key="typegoal.typeGoalId" :value="typegoal.typeGoalId">
            {{ typegoal.typeGoal }}
          </option>
        </select>

        <label for="weightOrReps">Peso / repeticiones / kilos:</label>
        <input v-model.number="quantity" type="number" id="weightOrReps" name="weightOrReps" step="any"
          placeholder="Ingrese una cantidad">

        <label for="exercise">Ejercicio:</label>
        <select v-model="selectedExerciseName" id="exercise" name="exercise">
          <option v-for="exercise in exerciseList" :key="exercise.name" :value="exercise.name">
            {{ exercise.name }}
          </option>
        </select>

        <div class="save-data">
          <button class="save-button" type="submit">GUARDAR</button>
          <router-link to="/">
            <VolverButton />
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavBarHome from '../components/NavBarHome.vue';
import VolverButton from '../buttons/VolverButton.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    NavBarHome,
    VolverButton
  },
  data() {
    return {
      userId: null,
      typeGoalList: [],
      exerciseList: [],
      selectedTypeGoalId: null,
      selectedExerciseName: null,
      quantity: null,
      goals: [],
      completedGoals: [],
      uncompletedGoals: [],
    };
  },
  mounted() {
    this.userId = this.$route.params.id;
    this.getExerciseList();
    this.getTypeGoalList();
    this.fetchGoals();
  },
  methods: {
    async submitGoal() {
      if (!this.validateFields()) {
        return;
      }
      try {
        const goalData = {
          quantity: this.quantity,
          exerciseName: this.selectedExerciseName,
        };
        const url = `http://localhost:8080/api/v1/goal/create/user/${this.userId}/typeGoal/${this.selectedTypeGoalId}`;
        await axios.post(url, goalData);
        Swal.fire({
          icon: 'success',
          title: '¡Objetivo creado con éxito!',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el objetivo',
          text: 'Ocurrió un problema al procesar la solicitud. Inténtelo de nuevo.',
        });
      }
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
    },
    async fetchGoals() {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/goal/user/${this.userId}`);
        this.goals = response.data.goals;
        this.classifyGoals();
      } catch (error) {
        console.error('Error al obtener los objetivos', error);
      }
    },
    classifyGoals() {
      this.completedGoals = this.goals.filter(goal => goal.accomplished);
      this.uncompletedGoals = this.goals.filter(goal => !goal.accomplished);
    },
    validateFields() {
      return this.selectedTypeGoalId && this.quantity && this.selectedExerciseName;
    }
  }
};
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

.objetivo-card ul {
  padding-left: 20px;
  list-style: none;
  overflow-y: auto;
  max-height: 30vh;
  margin-bottom: 10px;
}

.objetivo-card li {
  margin-bottom: 5px;
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
}</style>
