<template>
  <NavBarHome />
  <div class="record-container">
    <div class="records-card">
      <div>
        <h1>Personal Record</h1>
        <p>Registra tus mejores marcas, pesos y repeticiones!</p>
      </div>
      <div v-for="record in personalRecords" :key="record.personalRecordId" class="record">
        <div v-if="editingRecordId !== record.personalRecordId">
          <p>- Peso: {{ record.weight }} kg; Repeticiones: {{ record.repetitions }}; Ejercicio: {{ record.exerciseName }}
          </p>
          <button @click="startEditing(record)">Editar</button>
        </div>
        <div v-else>
          <input v-model="editedRecord.weight" type="number" placeholder="Peso">
          <input v-model="editedRecord.repetitions" type="number" placeholder="Repeticiones">
          <select v-model="editedRecord.exerciseName">
            <option v-for="exercise in exerciseList" :key="exercise.name" :value="exercise.name">
              {{ exercise.name }}
            </option>
          </select>
          <button class="save-button" @click="updateRecord">GUARDAR</button>
          <button class="save-button" @click="cancelEditing">Cancelar</button>
        </div>
      </div>
    </div>
    <div class="record-card">
      <div class="encabezado">
        <img src="../assets/logo-dark.png" alt="" height="70" width="70" />
        <h1>Nuevo Personal Record</h1>
      </div>
      <form class="form-record" @submit.prevent="createPersonalRecord">
        <label for="weight">Peso:</label>
        <input v-model.number="newRecord.weight" type="number" id="weight" name="weight" step="0.01"
          placeholder="Ingrese una cantidad de peso" min="1">
        <label for="reps">Repeticiones:</label>
        <input v-model.number="newRecord.repetitions" type="number" id="reps" name="reps" step="1"
          placeholder="Ingrese una cantidad de repeticiones" min="1">
        <label for="exercise">Ejercicio:</label>
        <select v-model="newRecord.exerciseName" id="exercise" name="exercise">
          <option v-for="exercise in exerciseList" :key="exercise.name" :value="exercise.name">
            {{ exercise.name }}
          </option>
        </select>
        <div class="save-data">
          <button class="save-button" type="submit">GUARDAR</button>
          <router-link to="/">
            <VolverButton />
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import NavBarHome from './NavBarHome.vue';
import VolverButton from '../buttons/VolverButton.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  components: {
    NavBarHome,
    VolverButton
  },
  data() {
    return {
      userId: null,
      personalRecords: [],
      editingRecordId: null,
      editedRecord: null,
      newRecord: {
        weight: null,
        repetitions: null,
        exerciseName: ''
      },
      exerciseList: []
    };
  },
  mounted() {
    this.userId = this.$route.params.id;
    this.fetchPersonalRecords();
    this.getExerciseList();
  },
  methods: {
    fetchPersonalRecords() {
      axios.get(`http://localhost:8080/api/v1/personalrecord/user/${this.userId}`)
        .then(response => {
          this.personalRecords = response.data;
        });
    },
    getExerciseList() {
      axios.get('http://localhost:8080/api/v1/exercise')
        .then(response => {
          this.exerciseList = response.data;
        });
    },
    createPersonalRecord() {
      if (this.newRecord.weight && this.newRecord.repetitions) {
        Swal.fire({
          title: 'Registrando personal record...',
          onBeforeOpen: () => {
            Swal.showLoading()
          },
          allowOutsideClick: () => !Swal.isLoading(),
          showConfirmButton: false
        });
        axios.post(`http://localhost:8080/api/v1/personalrecord/create/user/${this.userId}`, this.newRecord)
          .then(() => {
            Swal.close();
            this.fetchPersonalRecords();
            this.newRecord.weight = null;
            this.newRecord.repetitions = null;
            this.newRecord.exerciseName = '';
            Swal.fire('Registro Exitoso', 'Personal Record creado con éxito', 'success');
          }).catch(() => {
            Swal.close();
            Swal.fire('Error', 'Por favor ingrese peso y repeticiones válidos', 'error');
          });
      } else {
        Swal.fire('Error', 'Por favor ingrese peso y repeticiones válidos', 'error');
      }
    },
    startEditing(record) {
      this.editedRecord = JSON.parse(JSON.stringify(record));
      this.editingRecordId = record.personalRecordId;
    },
    updateRecord() {
      if (this.editingRecordId) {
        Swal.fire({
          title: 'Actualizando personal record...',
          onBeforeOpen: () => {
            Swal.showLoading()
          },
          allowOutsideClick: () => !Swal.isLoading(),
          showConfirmButton: false
        });
        axios.put(`http://localhost:8080/api/v1/personalrecord/user/${this.userId}/update/${this.editingRecordId}`, this.editedRecord)
          .then(() => {
            Swal.close();
            const index = this.personalRecords.findIndex(record => record.personalRecordId === this.editingRecordId);
            if (index !== -1) {
              this.personalRecords.splice(index, 1, this.editedRecord);
            }
            this.editingRecordId = null;
            this.editedRecord = null;
            Swal.fire('Actualizado', 'El registro ha sido actualizado con éxito', 'success');
          }).catch(error => {
            Swal.close();
            Swal.fire('Error', `No se pudo actualizar el registro: ${error.message}`, 'error');
          });
      } else {
        Swal.fire('Error', 'El ID del registro no está definido', 'error');
      }
    },
    cancelEditing() {
      this.editingRecordId = null;
      this.editedRecord = null;
    }
  }
};
</script>
    
<style>
.record-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 2% 5%;
  overflow: auto;
  height: 75vh;
}

.records-card {
  background-color: white;
  flex: 0 0 45%;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 20px;
  height: 65vh;
  display: flex;
  flex-direction: column;
}

.record-card {
  background-color: white;
  flex: 0 0 45%;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 20px;
  height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media screen and (min-width: 500px) {

  .record-card,
  .records-card {
    flex: 0 0 40%;
  }
}

@media (max-width: 850px) {

  .record-card,
  .records-card {
    flex: 0 0 90%;
  }
}

.buttonAdd,
.buttonAdd1 {
  display: flex;
  justify-content: flex-end;
}


.form-record {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.form-record label {
  display: block;
  margin: 10px;
  font-weight: bold;
}

.form-record input,
.form-record select {
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


.save-button {
    font-weight: bold;
    background-color: black;
    border: 2px solid white;
    color: white;
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
    cursor: pointer;
}

.save-button a {
    color: white;
    text-decoration: none;
}

.save-button:hover {
    border: 2px solid black;
    background-color: white;
    color: black;
    scale: 1.1;
    transition: 0.5s;
}

.save-button:hover a {
    color: black;
    text-decoration: none;
}
</style>
    
  