<template>
  <div class="auth-modal" v-show="showModal">
    <div class="modal-content">
      <h2 v-if="isLogin">Login</h2>
      <h2 v-else>Sign Up</h2>
      <form>
        <input
          v-model="firstName"
          v-if="!isLogin"
          type="text"
          placeholder="First Name"
        />
        <input
          v-model="lastName"
          v-if="!isLogin"
          type="text"
          placeholder="Last Name"
        />
        <input v-model="phone" type="phone" placeholder="Phone" />
        <input v-model="password" type="password" placeholder="Password" />
        <input
          v-model="confirmPassword"
          v-if="!isLogin"
          type="password"
          placeholder="Confirm Password"
        />
        <input
          v-model="email"
          v-if="!isLogin"
          type="email"
          placeholder="Email *Optional*"
        />
        <button v-if="isLogin" type="button" @click="login">Login</button>
        <button v-else type="button" @click="signup">Sign Up</button>
      </form>
      <BaseButton @click="closeModal">Close</BaseButton>
      <BaseButton @click="toggleMode">{{
        isLogin ? 'Sign Up' : 'Login'
      }}</BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      password: '',
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      isLogin: true, // Default to the login mode
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
          localStorage.setItem('userEmail', userData.email);
          localStorage.setItem('firstName', userData.first_name);
          localStorage.setItem('lastName', userData.last_name);

          // Close the modal or redirect the user to another page
          this.showModal = false;
          location.reload();
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
    async signup() {
      try {
        if (this.password !== this.confirmPassword) {
          alert('Password and confirm password do not match.');
          throw new Error('Password and confirm password do not match.');
        }
        const userData = {
          user_id: this.phone,
          password: this.password,
          username: this.firstName,
          email: this.email,
          first_name: this.firstName,
          last_name: this.lastName,
        };

        const response = await fetch(`${this.apiUrl}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error('Signup failed');
        }

        // Signup was successful, you can handle the success case here
        alert('Signup successful! You can now log in.');

        // Optionally, you can log the user in automatically after signup
        this.login();
      } catch (error) {
        console.error('Signup error:', error);
        // Handle signup error here (e.g., show an error message to the user)
      }
    },
    toggleMode() {
      this.isLogin = !this.isLogin;
    },
    closeModal() {
      this.showModal = false;
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.auth-modal {
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

input,
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
