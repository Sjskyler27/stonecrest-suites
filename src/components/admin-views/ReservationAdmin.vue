<template>
  <div>
    <h2>Edit Reservations</h2>
    <div class="centered-container">
      <BasePageSpinner :isLoading="isLoading" />
      <BaseCard class="create-container">
        <ReservationForm
          :reservation="false"
          :isAdmin="true"
          @refresh="fetchReservationData"
        ></ReservationForm>
      </BaseCard>
      <div class="search-container">
        <input v-model="searchUserId" placeholder="Enter User Phone Number" />
        <BaseButton @click="searchReservations">Search</BaseButton>
      </div>
      <div
        v-for="reservation in reservationList"
        :key="reservation"
        class="reservation-containers"
      >
        <BaseCard>
          <ReservationForm
            :reservation="reservation"
            :isAdmin="true"
            @refresh="fetchReservationData"
          ></ReservationForm>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import ReservationForm from '@/components/forms/ReservationForm.vue';

export default {
  components: {
    ReservationForm,
  },
  data() {
    return {
      reservationList: [],
      apiUrl: process.env.VUE_APP_API_URL,
      isLoading: false,
      searchUserId: '', // Added property for user_id input
    };
  },
  created() {
    this.fetchReservationData();
  },
  methods: {
    async searchReservations() {
      try {
        this.isLoading = true;
        const userId = this.searchUserId; // Get the user_id from input field
        const response = await fetch(
          `${this.apiUrl}/reservations/user/${userId}`,
          {
            method: 'GET',
          }
        );

        if (response.ok) {
          this.isLoading = false;
          const data = await response.json();
          console.log(`${userId}: `, data);
          this.reservationList = data;
          console.log('reslist: ', this.reservationList);
        } else {
          this.isLoading = false;
          console.error('Error fetching reservations:', response.statusText);
        }
      } catch (error) {
        this.isLoading = false;
        console.error('Error fetching reservation data:', error);
      }
    },
    async fetchReservationData() {
      try {
        this.isLoading = true;
        const response = await fetch(`${this.apiUrl}/reservations`, {
          method: 'GET',
        })
          .then(response => {
            if (response.ok) {
              this.isLoading = false;
              return response.json();
            }
          })
          .then(data => {
            this.isLoading = false;
            console.log(data);
            this.reservationList = data;
          });
      } catch (error) {
        this.isLoading = false;
        console.error('Error fetching reservation data:', error);
      }
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
.reservation-containers {
  width: 300px;
}
.create-container {
  width: 300px;
}

p {
  color: #000;
  font-family: Inika;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.search-container input {
  padding: 6px;
  border: 2px solid $primary-color;
  border-radius: 4px;
  margin-right: 10px;
}
</style>
