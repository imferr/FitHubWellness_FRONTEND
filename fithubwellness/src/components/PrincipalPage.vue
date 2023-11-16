<template>
  <div class="login">
    <div v-if="isAuthenticated"></div>
    <div v-else>
      <div class="login-container">
        <NavBarLogin />
        <div class="cards">
          <div class="card">
            <div class="card-inner">
              <div class="card-front">
                <p>¿Cómo puede FitHub Wellness ayudarme a seguir mi progreso?</p>
              </div>
              <div class="card-back">
                <p>FitHub Wellness te permite llevar un registro detallado de tu actividad física y ver tu evolución a lo
                  largo del tiempo, facilitando la adaptación y mejora de tu entrenamiento.</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-inner">
              <div class="card-front">
                <p>¿Es FitHub Wellness adecuado para mis objetivos personales de salud?</p>
              </div>
              <div class="card-back">
                <p>La aplicación te permite personalizar completamente tu lista de rutinas para que se ajusten a tus
                  objetivos de salud y ejercicio, haciéndola ideal para tus necesidades individuales.</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-inner">
              <div class="card-front">
                <p>¿Cómo me ayuda FitHub Wellness a mantener una rutina de ejercicios?</p>
              </div>
              <div class="card-back">
                <p>Con FitHub Wellness, puedes diseñar y mantener una lista de rutinas de ejercicios adaptadas a tus
                  metas, promoviendo la consistencia y el progreso en tu régimen de entrenamiento.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';
import { watchEffect, ref } from 'vue';
import axios from 'axios';
import NavBarLogin from '../components/NavBarLogin.vue';

export default {
  components: {
    NavBarLogin
  },
  setup() {
    const { isAuthenticated, user, isLoading } = useAuth0();
    const router = useRouter();
    const isNewUser = ref(false);

    watchEffect(async () => {
      if (isAuthenticated.value && !isLoading.value) {
        try {
          const userDetails = {
            name: user.value.name,
            email: user.value.email,
          };

          const response = await axios.post('http://localhost:8080/api/v1/user/findOrCreate', userDetails);
          
          if (response.data.isNewUser) {
            isNewUser.value = true;
            await router.push('/firstevaluation');
          } else {
            await router.push('/home');
          }
        } catch (error) {
          console.error('Error al verificar el usuario:', error);
        }
      }
    });

    return {
      isAuthenticated,
      isNewUser
    };
  }
};
</script>

<style>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-image: url('../assets/fondo.gif');
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
}</style>
