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
              {{ goal.exerciseName }}</span><span>, lo cumpliste el <b>{{ goal.accomplishedDate }}</b></span>
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
                {{ goal.exerciseName }}</span><span>, te lo propusiste el <b>{{ goal.date }}</b></span>
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
          placeholder="Ingrese una cantidad" min="1">

        <label for="exercise" :class="{ 'label-disabled': selectedTypeGoalId === 3 }">Ejercicio:</label>
        <select v-model="selectedExerciseName" id="exercise" name="exercise" :disabled="selectedTypeGoalId === 3">
          <option disabled value="" v-if="selectedTypeGoalId === 3">Deshabilitado</option>
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
      uncompletedGoals: []
    };
  },
  mounted() {
    this.userId = this.$route.params.id;
    this.getExerciseList();
    this.getTypeGoalList();
    this.fetchGoals();
  },
  watch: {
    selectedTypeGoalId(newVal) {
      if (newVal === 2 && this.quantity) {
        this.quantity = Math.floor(this.quantity);
      }
    },
    quantity(newVal) {
      if (this.selectedTypeGoalId === 2) {
        if (isNaN(parseFloat(newVal))) {
          this.quantity = '';
        } else {
          this.quantity = Math.floor(newVal);
        }
      }
    }
  },
  methods: {
    async submitGoal() {
      if (!this.validateFields()) {
        return;
      }
      Swal.fire({
        title: 'Registrando objetivo...',
        onBeforeOpen: () => {
          Swal.showLoading()
        },
        allowOutsideClick: () => !Swal.isLoading(),
        showConfirmButton: false
      });
      try {
        const goalData = {
          quantity: this.quantity,
          exerciseName: this.selectedExerciseName
        };
        const url = `http://localhost:8080/api/v1/goal/create/user/${this.userId}/typeGoal/${this.selectedTypeGoalId}`;
        await axios.post(url, goalData);
        this.fetchGoals();
        Swal.fire({
          icon: 'success',
          title: '¡Objetivo creado con éxito!',
          text: 'El objetivo se ha registrado correctamente, se encuentra al final de la lista Objetivos por Cumplir.',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        let errorMessage = 'Ocurrió un error inesperado. Intente nuevamente más tarde.';
        if (error.response && error.response.data && typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el objetivo',
          text: errorMessage
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
      if (!this.selectedTypeGoalId || !this.quantity || (this.selectedTypeGoalId !== 3 && !this.selectedExerciseName)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Todos los campos deben ser llenados'
        });
        return false;
      }
      if (this.quantity <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La cantidad debe ser mayor a 0'
        });
        return false;
      }
      return true;
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
}

.label-disabled {
  opacity: 0.5;
}

#exercise:disabled {
  background-color: #e9ecef;
  color: #6c757d;
}

#exercise:disabled::placeholder {
  color: #6c757d;
}


.save-button {
  font-weight: bold;
  background-color: black;
  border: 2px solid white;
  color: white;
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
  cursor: pointer;
}

.save-button a {
  color: white;
  text-decoration: none;
}

.save-button:hover {
  border: 2px solid black;
  background-color: white;
  color: black;
  scale: 1.1;
  transition: 0.5s;
}

.save-button:hover a {
  color: black;
  text-decoration: none;
}
</style>
