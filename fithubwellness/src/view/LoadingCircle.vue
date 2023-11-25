<template>
  <div class="loading-circle"></div>
</template>

<script>
export default {
  name: "LoadingCircle",
};
</script>

<style scoped>
.loading-circle {
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid blue;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
