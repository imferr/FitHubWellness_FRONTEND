<template>
  <NavBarHome />
  <div class="record-container">
    <div class="records-card">
      <div>
        <h1>Personal Record</h1>
        <p>Registra tus mejores marcas, pesos y repeticiones!</p>
      </div>
      <!--Contenido de los personal record-->
    </div>

    <div class="record-card">
      <div class="encabezado">
        <img src="../assets/logo-dark.png" alt="" height="70" width="70" />
        <h1>Nuevo Personal Record</h1>
      </div>
      <form class="form-record">
        <label for="weight">Peso:</label>
        <input type="text" id="weight" name="weight" placeholder="Ingrese una cantidad de peso">

        <label for="reps">Repeticiones:</label>
        <input type="text" id="reps" name="reps" placeholder="Ingrese una cantidad de repeticiones">

        <label for="exercise">Ejercicio:</label>
        <select id="exercise" name="exercise">
          <!-- Add more <option> tags here for each exercise -->
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
import NavBarHome from './NavBarHome.vue';
import VolverButton from '../buttons/VolverButton.vue';
import SaveButton from '../buttons/SaveButton.vue';

export default {
  components: {
    NavBarHome,
    VolverButton,
    SaveButton
  },
  methods: {
    goNewGoal() {
      this.$router.push(`/newobjetivo/${this.userId}`);
    },
    goGoal() {
      this.$router.push(`/home/${this.userId}`);
    }
  },
  data() {
    return {
      userId: null
    }
  },
  mounted() {
    this.userId = this.$route.params.id;
  }
}
</script>
    
<style>
.record-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 2% 5%;
  overflow: auto;
  height: 75vh;
}

.records-card {
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

.record-card {
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
  .record-card, .records-card {
    flex: 0 0 40%;
  }
}

@media (max-width: 850px) {
  .record-card, .records-card {
    flex: 0 0 90%;
  }
}

.buttonAdd,
.buttonAdd1 {
  display: flex;
  justify-content: flex-end;
}


.form-record {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.form-record label {
  display: block;
  margin: 10px;
  font-weight: bold;
}

.form-record input,
.form-record select {
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
    
  