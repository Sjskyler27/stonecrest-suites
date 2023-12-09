<template>
  <div class="modal" v-show="showModal">
    <div class="modal-content">
      <h2>Edit Account</h2>
      <form>
        <!-- Input fields for editing user information -->
        <input v-model="firstName" type="text" placeholder="First Name" />
        <input v-model="lastName" type="text" placeholder="Last Name" />
        <input v-model="email" type="email" placeholder="Email" />
        <!-- Password editing -->
        <input v-model="password" type="password" placeholder="New Password" />
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
        />

        <button type="button" @click="updateAccount">Update</button>
        <button type="button" @click="deleteAccount">Delete</button>
      </form>
      <BaseButton @click="closeModal">Close</BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('userEmail'),
      password: '',
      confirmPassword: '',
      showModal: true,
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  created() {},
  methods: {
    async updateAccount() {
      try {
        if (this.password !== this.confirmPassword) {
          throw new Error('Password and confirm password do not match.');
        }
        let userData;
        if (this.password != '') {
          userData = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
          };
        } else {
          userData = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
          };
        }
        const response = await fetch(
          `${this.apiUrl}/users/${localStorage.getItem('userPhone')}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          }
        );

        if (!response.ok) {
          throw new Error('Update account failed');
        }

        // Handle update success
        alert('Account updated successfully.');
        localStorage.setItem('userEmail', this.email);
        localStorage.setItem('firstName', this.firstName);
        localStorage.setItem('lastName', this.lastName);
        this.closeModal();
      } catch (error) {
        console.error('Update account error:', error);
        // Handle update error here (e.g., show an error message to the user)
      }
    },
    async deleteAccount() {
      try {
        const response = await fetch(
          `${this.apiUrl}/users/${localStorage.getItem('userPhone')}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('Delete account failed');
        }

        // Handle delete success
        alert('Account deleted successfully.');
        this.$emit('deleted');
        this.closeModal();
      } catch (error) {
        console.error('Delete account error:', error);
        // Handle delete error here (e.g., show an error message to the user)
      }
    },
    closeModal() {
      this.showModal = false;
      // Optionally, emit an event or perform other actions when closing the modal
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal {
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
