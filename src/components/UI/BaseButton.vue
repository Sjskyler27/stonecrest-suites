<template>
  <button :type="type" :class="mode"><slot> </slot></button>
</template>
<script>
export default {
  props: ['type', 'mode'],
};
</script>

<style scoped>
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: #820263;
  border: 1px solid #820263;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  font-weight: 900;
}

button:hover,
button:active {
  background-color: #a0398a;
  border-color: #a0398a;
}

.flat {
  background-color: transparent;
  color: #820263;
  border: 2px solid #820263;
}

.flat:hover,
.flat:active {
  border: 2px solid #a0398a;
  color: #a0398a;
  background-color: white;
}
</style>
