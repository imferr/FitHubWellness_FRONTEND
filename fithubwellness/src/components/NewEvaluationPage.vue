<template>
  <NavBarHome />
  <div class="new-evaluation">
    <h1>Nueva Evaluación</h1>
    <form class="formulario-evaluation" @submit.prevent="submitEvaluation">
      <label for="weight">Peso:</label>
      <input type="number" id="weight" v-model.number="weight" />

      <label for="height">Altura (cm):</label>
      <input type="number" id="height" v-model.number="height" />

      <div class="save-data">
        <button class="save-button" type="submit">GUARDAR</button>
        <button class="volver-button" type="button" @click="goHome">VOLVER</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import NavBarHome from "../components/NavBarHome.vue";
import Swal from "sweetalert2";

export default {
  components: { NavBarHome },
  data() {
    return {
      weight: null,
      height: null,
      userId: null,
    };
  },
  created() {
    this.userId = this.$route.params.userId;
  },
  methods: {
    async submitEvaluation() {
      try {
        const evaluationData = {
          weight: this.weight,
          height: this.height,
          userId: this.userId,
        };

        const response = await axios.post(
          "http://localhost:8080/api/v1/evaluation/create",
          evaluationData
        );
        console.log("Evaluación creada:", response.data);
        Swal.fire({
          icon: "success",
          title: "Evaluación creada con éxito",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.$router.push({ name: "home", params: { id: this.userId } });
        });
        
      } catch (error) {
        console.error("Error al enviar la evaluación:", error);
        Swal.fire({
          icon: "error",
          title: "Error al enviar la evaluación",
          text: "Ha ocurrido un error al crear la evaluación. Por favor, inténtalo de nuevo.",
        });
      }
    },
    goHome() {
      this.$router.push({ name: "home", params: { id: this.userId } });
    },
  },
};
</script>

<style>
.new-evaluation {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 80%;
  margin: 50px auto;
  padding: 40px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background-color: white;
}

.new-evaluation h1 {
  text-align: start;
}

.formulario-evaluation {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.formulario-evaluation label {
  display: block;
  margin: 10px;
  font-weight: bold;
}

.formulario-evaluation input {
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

@media screen and (min-width: 500px) {
  .new-evaluation {
    width: 50%;
  }
}

.hidden-button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: auto;
  height: auto;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
</style>
