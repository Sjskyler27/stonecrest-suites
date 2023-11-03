<template>
  <div v-if="isLoading" class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: Boolean, // Prop to control the visibility of the spinner
  },
};
</script>

<style scoped lang="scss">
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7); /* Semi-transparent background */
  z-index: 9999; /* Ensure it's on top of other content */
}

.spinner {
  border: 4px solid #f3f3f3; /* Light gray border */
  border-top: 4px solid $primary-color; /* Blue border for animation */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite; /* Rotation animation */
  margin: 0 auto; /* Center horizontally */
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
