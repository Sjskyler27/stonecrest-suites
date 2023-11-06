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
      <div
        v-for="(reservation, index) in reservationList"
        :key="index"
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
    };
  },
  created() {
    this.fetchReservationData();
  },
  methods: {
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
</style>
