<template>
  <div class="login-modal" v-show="showModal">
    <div class="modal-content">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="phone" type="phone" placeholder="phone" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <BaseButton @click="closeModal">Close</BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      password: '',
      showModal: true,
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch(`${this.apiUrl}/users/${this.phone}`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Login failed');
        }

        const userData = await response.json();

        if (userData.password === this.password) {
          // Password matches, store the phone number in local storage
          localStorage.setItem('userPhone', this.phone);

          // Close the modal or redirect the user to another page
          this.showModal = false;

          // Optionally, you can also store the user's data or token in local storage for authentication
          // localStorage.setItem('userData', JSON.stringify(userData));
          // localStorage.setItem('token', userData.token);

          // Redirect the user to another page
          // this.$router.push('/dashboard');
        } else {
          // Password does not match, handle the error or show a message to the user
          alert('Password does not match');
        }
      } catch (error) {
        console.error('Login error:', error);
        // Handle login error here (e.g., show an error message to the user)
      }
    },
    closeModal() {
      this.showModal = false;
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
}

/* Style form elements */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input[type='phone'],
input[type='password'],
button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #0056b3;
}

.close-button {
  margin-top: 10px;
  text-align: center;
}
</style>
