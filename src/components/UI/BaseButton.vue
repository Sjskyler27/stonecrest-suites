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
}

button:hover,
button:active {
  background-color: #3073ca;
  border-color: #3073ca;
}

.flat {
  border-radius: 20px;
  border: 3px solid $primary-color;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: $primary-color;
}

.flat:hover,
.flat:active {
  border: 3px solid #3073ca;
  color: #3073ca;
  background-color: white;
}
</style>
