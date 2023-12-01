<template>
  <NavBarHome />
  <div class="container-perfil">
    <div class="perfil-left">
      <div class="encabezado-perfil">
        <img src="../assets/logo-dark.png" alt="" height="70" width="70" />
        <h1>Mis Datos</h1>
      </div>
      <div class="img-auth" v-if="isAuthenticated && user">
        <img :src="user.picture" alt="Profile" class="photouser" />
      </div>
      <div class="formulario-perfil">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="userData.name" readonly />

        <label for="correo">Correo:</label>
        <input type="email" id="correo" v-model="userData.email" readonly />

        <label for="cumpleanos">Cumpleaños:</label>
        <input type="date" id="cumpleanos" v-model="userData.birthday" readonly />
      </div>
    </div>
    <div class="historial-right">
      <h2>Resumen de tus datos</h2>
      <form class="evaluation-perfil">
        <p>Tu última actalización el <b>{{ lastUpdate }}</b>, indica que tu peso es de <b>{{ weight1 }} kg</b>, tu altura
          de <b>{{ height1 }} cm</b> y tu índice de masa corporal es de <b>{{ imc }}</b>, esto indica que tu estado es
          <b>{{ estado }}</b>.
        </p>
      </form>
      <br>
      <form class="evaluation-perfil">
        <p v-if="lastAccomplishedGoal">Tu último objetivo cumplido fue:
          {{ lastAccomplishedGoal.typeGoalId.typeGoal }} ({{ lastAccomplishedGoal.quantity }}
          <span
            v-if="lastAccomplishedGoal.typeGoalId.typeGoalId === 1 || lastAccomplishedGoal.typeGoalId.typeGoalId === 3">Kg</span>
          <span v-else-if="lastAccomplishedGoal.typeGoalId.typeGoalId === 2">Reps</span>)
          <span v-if="lastAccomplishedGoal.typeGoalId.typeGoalId !== 3">en {{ lastAccomplishedGoal.exerciseName
          }}</span><span> <b>Felicidades!</b>, ve a cumplir más objetivos</span>
        </p>
        <p v-else>No tienes ningún objetivo cumplido, ve a cumplirlos!</p>
      </form>
      <br>
      <form class="evaluation-perfil">
        <p v-if="record">En tu último personal record lograste alzar
          <span>{{ record.weight }} kg y hacer {{ record.repetitions }} repticiones en {{ record.exerciseName
          }}</span><span>. <b>Buenisima racha!</b></span>
        </p>
        <p v-else>No tienes ningún personal record, ¡ve a marcar rachas!</p>
      </form>
    </div>
  </div>
</template>

<script>
import NavBarHome from "../components/NavBarHome.vue";
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  components: { NavBarHome },
  data() {
    return {
      userData: {
        name: '',
        email: '',
        birthday: ''
      },
      lastUpdate: "",
      weight1: "",
      height1: "",
      imc: "",
      estado: "",
      lastAccomplishedGoal: "",
      record: null
    };
  },
  setup() {
    const route = useRoute();
    const { isAuthenticated, user } = useAuth0();
    return { isAuthenticated, user, route };
  },
  mounted() {
    this.getUserData();
    this.getEvaluationData();
    this.getLastAccomplishedGoal();
    this.getLastPersonalRecord();
  },
  methods: {
    async getUserData() {
      const userId = this.route.params.id;
      const response = await axios.get(`http://localhost:8080/api/v1/user/${userId}`);
      this.userData = response.data;
    },
    async getEvaluationData() {
      try {
        const userId = this.route.params.id;
        const response = await axios.get(`http://localhost:8080/api/v1/evaluation/user/${userId}`);
        this.updateFormData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de la evaluación:", error);
      }
    },
    async getLastAccomplishedGoal() {
      try {
        const userId = this.route.params.id;
        const response = await axios.get(`http://localhost:8080/api/v1/goal/last-accomplished/${userId}`);
        this.lastAccomplishedGoal = response.data;
      } catch (error) {
        console.error("Error al obtener el último objetivo cumplido:", error);
      }
    },
    async getLastPersonalRecord() {
      try {
        const userId = this.route.params.id;
        const response = await axios.get(`http://localhost:8080/api/v1/personalrecord/latest/user/${userId}`);
        this.record = response.data;
      } catch (error) {
        console.error("Error al obtener el último personal record:", error);
      }
    },
    updateFormData(evaluation) {
      this.lastUpdate = evaluation.date;
      this.weight1 = evaluation.weight;
      this.height1 = evaluation.height;
      this.imc = evaluation.imc;
      this.estado = evaluation.state;
    }
  },
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
  height: 65vh;
  border-radius: 20px;
}

.historial-right {
  background-color: white;
  flex: 0 0 45%;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
  height: 65vh;
  border-radius: 20px;
}

.historial-right h1 {
  margin-left: 5px;
}

@media screen and (min-width: 500px) {

  .historial-right,
  .perfil-left {
    flex: 0 0 40%;
  }
}

@media (max-width: 850px) {

  .historial-right,
  .perfil-left {
    flex: 0 0 90%;
  }
}

.formulario-perfil {
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 40%;
}

.formulario-perfil label {
  display: block;
  margin: 10px;
  font-weight: bold;
}

.formulario-perfil input {
  width: 100%;
  padding: 15px;
  margin-bottom: 5px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid #ccc;
}

.encabezado-perfil {
  display: flex;
  align-items: center;
}

.encabezado-perfil img {
  margin-right: 10px;
}

.img-auth {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.photouser {
  width: 150px !important;
  height: auto !important;
  border-radius: 50% !important;
  border: 1px solid black !important;
}

.evaluation-perfil {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  height: 18%;
  background-color: rgba(213, 217, 220, 0.642);
  padding: 15px;
  border-radius: 20px;
}
</style>
