<template>
    <NavBarHome />
    <div class="home">
        <div v-if="loading">Cargando...</div>
        <div v-else>
            <div class="bienvenido">
                <h1>BIENVENIDO A FITHUB</h1>
                <div class="bienvenido-evaluacion">
                    <p>Nueva evaluación</p>
                    <router-link :to="`/newevaluation/${userId}`">
                        <AddButton />
                    </router-link>
                </div>
            </div>
            <div class="container-home">
                <div class="exercises-left">
                    <h3>¿Qué vas a entrenar hoy?</h3>
                    <ul v-if="exercises.length" class="exercise-list">
                        <li v-for="exercise in exercises" :key="exercise.id" class="exercise-card">
                            <div class="exercise-icon">
                                <img :src="exercise.linkPicture || defaultImageUrl" alt="Exercise Icon">
                            </div>
                            <div class="exercise-info">
                                <h3>{{ exercise.name }}</h3>
                                <p>{{ exercise.description }}</p>
                                <div class="seleccionar-ejercicio">
                                    <CheckButton />
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div v-else>No hay ejercicios disponibles.</div>
                </div>
                <div class="chat-right">
                    <h3>Sugerencias</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import NavBarHome from '../components/NavBarHome.vue';
import AddButton from '../buttons/AddButton.vue';
import CheckButton from '../buttons/CheckButton.vue';
import defaultImage from '../assets/logo-dark.png';

export default {
    setup() {
        const { loading, user } = useAuth0();
        const exercises = ref([]);
        const defaultImageUrl = defaultImage;
        let userId = null;

        onMounted(async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/exercise');
                exercises.value = response.data.map(exercise => ({
                    ...exercise,
                    linkPicture: exercise.linkPicture || defaultImageUrl
                }));
                
                userId = response.data.userid;
            } catch (error) {
                console.error('Error al cargar los ejercicios:', error);
            }
        });

        return {
            loading,
            user,
            exercises,
            defaultImageUrl,
            userId
        };
    },
    components: { NavBarHome, CheckButton, AddButton }
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
        width: auto;
        margin-bottom: 20px;
    }

    .chat-right {
        width: auto;
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
}
</style>
