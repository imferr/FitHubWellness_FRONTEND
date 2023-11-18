<template>
    <NavBarHome />
    <div class="profile-container">
        <h1>MI PERFIL</h1>
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
                <VolverButton />
            </div>
        </div>
    </div>
</template>
  
<script>
import VolverButton from '@/buttons/VolverButton.vue';
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
    components: { NavBarHome, VolverButton }
};
</script>
  
<style>

body {
    background-image: url('../assets/fondo.gif');
}

.profile-container {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 80%;
    margin: 50px auto;
    padding: 40px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    background-color: white;
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
    width: 70vw;
    max-width: 300px;
    min-width: 150px;
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
    font-weight: bold;
}

.input-group input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    border: 1px solid #ccc;
}

@media screen and (min-width: 500px) {
    .profile-container {
        width: 50%;
    }
}

@media screen and (max-width: 799px) {
    .profile-content {
        flex-direction: column;
        align-items: center;
    }

    .image-section {
        order: 1;
        margin-bottom: 20px;
        width: 100%;
    }

    .info-section {
        order: 2;
        width: 100%;
    }
}
</style>
  