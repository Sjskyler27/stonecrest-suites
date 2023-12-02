<template>
  <div>
    <h2>Room Availability on {{ day }}</h2>
    <div class="centered-container">
      <label
        v-for="(slot, index) in timeSlots"
        :key="index"
        :class="{ unavailable: slot.isUnavailable }"
      >
        <input
          type="checkbox"
          :disabled="slot.isUnavailable"
          :value="slot"
          v-model="selectedSlots"
        />
        {{ formattedTime(slot.start) }} - {{ formattedTime(slot.end) }}
      </label>
      <br />
      <BaseButton @click="checkAndEmitSelectedTimes">
        <BaseSpinner :isLoading="loadRoom" />
        <span v-if="!loadRoom">Book Room</span>
      </BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roomId: Number,
    day: Date,
  },
  data() {
    return {
      reservations: [], // API response will be stored here
      timeSlots: [], // Time slots for the day
      selectedSlots: [], // Initialize selectedSlots
      apiUrl: process.env.VUE_APP_API_URL,
      startTime: null,
      endTime: null,
    };
  },
  created() {
    // Make an API request to fetch reservations for the given room and day
    this.fetchReservations();
  },
  computed: {
    formattedTime() {
      return value => {
        const time = new Date(value);
        const hours = time.getUTCHours();
        const minutes = time.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
      };
    },
  },
  methods: {
    async fetchReservations() {
      console.log(
        'fetching ',
        this.roomId,
        'at ',
        this.apiUrl,
        'on day',
        this.day
      );
      try {
        this.isLoading = true;
        const response = await fetch(
          `${this.apiUrl}/reservations/room/${this.roomId}`,
          {
            method: 'GET',
          }
        );

        if (response.ok) {
          this.isLoading = false;
          const data = await response.json();
          this.reservations = data;
          console.log('reslist: ', this.reservations);
        } else {
          this.isLoading = false;
          console.error('Error fetching reservations:', response.statusText);
        }
      } catch (error) {
        this.isLoading = false;
        console.error('Error fetching reservation data:', error);
      }

      const roomReservations = this.reservations.filter(reservation => {
        // Convert reservation start_time to a Date object
        const startTime = new Date(reservation.start_time);

        // Check if the date of startTime matches the 'day' prop
        const reservationDate = startTime.toISOString().split('T')[0];
        console.log('date check', reservationDate);

        return (
          reservation.room_id === this.roomId && reservationDate === this.day
        );
      });

      console.log('reservations for ', this.day, ': ', roomReservations);

      // Define the start and end hours for your time slots (e.g., 8 AM to 5 PM)
      const startHour = 8;
      const endHour = 17;

      // Initialize the timeSlots array
      const timeSlots = [];

      // Loop through each hour and create time slots
      for (let hour = startHour; hour < endHour; hour++) {
        // Calculate the start and end times for the current hour
        const utcStartTime = new Date(this.day);
        utcStartTime.setUTCHours(hour, 0, 0, 0);

        const utcEndTime = new Date(this.day);
        utcEndTime.setUTCHours(hour + 1, 0, 0, 0);

        // Check if any reservation covers this time slot
        const isUnavailable = roomReservations.some(reservation => {
          const reservationStart = new Date(reservation.start_time);
          const reservationEnd = new Date(reservation.end_time);

          return reservationStart < utcEndTime && reservationEnd > utcStartTime;
        });

        // Add the time slot to the array
        timeSlots.push({
          start: utcStartTime.toISOString(),
          end: utcEndTime.toISOString(),
          isUnavailable: isUnavailable,
        });
      }

      // Now, the timeSlots array contains the generated time slots
      this.timeSlots = timeSlots;
      console.log('slots: ', timeSlots);
    },
    checkAndEmitSelectedTimes() {
      // Sort the selected slots by start time
      const sortedSelectedSlots = [...this.selectedSlots].sort(
        (a, b) => new Date(a.start) - new Date(b.start)
      );

      // Check for gaps
      for (let i = 0; i < sortedSelectedSlots.length - 1; i++) {
        const currentSlotEnd = new Date(sortedSelectedSlots[i].end);
        const nextSlotStart = new Date(sortedSelectedSlots[i + 1].start);

        if (currentSlotEnd < nextSlotStart) {
          alert('Please do not leave gaps in your time selection.');
          console.error('Error: There are gaps in the selection.');
          return; // Early exit if a gap is found
        }
      }

      // If no gaps, emit the start of the first slot and the end of the last slot
      if (sortedSelectedSlots.length > 0) {
        const startTime = sortedSelectedSlots[0].start;
        const endTime = sortedSelectedSlots[sortedSelectedSlots.length - 1].end;
        this.$emit('selectedTimeRange', startTime, endTime);

        // Log the times in the console
        console.log('Selected Start Time:', startTime);
        console.log('Selected End Time:', endTime);
      }
    },
  },
};
</script>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 20px;
}
.unavailable {
  color: rgb(199, 94, 94);
  cursor: not-allowed;
}
</style>
