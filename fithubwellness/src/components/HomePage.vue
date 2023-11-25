<template>
  <NavBarHome />
  <div class="home">
    <div v-if="loading">Cargando...</div>
    <div v-else>
      <div class="bienvenido">
        <h1>BIENVENIDO A FITHUB</h1>
        <div class="bienvenido-evaluacion">
          <p>Nueva evaluación</p>
          <button class="add" type="button" @click="goToNewEvaluation">
            +
          </button>
        </div>
      </div>
      <div class="container-home">
        <div class="exercises-left">
          <div class="exercise-camp" v-if="showExercises">
            <button class="volver-button" v-if="showExercises" @click="showExercises = false">Volver</button>
            <h2>Excercises to {{ selectedBodyPart }}</h2>
          </div>
          <h2 v-if="!showExercises">¿Qué vas a entrenar hoy?</h2>
          <div v-if="!showExercises" class="body-parts">
            <div 
              v-for="bodyPart in bodyParts" 
              :key="bodyPart" 
              class="body-part-card"
              @click="selectBodyPart(bodyPart)"
            >
              <div class="body-part-image">
                <img :src="getBodyPartImage(bodyPart)" :alt="`${bodyPart}`" />
              </div>
              <h3>{{ bodyPart }}</h3>
            </div>
          </div>
          <ul v-if="showExercises" class="exercise-list">
            <li
              v-for="exercise in filteredExercises"
              :key="exercise.id"
              class="exercise-card"
            >
              <div class="exercise-icon">
                <img
                  :src="exercise.linkPicture || defaultImageUrl"
                  alt="Exercise Icon"
                />
              </div>
              <div class="exercise-info">
                <h3>{{ exercise.name }}</h3>
                <p>{{ exercise.description }}</p>
                <div class="seleccionar-ejercicio">
                  <p><b>Seleccionar</b></p>
                  <CheckButton />
                </div>
              </div>
            </li>
          </ul>
          <div v-else class="loading"><loading-circle></loading-circle></div>
        </div>
        <div class="chat-right">
          <h3>Sugerencias</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import NavBarHome from "../components/NavBarHome.vue";
import CheckButton from "../buttons/CheckButton.vue";
import defaultImage from "../assets/logo-dark.png";
import { useRouter } from "vue-router";
import LoadingCircle from "../view/LoadingCircle.vue";

export default {
  setup() {
    const { loading, user } = useAuth0();
    const exercises = ref([]);
    const defaultImageUrl = defaultImage;
    let userId = null;
    const router = useRouter();
    const showExercises = ref(false);
    const selectedBodyPart = ref(null);

    onMounted(async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/exercise"
        );
        exercises.value = response.data.map((exercise) => ({
          ...exercise,
          linkPicture: exercise.linkPicture || defaultImageUrl,
        }));

        userId = response.data.userId;
      } catch (error) {
        console.error("Error al cargar los ejercicios:", error);
      }
    });

    const goToNewEvaluation = () => {
      router.push({ name: "newevaluation", params: { id: userId } });
    };

    const bodyParts = computed(() => [...new Set(exercises.value.map(exercise => exercise.bodyPart))]);
    const filteredExercises = computed(() => selectedBodyPart.value ? exercises.value.filter(exercise => exercise.bodyPart === selectedBodyPart.value) : exercises.value);

    const selectBodyPart = (bodyPart) => {
      selectedBodyPart.value = bodyPart;
      showExercises.value = true;
    };

    const bodyPartImages = {
      "back": "back.png",
      "cardio": "cardio.png",
      "chest": "chest.png",
      "lower arms": "lower_arms.png",
      "lower legs": "lower_legs.png",
      "neck": "neck.png",
      "shoulders": "shoulders.png",
      "upper arms": "upper_arms.png",
      "upper legs": "upper_legs.png",
      "waist": "waist.png",
    };

    const getBodyPartImage = (bodyPart) => {
      return require(`@/assets/${bodyPartImages[bodyPart] || 'default.png'}`);
    };

    return {
      loading,
      user,
      exercises,
      defaultImageUrl,
      userId,
      goToNewEvaluation,
      showExercises,
      selectedBodyPart,
      bodyParts,
      filteredExercises,
      selectBodyPart,
      getBodyPartImage,
    };
  },
  components: { NavBarHome, CheckButton, LoadingCircle },
};
</script>

<style>
.bienvenido {
  display: flex;
  flex-direction: space-between;
  align-items: center;
  justify-content: space-between;
  margin: 2rem;
}

.bienvenido h1 {
  font-size: 2rem;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.bienvenido p {
  margin-right: 10px;
  font-weight: 500;
}

.bienvenido-evaluacion {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-home {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem;
  height: 60vh;
}

.exercises-left {
  width: 70%;
  background-color: rgba(255, 255, 255, 0.486);
  border-radius: 20px;
  padding: 15px;
  overflow: auto;
}

.chat-right {
  width: 25%;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  overflow: auto;
}

.exercise-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}

@media (max-width: 1068px) {
  .exercise-list {
    grid-template-columns: 1fr;
    width: auto;
  }

  .body-part {
    grid-template-columns: 1fr;
    width: 100%;
  }

  .exercises-left {
    margin-right: 15px;
  }
}

.exercise-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 15px;
}

@media (max-width: 750px) {
  .container-home {
    flex-direction: column;
    align-items: flex-start;
  }

  .exercises-left {
    width: 95%;
    margin-bottom: 20px;
  }

  .chat-right {
    width: 95%;
  }
}

.exercise-icon img {
  width: 100px;
  height: auto;
  margin-right: 20px;
}

.exercise-info h4 {
  margin: 0;
}

.seleccionar-ejercicio {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.seleccionar-ejercicio p {
  margin-right: 10px;
}

.body-parts {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}

.body-part-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 15px;
  cursor: pointer;
}

.body-part-card:hover {
  transition: 0.3s;
  scale: 1.05;
}

.exercise-camp {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
}

.exercise-camp h2 {
  margin-left: 10px;
}

</style>
