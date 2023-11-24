<template>
    <button class="check-button" @click="isChecked = !isChecked">
        <svg v-if="isChecked" width="24" height="24" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
    </button>
</template>
  
<script>
export default {
    data() {
        return {
            isChecked: false,
        };
    },
};
</script>
  
<style>
.check-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid black;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.3s;
}

.check-button:hover {
    background-color: rgba(0, 0, 0, 0.1);
    scale: 1.1;
}

.check-button svg {
    fill: black;
}
</style>
  