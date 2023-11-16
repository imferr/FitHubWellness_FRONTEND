<template>
    <NavBarHome />
    <div class="home">
        <div v-if="loading">Cargando...</div>
        <div v-else>
            <div class="bienvenido">
                <h1>BIENVENIDO A FITHUB</h1>
                <div class="bienvenido-evaluacion">
                    <p>Nueva evaluación</p><router-link to="/newevaluation">
                        <AddButton />
                    </router-link>
                </div>
            </div>
            <div class="container-home">
                <div class="exercises-left">
                    <h3>¿Qué vas a entrenar hoy?</h3>
                    <ul v-if="exercises.length">
                        <li v-for="exercise in exercises" :key="exercise.id">{{ exercise.name }}</li>
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

export default {
    setup() {
        const { loading, user } = useAuth0();
        const exercises = ref([]);

        onMounted(async () => {
            try {
                const response = await axios.get('http://localhost:8080/exercise');
                exercises.value = response.data;
            } catch (error) {
                console.error('Error al cargar los ejercicios:', error);
            }
        });

        return {
            loading,
            user,
            exercises
        };
    },
    components: { NavBarHome, AddButton }
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
}

.exercises-left {
    width: 70%;
    background-color: rgba(255, 255, 255, 0.486);
    border-radius: 20px;
    padding: 15px;
}

.chat-right {
    width: 25%;
    background-color: white;
    border-radius: 20px;
    padding: 15px;
}
</style>
