<template>
  <NavBarHome />
  <div class="new-evaluation">
    <h1>Nueva Evaluación</h1>
    <form class="formulario-evaluation" @submit.prevent="submitEvaluation">
      <label for="weight">Peso (kg):</label>
      <input
        type="number"
        id="weight"
        v-model.number="weight"
        @input="validateWeight"
        step="any"
      />
      <label for="height">Altura (cm):</label>
      <input
        type="number"
        id="height"
        v-model.number="height"
        @input="validateHeight"
      />
      <div class="save-data">
        <button class="save-button" type="submit" :disabled="!isValidForm">
          GUARDAR
        </button>
        <button class="volver-button" type="button" @click="goHome">
          VOLVER
        </button>
      </div>
    </form>
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
      weight: null,
      height: null,
      userId: null,
      isValidForm: false,
    };
  },
  mounted() {
    this.userId = this.$route.params.id;
  },
  methods: {
    async submitEvaluation() {
      const evaluationData = {
        weight: this.weight,
        height: this.height,
      };
      try {
        await this.apiUpdateEvaluation(this.userId, evaluationData);
        Swal.fire(
          "¡Éxito!",
          "La evaluación se ha actualizado correctamente.",
          "success"
        );
        this.$router.push({ name: "home" , params: { userId: this.userId }});
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
    validateWeight() {
      this.isValidForm =
        !isNaN(parseFloat(this.weight)) && this.weight > 0 && this.height > 0;
    },
    validateHeight() {
      this.isValidForm = this.weight > 0 && this.height > 0;
    },
    goHome() {
      this.$router.push({ name: "home", params: { userId: this.userId } });
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
