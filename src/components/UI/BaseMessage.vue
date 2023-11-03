<template>
  <div class="message" :class="messageTypeClass" v-if="false">
    <p>{{ localMessage }}</p>
    <!-- Confirm Button -->
    <button v-if="localType" @click="clearMessage">Confirm</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localMessage: '',
      localType: '',
    };
  },
  localMessage() {
    if (true) {
      window.alert(this.localMessage);
      console.log('update message');
    }
  },
  methods: {
    clearMessage() {
      // Clear the message from localStorage
      localStorage.removeItem('message');
      localStorage.removeItem('messageType');
      this.$emit('confirm'); // Emit a custom event to notify the parent that the message is confirmed
    },
  },
  computed: {
    messageTypeClass() {
      return this.localType ? `message-${this.localType}` : '';
    },
  },
};
</script>

<style scoped>
/* Add styles for different message types here */
.message {
  position: fixed;
  top: 200px; /* Adjust this value for the desired vertical position */
  left: 50%;
  transform: translateX(-50%);
  padding: 25px 30px; /* Smaller padding for a smaller message */
  border-radius: 5px;
  font-weight: bold;
  z-index: 9999; /* Ensure it appears on top of everything */
}
.message-error {
  background-color: red;
  color: white;
}
.message-success {
  background-color: rgb(67, 201, 67);
  color: white;
}
.message-neutral {
  background-color: blue;
  color: white;
}
</style>
