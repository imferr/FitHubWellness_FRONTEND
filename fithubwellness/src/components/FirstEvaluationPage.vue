<template>
    <div class="first-evaluation">
        <h1>BIENVENIDO A FITHUB</h1>
        <h3>¿Primera vez aquí? ¡Completa algunos datos para comenzar!</h3>
        <form class="form-firstevaluation">
            <label for="weight">Peso:</label>
            <input type="number" id="weight" name="weight">

            <label for="height">Altura (cm):</label>
            <input type="number" id="height" name="height">

            <label for="birthday">Cumpleaños:</label>
            <input type="date" id="birthday" name="birthday">

            <div class="save-first">
                <router-link to="/"><SaveButton/></router-link>
                <router-link to="/home"><VolverButton/></router-link>
            </div>
        </form>
    </div>
</template>
  
<script>
import VolverButton from '../buttons/VolverButton.vue';
import SaveButton from '../buttons/SaveButton.vue';

export default {
    components: { VolverButton, SaveButton },
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
    text-align: start;
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
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

@media screen and (min-width: 500px) {
    .first-evaluation {
        width: 50%;
    }
}

</style>
  