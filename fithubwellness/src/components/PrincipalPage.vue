<template>
  <div class="login">
    <div v-if="isLoading" class="loading-principal">
      <loading-circle></loading-circle>
      <h2>Iniciando sesión...</h2>
    </div>
    <div v-else-if="isAuthenticated"></div>
    <div v-else>
      <div class="login-container">
        <NavBarLogin />
        <div class="cards">
          <div class="card" v-for="card in cards" :key="card.id">
            <div class="card-inner">
              <div class="card-front">
                <p>{{ card.question }}</p>
              </div>
              <div class="card-back">
                <p>{{ card.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { useRouter } from "vue-router";
import axios from "axios";
import NavBarLogin from "../components/NavBarLogin.vue";
import LoadingCircle from "../view/LoadingCircle.vue";
import { ref, watchEffect } from "vue";

export default {
  components: {
    NavBarLogin,
    LoadingCircle,
  },
  setup() {
    const { isAuthenticated, user, isLoading } = useAuth0();
    const router = useRouter();
    const cards = ref([
      {
        id: 1,
        question: "¿Cómo puede FitHub Wellness ayudarme a seguir mi progreso?",
        answer:
          "FitHub Wellness te permite llevar un registro detallado de tu actividad física y ver tu evolución a lo largo del tiempo, facilitando la adaptación y mejora de tu entrenamiento.",
      },
      {
        id: 2,
        question:
          "¿Es FitHub Wellness adecuado para mis objetivos personales de salud?",
        answer:
          "La aplicación te permite personalizar completamente tu lista de rutinas para que se ajusten a tus objetivos de salud y ejercicio, haciéndola ideal para tus necesidades individuales.",
      },
      {
        id: 3,
        question:
          "¿Cómo me ayuda FitHub Wellness a mantener una rutina de ejercicios?",
        answer:
          "Con FitHub Wellness, puedes diseñar y mantener una lista de rutinas de ejercicios adaptadas a tus metas, promoviendo la consistencia y el progreso en tu régimen de entrenamiento.",
      },
    ]);

    watchEffect(() => {
      if (isAuthenticated.value && !isLoading.value) {
        const userDetails = {
          name: user.value.name,
          email: user.value.email,
        };
        const createUserOrFindUser = async () => {
          try {
            const response = await axios.post(
              "http://localhost:8080/api/v1/user/findOrCreate",
              userDetails
            );
            if (response.data) {
              const userId = response.data.userId;
              router.push({ name: "home", params: { id: userId } });
            }
          } catch (error) {
            console.error("Error al crear o encontrar el usuario:", error);
            router.push({ name: "firstevaluation" });
          }
        };
        createUserOrFindUser();
      }
    });

    return {
      isAuthenticated,
      isLoading,
      cards,
    };
  },
};
</script>

<style>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-image: url("../assets/fondo.gif");
  margin: 0;
}

.cards {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 50px;
  gap: 30px;
}

.card {
  width: 300px;
  height: 200px;
  perspective: 1000px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.card-front {
  background-color: #fff;
  color: black;
  border-radius: 20px;
}

.card-back {
  background-color: #333;
  color: white;
  transform: rotateY(180deg);
  border-radius: 20px;
  font-weight: bold;
}

.loading-principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

</style>
