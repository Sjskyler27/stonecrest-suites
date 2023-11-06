<template>
  <button :type="type" :class="mode"><slot> </slot></button>
</template>
<script>
export default {
  props: ['type', 'mode'],
};
</script>
<style scoped lang="scss">
@import '@/assets/main.scss';
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: $primary-color;
  border: 3px solid $primary-color;
  color: white;
  cursor: pointer;
  border-radius: 20px;
  font-weight: 900;
  margin: 2px;
}

button:hover,
button:active {
  background-color: lighten($primary-color, 30%);
  border-color: lighten($primary-color, 30%);
}

.flat {
  border-radius: 20px;
  border: 3px solid $primary-color;
  background: #fff;
  color: $primary-color;
  margin: 2px;
}

.flat:hover,
.flat:active {
  border: 3px solid lighten($primary-color, 30%);
  color: lighten($primary-color, 30%) 3073ca;
  background-color: white;
}
</style>
