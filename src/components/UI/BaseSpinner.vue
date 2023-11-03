<template>
  <div v-if="isLoading" class="small-spinner">
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
.small-spinner {
  display: inline-block; /* Inline block element */
  position: relative;
}

.spinner {
  border: 2px solid #f3f3f3; /* Light gray border */
  border-top: 2px solid $primary-color; /* Blue border for animation */
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite; /* Rotation animation */
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
