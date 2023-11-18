<template>
    <div class="first-evaluation">
        <h1>BIENVENIDO A FITHUB!</h1>
        <h3>¿Primera vez aquí? ¡Completa algunos datos para comenzar!</h3>
        <p>Para una atencion más personalizada y un mejor seguimiento de tu progreso, te pedimos que completes los siguientes datos. Esto nos ayudará a conocer tu estado actual y a diseñar un plan de entrenamiento que se adapte a ti y a tus objetivos.</p>
        <form class="form-firstevaluation">
            <label for="weight">Peso:</label>
            <input type="number" id="weight" name="weight">

            <label for="height">Altura (cm):</label>
            <input type="number" id="height" name="height">

            <label for="birthday">Cumpleaños:</label>
            <input type="date" id="birthday" name="birthday">

            <div class="save-first">
                <router-link to="/"><SaveButton/></router-link>
            </div>
        </form>
    </div>
</template>
  
<script>
import SaveButton from '../buttons/SaveButton.vue';
import Swal from 'sweetalert2';

export default {
  components: { SaveButton },
  mounted() {
    Swal.fire({
      title: '¡Bienvenido a Fithub!',
      text: 'Completa algunos datos para comenzar',
      icon: 'success',
      confirmButtonText: '¡Vamos!'
    });
  }
};
</script>
  
<style>

.first-evaluation {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
  