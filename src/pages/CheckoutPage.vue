<template>
  <UserLogin v-if="showLogIn" @close="showLogIn = false"></UserLogin>
  <div class="centered-container">
    <BaseCard>
      <h2>Checkout</h2>
      <div class="checkout-details">
        <p><strong>Room ID:</strong> {{ roomId }}</p>
        <p><strong>Date:</strong> {{ formatDate(startTime) }}</p>
        <p><strong>Start Time:</strong> {{ formatTime(startTime) }}</p>
        <p><strong>End Time:</strong> {{ formatTime(endTime) }}</p>
        <p><strong>Price:</strong> ${{ calculatePrice() }}</p>
      </div>

      <form @submit.prevent="submitForm" class="booking-form">
        <div class="form-group">
          <label for="phone">Confirm Your Phone Number: </label>
          <input
            type="tel"
            id="phone"
            v-model="phoneNumber"
            @input="enforceNumericInput"
            required
          />
        </div>
        <BaseButton type="submit">Confirm Booking</BaseButton>
      </form>
    </BaseCard>
  </div>
  <div v-if="showConfirmationModal" class="modal">
    <p>Reservation confirmed!</p>
    <BaseButton @click="closeModal">Close</BaseButton>
  </div>
</template>

<script>
import UserLogin from '../components/UI/UserLogin.vue';

export default {
  components: {
    UserLogin,
  },
  data() {
    return {
      startTime: '',
      endTime: '',
      roomId: '',
      phoneNumber: '',
      showConfirmationModal: false,
      loadCreate: false,
      apiUrl: process.env.VUE_APP_API_URL,
      showLogIn: false,
    };
  },
  created() {
    this.startTime = this.$route.query.startTime;
    this.endTime = this.$route.query.endTime;
    this.roomId = this.$route.query.room_id;
    if (localStorage.getItem('userPhone') == '') {
      this.showLogIn = true;
    } else {
      this.showLogIn = false;
      this.phoneNumber = localStorage.getItem('userPhone');
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toUTCString().split(' ', 4).join(' '); // Formats as a UTC date string
    },
    formatTime(dateString) {
      const date = new Date(dateString);
      let hours = date.getUTCHours();
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      return `${hours}:${minutes} ${ampm}`;
    },
    calculatePrice() {
      // Implement your price calculation logic here
      // For example, a fixed rate per hour
      const start = new Date(this.startTime);
      const end = new Date(this.endTime);
      const durationHours = (end - start) / 36e5; // Convert milliseconds to hours
      const ratePerHour = 10; // Example rate per hour
      return (durationHours * ratePerHour).toFixed(2);
    },
    enforceNumericInput() {
      this.phoneNumber = this.phoneNumber.replace(/\D/g, '');
    },
    async submitForm() {
      // Handle form submission
      console.log(
        'Booking Confirmed:',
        this.phoneNumber,
        this.roomId,
        this.startTime,
        this.endTime
      );
      await this.createReservation();
    },
    closeModal() {
      this.showConfirmationModal = false;
    },

    async createReservation() {
      try {
        const newReservation = {
          user_id: this.phoneNumber,
          room_id: this.roomId,
          start_time: this.startTime,
          end_time: this.endTime,
          status: 'upcoming',
        };
        console.log('creating reservation: ', newReservation);

        const response = await fetch(`${this.apiUrl}/reservations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReservation),
        });
        if (response.ok) {
          this.loadCreate = false;
          // alert('New reservation added');
          // this.$emit('refresh');
          this.showConfirmationModal = true;
          const confirmationMessage = 'Your reservation is confirmed!';
          await this.sendTextMessage(this.phoneNumber, confirmationMessage);
        } else {
          this.loadCreate = false;
          alert(
            'Failed to add a new reservation. Please make sure you have created an account with us.'
          );
        }
      } catch (error) {
        this.loadCreate = false;
        alert('Error adding a new reservation:', error);
      }
    },
    async sendTextMessage(phoneNumber, message) {
      // Placeholder for sending a text message
      // In a real application, this would involve an API call to an SMS service
      console.log(`Sending text to ${phoneNumber}: ${message}`);
    },
  },
};
</script>
<style scoped lang="scss">
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
/* Style for the modal */
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  z-index: 100;
}
</style>
