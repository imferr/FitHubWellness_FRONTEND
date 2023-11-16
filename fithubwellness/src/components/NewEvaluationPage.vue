<template>
    <NavBarHome />
    <div class="new-evaluation">
        <h1>Nueva Evaluación</h1>
        <form class="formulario-evaluation">
            <label for="weight">Peso:</label>
            <input type="number" id="weight" name="weight">

            <label for="height">Altura (cm):</label>
            <input type="number" id="height" name="height">

            <div class="save-data">
                <router-link to="/"><SaveButton/></router-link>
                <router-link to="/home"><VolverButton/></router-link>
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

.new-evaluation {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

</style>
  