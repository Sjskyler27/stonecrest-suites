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
  background-color: #164686;
  border: 1px solid #164686;
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
  border: 3px solid #164686;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #164686;
}

.flat:hover,
.flat:active {
  border: 3px solid #3073ca;
  color: #3073ca;
  background-color: white;
}
</style>
