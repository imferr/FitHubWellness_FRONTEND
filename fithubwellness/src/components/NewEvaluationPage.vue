<template>
  <NavBarHome />
  <div class="evaluation-container">
    <div class="evaluation">
      <div class="encabezado">
        <img src="../assets/logo-dark.png" alt="" height="70" width="70" />
        <h1>Nueva Evaluación</h1>
      </div>
      <form class="formulario-evaluation" @submit.prevent="submitEvaluation">
        <label for="weight">Peso (kg):</label>
        <input
          type="number"
          id="weight"
          v-model.number="weight"
          step="any"
          placeholder="Ingrese su peso en kilogramos"
        />
        <label for="height">Altura (cm):</label>
        <input
          type="number"
          id="height"
          v-model.number="height"
          placeholder="Ingrese su altura en centímetros"
        />
        <div class="save-data">
          <button class="save-button" type="submit">GUARDAR</button>
          <button class="volver-button" type="button" @click="goHome">
            VOLVER
          </button>
        </div>
      </form>
    </div>
    <div class="evaluation-actual">
      <div class="encabezado-actual">
        <img src="../assets/logo-dark.png" alt="" height="70" width="70" />
        <h1>Evaluación Actual</h1>
      </div>
      <form
        class="formulario-evaluation-salida"
        @submit.prevent="submitEvaluation"
      >
        <label for="height">Última actualización:</label>
        <input type="date" id="lastUpdate" placeholder="Última actualización" />
        <label for="weight">Peso (kg):</label>
        <input
          type="number"
          id="weight"
          placeholder="Ingrese su peso en kilogramos"
        />
        <label for="height">Altura (cm):</label>
        <input
          type="number"
          id="height"
          placeholder="Ingrese su altura en centímetros"
        />
        <label for="height">Índice de masa corporal (IMC):</label>
        <input
          type="number"
          id="imc"
          placeholder="Su índice de masa corporal"
        />
        <label for="height">Estado (IMC):</label>
        <input type="text" id="estado" placeholder="Su estado según el IMC" />
      </form>
    </div>
  </div>
</template>

<script>
import NavBarHome from "@/components/NavBarHome";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  components: {
    NavBarHome,
  },
  data() {
    return {
      weight: "",
      height: "",
      userId: null,
    };
  },
  mounted() {
    this.userId = this.$route.params.id;
  },
  methods: {
    async submitEvaluation() {
      if (!this.validateFields()) {
        return;
      }
      const evaluationData = {
        weight: this.weight,
        height: this.height,
      };
      try {
        await this.apiUpdateEvaluation(this.userId, evaluationData);
        await Swal.fire(
          "¡Éxito!",
          "La evaluación se ha actualizado correctamente.",
          "success"
        );
      } catch (error) {
        Swal.fire(
          "Error",
          "Hubo un problema al actualizar la evaluación.",
          "error"
        );
      }
    },
    async apiUpdateEvaluation(userId, evaluationData) {
      return axios.put(
        `http://localhost:8080/api/v1/evaluation/update/${userId}`,
        evaluationData
      );
    },
    validateFields() {
      if (this.weight === "" || this.height === "") {
        Swal.fire("Error", "Todos los campos deben estar llenos.", "error");
        return false;
      }
      if (
        this.weight < 20 ||
        this.weight > 300 ||
        this.height < 120 ||
        this.height > 250
      ) {
        Swal.fire(
          "Error",
          "El peso y la altura deben estar en un rango válido.",
          "error"
        );
        return false;
      }
      return true;
    },
    goHome() {
      this.$router.push({ name: "home", params: { userId: this.userId } });
    },
  },
};
</script>

<style>
.evaluation-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 2% 5%;
}

.evaluation,
.evaluation-actual {
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

.new-evaluation h1 {
  text-align: start;
}

.formulario-evaluation,
.formulario-evaluation-salida {
  display: flex;
  flex-direction: column;
}

.formulario-evaluation label,
.formulario-evaluation-salida label {
  display: block;
  margin: 10px;
  font-weight: bold;
}

.formulario-evaluation input,
.formulario-evaluation-salida input {
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
  .evaluation,
  .evaluation-actual {
    flex: 0 0 40%;
  }
}

.encabezado {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.encabezado img,
.encabezado-actual img {
  margin-right: 20px;
}

.encabezado-actual {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

@media (max-width: 500px) {
  .evaluation,
  .evaluation-actual {
    flex: 0 0 90%;
  }
}

.formulario-evaluation-salida {
  overflow: auto;
}
</style>
