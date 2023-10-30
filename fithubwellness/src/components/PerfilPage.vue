<template>
    <NavBarHome />
    <div class="profile-container">
        <h1>Mi Perfil</h1>
        <div class="profile-content">
            <div class="image-section">
                <img :src="user.picture" alt="profile picture" />
            </div>
            <div class="info-section">
                <div class="input-group">
                    <label>Nombre del usuario:</label>
                    <input type="text" readonly v-model="user.name" />
                </div>
                <div class="input-group">
                    <label>Correo del usuario:</label>
                    <input type="email" readonly v-model="user.email" />
                </div>
                <div class="input-group">
                    <label>Fecha de nacimiento del usuario:</label>
                    <input type="date" readonly v-model="user.birthDate" />
                </div>
                <button class="volver-button"><a href="/">VOLVER</a></button>
            </div>
        </div>
    </div>
</template>
  
<script>
import NavBarHome from './NavBarHome.vue';
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    data() {
        return {
            showDropdown: false,
        };
    },
    setup() {
        const { isAuthenticated, user } = useAuth0();
        return {
            isAuthenticated,
            user
        };
    },
    components: { NavBarHome }
};
</script>
  
<style>
.profile-container {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 80%;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

@media screen and (min-width: 800px) {
    .profile-container {
        width: 50%;
    }
}

.profile-container h1 {
    text-align: start;
    margin: 20px;
}

.profile-content {
    display: flex;
    justify-content: space-between;
}

.image-section {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-section img {
    width: 100%;
    height: auto;
    border-radius: 50%;
    border: 1px solid #ccc;
}

.info-section {
    width: 55%;
}

.input-group {
    margin-bottom: 20px;
}

.info-section label {
    display: block;
    margin-bottom: 10px;
}

.input-group input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}

.volver-button {
    font-weight: bold;
    background-color: black;
    border: 2px solid white;
    color: white;
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
    cursor: pointer;
}

.volver-button a {
    color: white;
    text-decoration: none;
}

.volver-button:hover {
    border: 2px solid black;
    background-color: white;
    color: black;
    scale: 1.1;
    transition: 0.5s;
}

.volver-button:hover a {
    color: black;
    text-decoration: none;
}
</style>
  