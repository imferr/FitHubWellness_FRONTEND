<template>
  <div>
    <button @click="login" class="loginbutton">LOG IN</button>
  </div>
</template>
  
<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { loginWithRedirect } = useAuth0();

    const login = () => {
      loginWithRedirect();
    };

    return {
      login
    };
  }
};
</script>

<style>

.loginbutton {
    font-weight: bold;
    background-color: black;
    border: 2px solid white;
    color: white;
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
    cursor: pointer;
}

.loginbutton:hover {
    background-color: white;
    color: black;
    scale: 1.1;
    transition: 0.5s;
}

</style>