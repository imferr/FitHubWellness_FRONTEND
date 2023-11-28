<template>
  <div class="first-evaluation">
    <h1>BIENVENIDO A FITHUB!</h1>
    <h3>¿Primera vez aquí? ¡Completa algunos datos para comenzar!</h3>
    <p>
      Para una atención más personalizada y un mejor seguimiento de tu progreso,
      te pedimos que completes los siguientes datos. Esto nos ayudará a conocer
      tu estado actual y a diseñar un plan de entrenamiento que se adapte a ti y
      a tus objetivos.
    </p>
    <form class="form-firstevaluation">
      <label for="weight">Peso (kg):</label>
      <input type="number" id="weight" name="weight" v-model="weight" placeholder="Ingrese su peso en kilogramos" min="1" />

      <label for="height">Altura (cm):</label>
      <input type="number" id="height" name="height" v-model="height" placeholder="Ingrese su altura en centímetros" min="1" />

      <label for="birthday">Cumpleaños:</label>
      <input type="date" id="birthday" name="birthday" v-model="birthday" />

      <div class="save-first">
        <button class="save-button" type="button" @click="submitForm">
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  setup() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth0();
    const isUserDataLoaded = ref(false);
    const weight = ref("");
    const height = ref("");
    const birthday = ref("");

    watchEffect(() => {
      if (
        isAuthenticated.value &&
        user.value &&
        user.value.name &&
        user.value.email
      ) {
        isUserDataLoaded.value = true;
      }
    });

    const validateFields = () => {
      if (weight.value === "" || height.value === "" || birthday.value === "") {
        Swal.fire("Error", "Todos los campos deben estar llenos.", "error");
        return false;
      }
      if (
        weight.value < 20 ||
        weight.value > 300 ||
        height.value < 50 ||
        height.value > 250
      ) {
        Swal.fire(
          "Error",
          "El peso y la altura deben estar en un rango válido.",
          "error"
        );
        return false;
      }
      const birthDate = new Date(birthday.value);
      const currentDate = new Date();
      const eightYearsAgo = new Date(
        currentDate.getFullYear() - 8,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      if (birthDate.getFullYear() < 1900) {
        Swal.fire("Error", "Ingrese una fecha válida", "error");
        return false;
      } else if (birthDate > eightYearsAgo) {
        Swal.fire(
          "Error",
          "Debes tener al menos 8 años para usar la aplicación",
          "error"
        );
        return false;
      }
      return true;
    };

    const submitForm = () => {
      if (!isUserDataLoaded.value) {
        alert(
          "Los datos del usuario aún no están disponibles. Por favor, espera."
        );
        return;
      }
      if (!validateFields()) {
        return;
      }
      const selectedBirthday = new Date(birthday.value);
      selectedBirthday.setDate(selectedBirthday.getDate() + 1);
      const userData = {
        name: user.value.name,
        email: user.value.email,
        birthday: selectedBirthday.toISOString().split("T")[0],
      };
      const evaluationData = {
        weight: weight.value,
        height: height.value,
      };
      const requestData = {
        user: userData,
        evaluation: evaluationData,
      };
      axios
        .post(
          "http://localhost:8080/api/v1/user/createWithEvaluation",
          requestData
        )
        .then((response) => {
          Swal.fire(
            "¡Listo!",
            "Tu usuario y evaluación han sido creados",
            "success"
          );
          router.push({ name: "home", params: { id: response.data.userId } });
        })
        .catch((error) => {
          Swal.fire(
            "Error",
            "Hubo un error al crear el usuario y la evaluación: " + error,
            "error"
          );
        });
    };

    return { weight, height, birthday, submitForm };
  },
};
</script>

<style>
.first-evaluation {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 80%;
  margin: 50px auto;
  padding: 40px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background-color: white;
}

.first-evaluation h1 {
  text-align: center;
}

.form-firstevaluation {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.form-firstevaluation label {
  display: block;
  margin: 10px;
  font-weight: bold;
}

.form-firstevaluation input {
  width: 100%;
  padding: 15px;
  margin-bottom: 5px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid #ccc;
}

.save-first {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
}

@media screen and (min-width: 500px) {
  .first-evaluation {
    width: 50%;
  }
}
</style>
