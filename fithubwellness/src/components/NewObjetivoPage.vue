<template>
    <NavBarHome />
    <div class="new-goal">
        <h1>Nuevo Objetivo</h1>
        <form class="formulario-goal">
            <label for="goalType">Quiero:</label>
            <select id="goalType" name="goalType">
                <!--opciones de tipo de objetivo-->
            </select>

            <label for="weightOrReps">Peso o repeticiones:</label>
            <input type="text" id="weightOrReps" name="weightOrReps">

            <label for="exercise">Ejercicio:</label>
            <select id="exercise" name="exercise">
                <!-- Add more <option> tags here for each exercise -->
            </select>

            <div class="save-data">
                <router-link to="/"><SaveButton/></router-link>
                <router-link to="/objetivos"><VolverButton/></router-link>
            </div>
        </form>
    </div>
</template>
  
<script>
import NavBarHome from '../components/NavBarHome.vue';
import VolverButton from '../buttons/VolverButton.vue';
import SaveButton from '../buttons/SaveButton.vue';

export default {
    components: { NavBarHome, VolverButton, SaveButton },
};
</script>
  
<style>

.new-goal {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 80%;
    margin: 50px auto;
    padding: 40px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    background-color: white;
}

.new-goal h1 {
    text-align: start;
    margin: 20px;
}

.formulario-goal {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.formulario-goal label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
}

.formulario-goal input, .formulario-goal select {
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
    .new-goal {
        width: 50%;
    }
}

</style>
  